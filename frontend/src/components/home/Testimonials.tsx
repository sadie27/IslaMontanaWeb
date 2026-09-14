/* ─── Testimonials.tsx — Server Component ──────────────────────
   Se auto-oculta si TESTIMONIALS está vacío: así la home nunca
   muestra un hueco ni un testimonio de relleno. Ver data/testimonials.ts
   para el formato y cómo activarla. */

import { TESTIMONIALS } from '@/data/testimonials'

function QuoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1v2Z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h.5c0 2.25.25 4-2.5 4v3Z" />
    </svg>
  )
}

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section className="testimonials" aria-label="Opiniones de viajeros">
      <div className="testimonials__inner">
        <h2 className="testimonials__title">
          <span className="testimonials__title-lead">Lo que nos cuentan</span>
          Viajeros que ya fueron.
        </h2>

        <ul className="testimonials__grid" role="list">
          {TESTIMONIALS.map((t) => (
            <li key={`${t.name}-${t.trip}`} className="testimonial-card">
              <span className="testimonial-card__icon" aria-hidden="true">
                <QuoteIcon />
              </span>
              <blockquote className="testimonial-card__quote">{t.quote}</blockquote>
              <footer className="testimonial-card__meta">
                <cite className="testimonial-card__name">{t.name}</cite>
                <span className="testimonial-card__detail">
                  {t.origin} · {t.trip}
                  {t.date ? ` · ${t.date}` : ''}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
