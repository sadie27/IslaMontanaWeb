'use client'

import { useEffect, useRef, useState } from 'react'
import { ECUADOR_PATHS, PHASE_VIEWBOXES, REGION_GROUPS } from '@/data/ecuadorPaths'
import { SA_PATHS } from '@/data/southAmericaPaths'
import DestinationCard from '@/components/destinations/DestinationCard'

const EASE_OUT  = 'cubic-bezier(0.23, 1, 0.32, 1)'
const EASE_INOUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
const EASE_IN   = 'cubic-bezier(0.32, 0, 0.67, 0)'

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

const DESTINATIONS = [
  {
    slug: 'galapagos',
    href: '/destinations/galapagos',
    imageSrc: '/images/mega-menu/galapagos.webp',
    imageAlt: 'Lobos marinos en las Islas Galápagos',
    label: 'Fauna & Snorkel',
    title: 'Islas Galápagos',
    description: 'Nada junto a leones marinos. Observa iguanas que Darwin describió. El único lugar del mundo donde la vida no te teme.',
    cardSide: 'left' as const,
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
    cardSide: 'right' as const,
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
    cardSide: 'left' as const,
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
    cardSide: 'right' as const,
    phase: 5,
    index: 3,
  },
]

// Wrapper absoluto que posiciona el DestinationCard sobre el mapa
function MapCard({
  dest,
  visible,
  side,
  staggerMs = 0,
  cardWidth = 'min(380px, 45vw)',
}: {
  dest: typeof DESTINATIONS[0]
  visible: boolean
  side: 'left' | 'right'
  staggerMs?: number
  cardWidth?: string
}) {
  const translateFrom = side === 'left' ? 'translateX(-20px)' : 'translateX(20px)'
  return (
    <ul
      style={{
        position: 'absolute',
        top: '50%',
        ...(side === 'left' ? { left: '3%' } : { right: '3%' }),
        transform: visible
          ? 'translateY(-50%) translateX(0) scale(1)'
          : `translateY(-50%) ${translateFrom} scale(0.97)`,
        opacity: visible ? 1 : 0,
        transition: visible
          ? `opacity 280ms ${EASE_OUT} ${staggerMs}ms, transform 280ms ${EASE_OUT} ${staggerMs}ms`
          : `opacity 160ms ${EASE_IN}, transform 160ms ${EASE_IN}`,
        width: cardWidth,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        zIndex: 20,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <DestinationCard
        {...dest}
        aspectClass="aspect-[4/3]"
        colSpanClass=""
        imageExists={true}
        hideDescription
      />
    </ul>
  )
}

// SA viewbox inicial (-15% zoom sobre el original 150 420 250 260)
const SA_VB_INITIAL: ViewBox = { x: 131, y: 385, w: 288, h: 299 }
// SA viewbox zoom hacia Ecuador (centrado en coords EC del SA SVG ~248-264, 459-477)
const SA_VB_ECUADOR: ViewBox = { x: 218, y: 445, w: 80, h: 70 }

export default function DestinationMapAnimation() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const svgSARef = useRef<SVGSVGElement>(null)
  const rafRef = useRef<number>(0)
  const currentVB = useRef<ViewBox>({ x: 0, y: 0, w: 820, h: 330 })
  const targetVB = useRef<ViewBox>({ x: 0, y: 0, w: 820, h: 330 })
  const currentSAVB = useRef<ViewBox>({ ...SA_VB_INITIAL })
  const targetSAVB = useRef<ViewBox>({ ...SA_VB_INITIAL })

  const [phase, setPhase] = useState(0)
  const [heroVisible, setHeroVisible] = useState(true)
  const [visibleCards, setVisibleCards] = useState({
    galapagos: false,
    amazonia: false,
    andesCultura: false,
    andesNaturaleza: false,
  })
  const [heroMounted, setHeroMounted] = useState(false)

  const prevPhaseRef = useRef(0)

  // SA visible en fases 0 y 1 (zoom hacia Ecuador), se oculta al llegar a Galápagos (fase 2)
  // Ecuador visible solo desde fase 2 en adelante
  const opacitySA = phase <= 1 ? 0.65 : 0
  const opacityEcuador = phase >= 2 ? 1 : 0

  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let stopped = false

    function tick() {
      if (stopped) return
      rafRef.current = requestAnimationFrame(tick)

      if (!sectionRef.current || !svgRef.current) return

      const scrollY = window.scrollY
      const offsetTop = sectionRef.current.offsetTop
      const scrollRange = sectionRef.current.offsetHeight - window.innerHeight
      const progress = clamp((scrollY - offsetTop) / scrollRange, 0, 1)

      let newPhase = 0
      if (progress < 0.12)      newPhase = 0
      else if (progress < 0.22) newPhase = 1
      else if (progress < 0.42) newPhase = 2
      else if (progress < 0.50) newPhase = 3
      else if (progress < 0.70) newPhase = 4
      else                       newPhase = 5

      // Ecuador SVG viewbox lerp
      const vb = PHASE_VIEWBOXES[newPhase]
      targetVB.current = vb

      const cur = currentVB.current
      const tgt = targetVB.current
      const LERP_FACTOR = 0.06

      const nx = lerp(cur.x, tgt.x, LERP_FACTOR)
      const ny = lerp(cur.y, tgt.y, LERP_FACTOR)
      const nw = lerp(cur.w, tgt.w, LERP_FACTOR)
      const nh = lerp(cur.h, tgt.h, LERP_FACTOR)

      if (Math.abs(nx - cur.x) > 0.01 || Math.abs(ny - cur.y) > 0.01 || Math.abs(nw - cur.w) > 0.01 || Math.abs(nh - cur.h) > 0.01) {
        currentVB.current = { x: nx, y: ny, w: nw, h: nh }
        svgRef.current.setAttribute('viewBox', `${nx} ${ny} ${nw} ${nh}`)
      }

      // SA SVG viewbox lerp — zoom hacia Ecuador en fase 1, quieto en fase 0
      if (svgSARef.current) {
        targetSAVB.current = newPhase >= 1 ? SA_VB_ECUADOR : SA_VB_INITIAL
        const sa = currentSAVB.current
        const sat = targetSAVB.current
        const sax = lerp(sa.x, sat.x, LERP_FACTOR)
        const say = lerp(sa.y, sat.y, LERP_FACTOR)
        const saw = lerp(sa.w, sat.w, LERP_FACTOR)
        const sah = lerp(sa.h, sat.h, LERP_FACTOR)
        if (Math.abs(sax - sa.x) > 0.01 || Math.abs(say - sa.y) > 0.01 || Math.abs(saw - sa.w) > 0.01 || Math.abs(sah - sa.h) > 0.01) {
          currentSAVB.current = { x: sax, y: say, w: saw, h: sah }
          svgSARef.current.setAttribute('viewBox', `${sax} ${say} ${saw} ${sah}`)
        }
      }

      if (newPhase !== prevPhaseRef.current) {
        prevPhaseRef.current = newPhase
        setPhase(newPhase)
        setHeroVisible(newPhase === 0)
        setVisibleCards({
          galapagos: newPhase === 2,
          amazonia: newPhase === 4,
          andesCultura: newPhase === 5,
          andesNaturaleza: newPhase === 5,
        })
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      stopped = true
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .dma-card { transition: opacity 280ms ease !important; transform: none !important; }
          .dma-hero-text { transition: opacity 280ms ease !important; transform: none !important; }
        }
        @media (hover: hover) and (pointer: fine) {
          .dma-card:hover { transform: translateY(calc(-50% - 2px)) !important; }
          .dma-card-link:hover { color: rgba(0,0,0,0.9) !important; border-color: rgba(0,0,0,0.4) !important; }
        }
        @media (max-width: 767px) {
          .dma-section { height: auto !important; }
          .dma-sticky { position: relative !important; height: auto !important; }
          .dma-map-layer { position: relative !important; height: 45vh !important; }
          .dma-content-layer { position: relative !important; padding: 32px 20px !important; }
          .dma-card { position: static !important; transform: none !important; opacity: 1 !important; width: 100% !important; max-width: 100% !important; margin: 16px 0 !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="dma-section"
        style={{ position: 'relative', height: '500vh' }}
        aria-label="Mapa interactivo de destinos"
      >
        {/* Sticky stage */}
        <div
          className="dma-sticky"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          {/* MAP LAYER — full background */}
          <div
            className="dma-map-layer"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: '#ffffff',
            }}
          >
            {/* South America SVG */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: opacitySA,
                transition: 'opacity 800ms ease',
                pointerEvents: 'none',
              }}
            >
              <svg
                ref={svgSARef}
                viewBox={`${SA_VB_INITIAL.x} ${SA_VB_INITIAL.y} ${SA_VB_INITIAL.w} ${SA_VB_INITIAL.h}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                {SA_PATHS.map(p => (
                  <path
                    key={p.id}
                    d={p.d}
                    fill={p.id === 'EC' ? '#3aa023' : '#c8ddd0'}
                    fillOpacity={phase === 1 ? (p.id === 'EC' ? 0.85 : 0.25) : 0.85}
                    stroke="#9ab8a4"
                    strokeWidth={0.3}
                    style={{ transition: 'fill-opacity 600ms ease' }}
                  />
                ))}
              </svg>
            </div>

            {/* Ecuador SVG */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: opacityEcuador,
                // delay solo al aparecer (0→1), no al desaparecer (evita flash en scroll-up)
                transition: opacityEcuador > 0 ? 'opacity 800ms ease 200ms' : 'opacity 800ms ease',
                pointerEvents: opacityEcuador > 0 ? 'auto' : 'none',
              }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 820 330"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                {ECUADOR_PATHS.map(p => {
                  const region = getRegion(p.id)
                  return (
                    <path
                      key={p.id}
                      d={p.d}
                      fill={getRegionFill(region, phase)}
                      fillOpacity={getRegionOpacity(region, phase)}
                      stroke="#7aaa88"
                      strokeWidth={0.5}
                      style={{
                        transition: 'fill 800ms ease, fill-opacity 800ms ease',
                      }}
                    />
                  )
                })}
              </svg>
            </div>

            {/* Galapagos inset */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '22%',
                width: '14%',
                aspectRatio: '1.4',
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.90)',
                padding: '8px',
                opacity: phase === 1 ? 1 : 0,
                transition: 'opacity 600ms ease',
                zIndex: 5,
              }}
            >
              <svg viewBox="-20 20 165 120" width="100%" height="100%">
                {ECUADOR_PATHS
                  .filter(p => p.id === 'EC-W')
                  .map(p => (
                    <path
                      key={p.id}
                      d={p.d}
                      fill={phase === 2 ? '#1a7a8a' : '#b8d4c0'}
                      fillOpacity={0.90}
                      stroke="#7aaa88"
                      strokeWidth={0.8}
                      style={{ transition: 'fill 800ms ease' }}
                    />
                  ))
                }
              </svg>
              <p
                style={{
                  color: 'rgba(0,0,0,0.45)',
                  fontSize: '9px',
                  textAlign: 'center',
                  marginTop: '3px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                }}
              >
                Galápagos
              </p>
            </div>

            {/* Phase label */}
            <div
              style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                zIndex: 10,
                opacity: phase > 0 ? 0.5 : 0,
                transition: 'opacity 400ms ease',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'rgba(0,0,0,0.40)',
              }}
            >
              {phase === 1 && 'Ecuador Continental'}
              {phase === 2 && 'Islas Galápagos'}
              {phase === 3 && 'Ecuador'}
              {phase === 4 && 'Amazonía'}
              {phase === 5 && 'Andes'}
            </div>
          </div>

          {/* CONTENT LAYER — floats above map */}
          <div
            className="dma-content-layer"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            {/* Hero text */}
            <div
              className="dma-hero-text"
              style={{
                position: 'absolute',
                left: '5%',
                top: '50%',
                transform: heroVisible ? 'translateY(-50%) translateY(0)' : 'translateY(-50%) translateY(-8px)',
                maxWidth: '420px',
                opacity: heroVisible ? 1 : 0,
                transition: heroVisible
                  ? `opacity 280ms ${EASE_OUT}, transform 280ms ${EASE_OUT}`
                  : `opacity 120ms ${EASE_IN}, transform 120ms ${EASE_IN}`,
                pointerEvents: heroVisible ? 'auto' : 'none',
              }}
            >
              <span
                style={{
                  display: 'block',
                  textTransform: 'uppercase' as const,
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#3aa023',
                  marginBottom: '16px',
                  opacity: heroMounted ? 1 : 0,
                  transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 280ms ${EASE_OUT} 0ms, transform 280ms ${EASE_OUT} 0ms`,
                }}
              >
                Nuestros Destinos
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-outfit, Outfit, sans-serif)',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  marginBottom: '16px',
                  textShadow: 'none',
                  opacity: heroMounted ? 1 : 0,
                  transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 280ms ${EASE_OUT} 50ms, transform 280ms ${EASE_OUT} 50ms`,
                }}
              >
                Ecuador,<br />cuatro mundos.
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'rgba(0,0,0,0.55)',
                  lineHeight: 1.6,
                  maxWidth: '38ch',
                  textShadow: 'none',
                  opacity: heroMounted ? 1 : 0,
                  transform: heroMounted ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 280ms ${EASE_OUT} 100ms, transform 280ms ${EASE_OUT} 100ms`,
                }}
              >
                Scroll para explorar las cuatro regiones del país más biodiverso del planeta.
              </p>
            </div>

            {/* Cards */}
            {DESTINATIONS.filter(d => d.phase === 2).map(dest => (
              <MapCard key={dest.slug} dest={dest} visible={visibleCards.galapagos} side={dest.cardSide} cardWidth="min(460px, 52vw)" />
            ))}
            {DESTINATIONS.filter(d => d.phase === 4).map(dest => (
              <MapCard key={dest.slug} dest={dest} visible={visibleCards.amazonia} side={dest.cardSide} />
            ))}
            {DESTINATIONS.filter(d => d.phase === 5 && d.cardSide === 'left').map(dest => (
              <MapCard key={dest.slug} dest={dest} visible={visibleCards.andesCultura} side="left" staggerMs={0} />
            ))}
            {DESTINATIONS.filter(d => d.phase === 5 && d.cardSide === 'right').map(dest => (
              <MapCard key={dest.slug} dest={dest} visible={visibleCards.andesNaturaleza} side="right" staggerMs={60} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
