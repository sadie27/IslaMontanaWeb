import Link from 'next/link'
import type { TourItem } from '@/lib/types'

const DIFF_COLORS = {
  'Fácil':    '#22c55e',
  'Moderado': '#eab308',
  'Exigente': '#ef4444',
} as const

interface Props {
  tour: TourItem
  accentColor: string
}

export default function TourCard({ tour, accentColor }: Props) {
  return (
    <div
      className="tour-card"
      style={{
        background: 'var(--color-dark)',
        borderRadius: 14,
        padding: 22,
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        height: '100%',
      }}
    >
      {tour.badge && (
        <span
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 100,
            background: accentColor,
            color: 'var(--color-dark)',
          }}
        >
          {tour.badge}
        </span>
      )}

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'white', lineHeight: 1.25, paddingRight: tour.badge ? 72 : 0 }}>
        {tour.name}
      </h3>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
        <span style={{ color: 'rgba(255,255,255,0.62)' }}>{tour.duration}</span>
        <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
        <span style={{ color: DIFF_COLORS[tour.difficulty], fontWeight: 600 }}>{tour.difficulty}</span>
      </div>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, listStyle: 'none', padding: 0, margin: 0 }}>
        {tour.highlights.map((h, i) => (
          <li key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,0.70)' }}>
            <span style={{ width: 4, height: 4, background: accentColor, marginTop: 6, flexShrink: 0, display: 'block' }} />
            {h}
          </li>
        ))}
      </ul>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 21, fontWeight: 900, letterSpacing: '-0.03em', color: accentColor }}>
          {tour.price}
        </span>
        <Link
          href={`/contact?tour=${tour.id}`}
          style={{
            border: `1px solid ${accentColor}55`,
            color: 'rgba(255,255,255,0.82)',
            fontSize: 12,
            fontWeight: 600,
            padding: '7px 14px',
            borderRadius: 7,
            textDecoration: 'none',
          }}
        >
          Consultar →
        </Link>
      </div>
    </div>
  )
}
