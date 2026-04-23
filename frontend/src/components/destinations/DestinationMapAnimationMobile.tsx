'use client'

import { useEffect, useRef, useState } from 'react'
import { ECUADOR_PATHS, PHASE_VIEWBOXES_MOBILE, REGION_GROUPS } from '@/data/ecuadorPaths'
import { SA_PATHS } from '@/data/southAmericaPaths'
import DestinationCard from '@/components/destinations/DestinationCard'

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getRegion(id: string): string | null {
  for (const [region, ids] of Object.entries(REGION_GROUPS)) {
    if (ids.includes(id)) return region
  }
  return null
}

function getRegionFill(region: string | null, phase: number): string {
  if (region === 'galapagos') return phase === 2 ? '#1a7a8a' : '#b8d4c0'
  if (region === 'oriente')   return phase === 4 ? '#4a9e0f' : '#b8d4c0'
  if (region === 'sierra')    return phase === 5 ? '#d97706' : '#b8d4c0'
  if (region === 'costa')     return '#b8d4c0'
  return '#d8e8dd'
}

function getRegionOpacity(region: string | null, phase: number): number {
  if (region === null) return 0.60
  const active =
    (region === 'galapagos' && phase === 2) ||
    (region === 'oriente'   && phase === 4) ||
    (region === 'sierra'    && phase === 5)
  return active ? 1.0 : 0.80
}

interface ViewBox { x: number; y: number; w: number; h: number }

const MOBILE_SLIDES = 5
const SLIDE_TO_PHASE = [0, 1, 2, 4, 5] as const

const SA_VB_INITIAL: ViewBox = { x: 131, y: 385, w: 288, h: 299 }
const SA_VB_ECUADOR: ViewBox = { x: 218, y: 445, w: 80,  h: 70  }

const DESTINATIONS = [
  {
    slug: 'galapagos',
    href: '/destinations/galapagos',
    imageSrc: '/images/mega-menu/galapagos.webp',
    imageAlt: 'Lobos marinos en las Islas Galápagos',
    label: 'Fauna & Snorkel',
    title: 'Islas Galápagos',
    description: 'Nada junto a leones marinos. Observa iguanas que Darwin describió. El único lugar del mundo donde la vida no te teme.',
    phase: 2,
    index: 0,
  },
  {
    slug: 'amazonia',
    href: '/destinations/amazonia',
    imageSrc: '/images/mega-menu/amazonia.webp',
    imageAlt: 'Selva amazónica ecuatoriana vista desde el río',
    label: 'Selva & Biodiversidad',
    title: 'Amazonía Ecuatoriana',
    description: 'El pulmón del planeta desde adentro. Canoas, aves imposibles y cielos nocturnos sin contaminación lumínica.',
    phase: 4,
    index: 1,
  },
  {
    slug: 'andes-cultura',
    href: '/destinations/andes-cultura',
    imageSrc: '/images/mega-menu/andes-cultura.webp',
    imageAlt: 'Mercado indígena de Otavalo, Ecuador',
    label: 'Pueblos & Tradición',
    title: 'Andes Cultural',
    description: 'Mercados indígenas, textiles milenarios y la cordillera que fue cuna de imperios. Ecuador en su esencia más humana.',
    phase: 5,
    index: 2,
  },
  {
    slug: 'andes-naturaleza',
    href: '/destinations/andes-naturaleza',
    imageSrc: '/images/mega-menu/andes-naturaleza.webp',
    imageAlt: 'Volcán Cotopaxi nevado bajo cielo despejado',
    label: 'Volcanes & Páramos',
    title: 'Andes & Volcanes',
    description: 'Cumbres que tocan las nubes, cóndores en vuelo y lagunas de un verde imposible. Trekking en el techo del mundo.',
    phase: 5,
    index: 3,
  },
]

