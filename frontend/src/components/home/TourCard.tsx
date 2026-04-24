/* ─── TourCard.tsx — Server Component ──────────────────────── */

export interface Tour {
  id: string
  name: string
  duration: string
  difficulty: string
  price: string
  badge: string
  accent: string
  region: string
  highlights: string[]
}

const DIFF_COLORS: Record<string, string> = {
  'Fácil':    '#22c55e',
  'Moderado': '#eab308',
  'Exigente': '#ef4444',
}

interface TourCardProps {
  tour: Tour
}

import { ROUTES } from '@/config/routes'

export default function TourCard({ tour }: TourCardProps) {
  const diffColor = DIFF_COLORS[tour.difficulty] ?? '#6b7560'

  return (
    <article className="tour-card">
      {/* Badge */}
      <span
        className="tour-card__badge"
        style={{ background: tour.accent }}
      >
        {tour.badge}
      </span>

      {/* Region label */}
      <p className="tour-card__region">{tour.region}</p>

      {/* Title */}
      <h3 className="tour-card__title">{tour.name}</h3>

      {/* Meta: duration + difficulty */}
      <div className="tour-card__meta">
        <span className="tour-card__duration">{tour.duration}</span>
        <span
          className="tour-card__difficulty"
          style={{ color: diffColor }}
        >
          {tour.difficulty}
        </span>
      </div>

      {/* Highlights */}
      <ul className="tour-card__highlights" role="list">
        {tour.highlights.map((h) => (
          <li key={h} className="tour-card__highlight-item">
            <span
              className="tour-card__bullet"
              style={{ background: tour.accent }}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>

      {/* Footer: price + CTA */}
      <div className="tour-card__footer">
        <span
          className="tour-card__price"
          style={{ color: tour.accent }}
        >
          {tour.price}
        </span>
        <a
          href={ROUTES.TOUR(tour.id)}
          className="tour-card__cta"
          style={{ borderColor: tour.accent, color: tour.accent }}
        >
          Consultar →
        </a>
      </div>
    </article>
  )
}
