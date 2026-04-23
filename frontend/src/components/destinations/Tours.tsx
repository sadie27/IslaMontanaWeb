'use client'

import { useState } from 'react'
import type { Destination, TourItem } from '@/lib/types'
import TourCard from './TourCard'

const TABS = [
  { id: 'dia',           label: 'Day Tours' },
  { id: 'cruceros',      label: 'Cruceros' },
  { id: 'tierra',        label: 'Viaje a tierra' },
  { id: 'personalizado', label: 'Personalizado' },
] as const

interface Props {
  destination: Destination
  bp: 'mobile' | 'tablet' | 'desktop'
}

export default function Tours({ destination, bp }: Props) {
  const { accentColor, tours } = destination
  const [activeTab, setActiveTab] = useState<keyof typeof tours>('dia')

  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const cur: TourItem[] = tours[activeTab]
  const px = isMobile ? '24px' : isTablet ? '40px' : '56px'

  const maxCols  = isTablet ? 2 : 3
  const gridCols = cur.length === 1 ? '1fr' : `repeat(${Math.min(cur.length, maxCols)}, 1fr)`

  return (
    <section id="tours" style={{ background: 'white', padding: isMobile ? `64px ${px}` : isTablet ? `80px ${px}` : `96px ${px}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span style={{
            display: 'block', fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: accentColor, fontWeight: 700, marginBottom: 10,
          }}>
            Tours disponibles
          </span>
          <h2 style={{
            fontSize: isMobile ? 28 : isTablet ? 36 : 46,
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, color: 'var(--color-dark, #0d200c)',
          }}>
            Elige tu forma<br />de descubrirlas.
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
          {TABS.map((tab) => {
            const isEmpty = tours[tab.id].length === 0
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => { if (!isEmpty) setActiveTab(tab.id) }}
                style={{
                  padding: '10px 22px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? accentColor : isEmpty ? '#f5f5f5' : '#f0f5ee',
                  color: isActive ? 'white' : isEmpty ? '#bbb' : 'var(--color-dark, #0d200c)',
                  cursor: isEmpty ? 'default' : 'pointer',
                  opacity: isEmpty ? 0.45 : 1,
                  transition: 'all 0.18s ease',
                  letterSpacing: '0.01em',
                  border: 'none',
                  minHeight: 44,
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Cards */}
        {cur.length > 0 ? (
          isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cur.map((tour) => (
                <TourCard key={tour.id} tour={tour} accentColor={accentColor} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 14 }}>
              {cur.map((tour) => (
                <TourCard key={tour.id} tour={tour} accentColor={accentColor} />
              ))}
            </div>
          )
        ) : (
          <div style={{
            padding: 40, textAlign: 'center',
            color: 'rgba(13,32,12,0.55)', fontSize: 14,
            background: '#f8f8f8', borderRadius: 12,
          }}>
            Sin tours en esta categoría para este destino.
          </div>
        )}

      </div>
    </section>
  )
}