export default function DestinationMapAnimationMobile() {
  const svgRef      = useRef<SVGSVGElement>(null)
  const svgSARef    = useRef<SVGSVGElement>(null)
  const rafRef      = useRef<number>(0)
  const currentVB   = useRef<ViewBox>({ ...PHASE_VIEWBOXES_MOBILE[0] })
  const targetVB    = useRef<ViewBox>({ ...PHASE_VIEWBOXES_MOBILE[0] })
  const currentSAVB = useRef<ViewBox>({ ...SA_VB_INITIAL })
  const targetSAVB  = useRef<ViewBox>({ ...SA_VB_INITIAL })

  const [phase, setPhase]           = useState(0)
  const [mobileSlide, setMobileSlide] = useState(0)
  const [heroMounted, setHeroMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const prevPhaseRef     = useRef(0)
  const mobileSlideRef   = useRef(0)
  const reducedMotionRef = useRef(false)

  const touchStartX    = useRef(0)
  const touchStartY    = useRef(0)
  const touchStartTime = useRef(0)
  const isSwiping      = useRef(false)

  const opacitySA      = phase <= 1 ? 0.65 : 0
  const opacityEcuador = phase >= 2 ? 1 : 0

  useEffect(() => { mobileSlideRef.current = mobileSlide }, [mobileSlide])
  useEffect(() => { reducedMotionRef.current = reducedMotion }, [reducedMotion])

  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    let stopped = false

    function tick() {
      if (stopped) return
      rafRef.current = requestAnimationFrame(tick)
      if (!svgRef.current) return

      const lerpFactor = reducedMotionRef.current ? 1.0 : 0.06
      const newPhase   = SLIDE_TO_PHASE[mobileSlideRef.current]

      targetVB.current  = PHASE_VIEWBOXES_MOBILE[newPhase]

      const cur = currentVB.current
      const tgt = targetVB.current
      const nx  = lerp(cur.x, tgt.x, lerpFactor)
      const ny  = lerp(cur.y, tgt.y, lerpFactor)
      const nw  = lerp(cur.w, tgt.w, lerpFactor)
      const nh  = lerp(cur.h, tgt.h, lerpFactor)

      if (Math.abs(nx - cur.x) > 0.01 || Math.abs(ny - cur.y) > 0.01 || Math.abs(nw - cur.w) > 0.01 || Math.abs(nh - cur.h) > 0.01) {
        currentVB.current = { x: nx, y: ny, w: nw, h: nh }
        svgRef.current.setAttribute('viewBox', `${nx} ${ny} ${nw} ${nh}`)
      }

      if (svgSARef.current) {
        targetSAVB.current = newPhase >= 1 ? SA_VB_ECUADOR : SA_VB_INITIAL
        const sa  = currentSAVB.current
        const sat = targetSAVB.current
        const sax = lerp(sa.x, sat.x, lerpFactor)
        const say = lerp(sa.y, sat.y, lerpFactor)
        const saw = lerp(sa.w, sat.w, lerpFactor)
        const sah = lerp(sa.h, sat.h, lerpFactor)
        if (Math.abs(sax - sa.x) > 0.01 || Math.abs(say - sa.y) > 0.01 || Math.abs(saw - sa.w) > 0.01 || Math.abs(sah - sa.h) > 0.01) {
          currentSAVB.current = { x: sax, y: say, w: saw, h: sah }
          svgSARef.current.setAttribute('viewBox', `${sax} ${say} ${saw} ${sah}`)
        }
      }

      if (newPhase !== prevPhaseRef.current) {
        prevPhaseRef.current = newPhase
        setPhase(newPhase)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { stopped = true; cancelAnimationFrame(rafRef.current) }
  }, [])

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current    = e.touches[0].clientX
    touchStartY.current    = e.touches[0].clientY
    touchStartTime.current = Date.now()
    isSwiping.current      = true
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isSwiping.current) return
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > dy && dx > 10) e.preventDefault()
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!isSwiping.current) return
    isSwiping.current = false
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dt = Date.now() - touchStartTime.current
    if ((Math.abs(dx) > 30 && dt < 400) || Math.abs(dx) > 80) {
      setMobileSlide(prev =>
        dx < 0 ? Math.min(prev + 1, MOBILE_SLIDES - 1) : Math.max(prev - 1, 0)
      )
    }
  }

  const bottomContent = () => {
    const slidePhase = SLIDE_TO_PHASE[mobileSlide]

    if (slidePhase === 0) return (
      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '480px' }}>
        <span style={{
          display: 'block', textTransform: 'uppercase' as const,
          fontSize: '11px', letterSpacing: '0.2em', color: '#3aa023', marginBottom: '12px',
          opacity: heroMounted ? 1 : 0, transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 280ms ${EASE_OUT}, transform 280ms ${EASE_OUT}`,
        }}>Nuestros Destinos</span>
        <h2 style={{
          fontFamily: 'var(--font-outfit, Outfit, sans-serif)',
          fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.03em', color: '#111827', marginBottom: '12px',
          opacity: heroMounted ? 1 : 0, transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 280ms ${EASE_OUT} 50ms, transform 280ms ${EASE_OUT} 50ms`,
        }}>Ecuador,<br />cuatro mundos.</h2>
        <p style={{
          fontSize: '14px', fontWeight: 300, color: 'rgba(0,0,0,0.55)', lineHeight: 1.6,
          opacity: heroMounted ? 1 : 0, transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 280ms ${EASE_OUT} 100ms, transform 280ms ${EASE_OUT} 100ms`,
        }}>Desliza para explorar las cuatro regiones del país más biodiverso del planeta.</p>
      </div>
    )

    if (slidePhase === 1) return (
      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '480px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
          Ecuador, en el corazón de Sudamérica. Cuatro regiones únicas esperan ser exploradas.
        </p>
      </div>
    )

    if (slidePhase === 2) {
      const dest = DESTINATIONS.find(d => d.phase === 2)!
      return (
        <ul style={{ listStyle: 'none', margin: '0 auto', padding: '16px 20px 24px', width: '100%', maxWidth: '480px' }}>
          <DestinationCard {...dest} aspectClass="aspect-[16/9]" colSpanClass="" imageExists={true} hideDescription />
        </ul>
      )
    }

    if (slidePhase === 4) {
      const dest = DESTINATIONS.find(d => d.phase === 4)!
      return (
        <ul style={{ listStyle: 'none', margin: '0 auto', padding: '16px 20px 24px', width: '100%', maxWidth: '480px' }}>
          <DestinationCard {...dest} aspectClass="aspect-[16/9]" colSpanClass="" imageExists={true} hideDescription />
        </ul>
      )
    }

    if (slidePhase === 5) {
      return (
        <ul style={{ listStyle: 'none', margin: '0 auto', padding: '16px 20px 24px', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {DESTINATIONS.filter(d => d.phase === 5).map(dest => (
            <DestinationCard key={dest.slug} {...dest} aspectClass="aspect-[16/9]" colSpanClass="" imageExists={true} hideDescription />
          ))}
        </ul>
      )
    }

    return null
  }

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .dma-mobile-card { transition: opacity 220ms ease !important; transform: none !important; }
        }
        @media (hover: hover) and (pointer: fine) {
          .dma-dot-mobile:hover { background: rgba(58,160,35,0.6) !important; }
        }
      `}</style>

      <section
        aria-label="Mapa interactivo de destinos"
        role="region"
        style={{ position: 'relative', minHeight: '100dvh', background: '#ffffff', overflow: 'hidden' }}
      >
        {/* Keyboard navigation (sr-only) */}
        <button
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-2 focus:rounded"
          onClick={() => setMobileSlide(p => Math.max(0, p - 1))}
          aria-label="Destino anterior"
        >
          Destino anterior
        </button>
        <button
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-24 focus:z-50 focus:bg-white focus:p-2 focus:rounded"
          onClick={() => setMobileSlide(p => Math.min(MOBILE_SLIDES - 1, p + 1))}
          aria-label="Destino siguiente"
        >
          Destino siguiente
        </button>

        <div
          style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* MAP — 55dvh */}
          <div style={{ flex: '0 0 55dvh', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>

            {/* South America SVG */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: opacitySA,
              transition: 'opacity 800ms ease',
              pointerEvents: 'none',
            }}>
              <svg
                ref={svgSARef}
                viewBox={`${SA_VB_INITIAL.x} ${SA_VB_INITIAL.y} ${SA_VB_INITIAL.w} ${SA_VB_INITIAL.h}`}
                width="100%" height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                {SA_PATHS.map(p => (
                  <path
                    key={p.id} d={p.d}
                    fill={p.id === 'EC' ? '#3aa023' : '#c8ddd0'}
                    fillOpacity={phase === 1 ? (p.id === 'EC' ? 0.85 : 0.25) : 0.85}
                    stroke="#9ab8a4" strokeWidth={0.3}
                    style={{ transition: 'fill-opacity 600ms ease' }}
                  />
                ))}
              </svg>
            </div>

            {/* Ecuador SVG */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: opacityEcuador,
              transition: opacityEcuador > 0 ? 'opacity 800ms ease 200ms' : 'opacity 800ms ease',
              pointerEvents: opacityEcuador > 0 ? 'auto' : 'none',
            }}>
              <svg
                ref={svgRef}
                viewBox={`${PHASE_VIEWBOXES_MOBILE[0].x} ${PHASE_VIEWBOXES_MOBILE[0].y} ${PHASE_VIEWBOXES_MOBILE[0].w} ${PHASE_VIEWBOXES_MOBILE[0].h}`}
                width="100%" height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                {ECUADOR_PATHS.map(p => {
                  const region = getRegion(p.id)
                  return (
                    <path
                      key={p.id} d={p.d}
                      fill={getRegionFill(region, phase)}
                      fillOpacity={getRegionOpacity(region, phase)}
                      stroke="#7aaa88" strokeWidth={0.5}
                      style={{ transition: 'fill 800ms ease, fill-opacity 800ms ease' }}
                    />
                  )
                })}
              </svg>
            </div>

            {/* Galapagos inset */}
            <div style={{
              position: 'absolute', bottom: '8%', left: '5%',
              width: '22%', aspectRatio: '1.4',
              border: '1px solid rgba(0,0,0,0.12)', borderRadius: '6px',
              background: 'rgba(255,255,255,0.90)', padding: '8px',
              opacity: phase === 1 ? 1 : 0,
              transition: 'opacity 600ms ease',
              zIndex: 5,
            }}>
              <svg viewBox="-20 20 165 120" width="100%" height="100%">
                {ECUADOR_PATHS.filter(p => p.id === 'EC-W').map(p => (
                  <path key={p.id} d={p.d}
                    fill="#b8d4c0" fillOpacity={0.90}
                    stroke="#7aaa88" strokeWidth={0.8}
                    style={{ transition: 'fill 800ms ease' }}
                  />
                ))}
              </svg>
              <p style={{
                color: 'rgba(0,0,0,0.45)', fontSize: '9px', textAlign: 'center',
                marginTop: '3px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              }}>Galápagos</p>
            </div>

            {/* Phase label */}
            <div style={{
              position: 'absolute', top: '5%', right: '5%', zIndex: 10,
              opacity: phase > 0 ? 1 : 0, transition: 'opacity 400ms ease',
              fontSize: '10px', letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: 'rgba(0,0,0,0.70)',
              background: 'rgba(240,242,240,0.92)',
              border: '1px solid rgba(0,0,0,0.10)',
              borderRadius: '4px',
              padding: '4px 8px',
              backdropFilter: 'blur(4px)',
            }}>
              {phase === 1 && 'Ecuador Continental'}
              {phase === 2 && 'Islas Galápagos'}
              {phase === 4 && 'Amazonía'}
              {phase === 5 && 'Andes'}
            </div>

            {/* Navigation dots */}
            <div
              role="tablist"
              aria-label="Navegación de destinos"
              style={{
                position: 'absolute', bottom: 12, left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', gap: 8, zIndex: 20,
              }}
            >
              {Array.from({ length: MOBILE_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  className="dma-dot-mobile"
                  role="tab"
                  aria-selected={mobileSlide === i}
                  aria-label={`Destino ${i + 1} de ${MOBILE_SLIDES}`}
                  onClick={() => setMobileSlide(i)}
                  style={{
                    width: mobileSlide === i ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: mobileSlide === i ? '#3aa023' : 'rgba(0,0,0,0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    margin: '19px 4px',
                    transition: `width 200ms ${EASE_OUT}, background 200ms ease`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* CARD — alto natural según contenido */}
          <div style={{
            flex: '1 0 auto',
            background: '#ffffff',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'center',
          }}>
            {bottomContent()}
          </div>
        </div>
      </section>
    </>
  )
}
