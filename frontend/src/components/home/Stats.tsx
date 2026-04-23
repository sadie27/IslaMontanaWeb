'use client'

/* ════════════════════════════════════════════════════════════
   Stats.tsx — Sección de contadores animados
   Client Component: IntersectionObserver + requestAnimationFrame
════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: number
  suffix: string
  label: string
}

const STATS: StatItem[] = [
  { value: 10,   suffix: '+', label: 'Años de experiencia' },
  { value: 3800, suffix: '+', label: 'Viajeros satisfechos' },
  { value: 4,    suffix: '',  label: 'Regiones únicas' },
  { value: 98,   suffix: '%', label: 'Tasa de satisfacción' },
]

function useCountUp(target: number, trigger: boolean): number {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!trigger) return

    // Respetar prefers-reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setVal(target)
      return
    }

    let start: number | null = null
    const dur = 1400

    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / dur, 1)
      // Easing cubic ease-out: 1 - (1 - p)^3
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [trigger, target])

  return val
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="stats" ref={sectionRef} aria-label="Estadísticas IslaMontana">
      <div className="stats__grid">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stats__item">
            {/* Separador vertical entre items (desktop) */}
            {i > 0 && <div className="stats__divider" aria-hidden="true" />}

            <div className="stats__item-inner">
              <CounterWithTrigger stat={stat} triggered={triggered} />
              <p className="stats__label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CounterWithTrigger({ stat, triggered }: { stat: StatItem; triggered: boolean }) {
  const [localTriggered, setLocalTriggered] = useState(false)
  const val = useCountUp(stat.value, localTriggered)

  useEffect(() => {
    if (triggered) setLocalTriggered(true)
  }, [triggered])

  return (
    <div className="stats__number" aria-label={`${stat.value}${stat.suffix}`}>
      {val.toLocaleString('es-EC')}{stat.suffix}
    </div>
  )
}
