/* ─── FinalCta.tsx — Server Component ──────────────────────── */

import { ROUTES } from '@/config/routes'

export default function FinalCta() {
  return (
    <section className="final-cta">
      {/* Texto decorativo "EC" */}
      <span className="final-cta__bg-text" aria-hidden="true">EC</span>

      <div className="final-cta__content">
        <p className="final-cta__label">Empieza tu viaje</p>

        <h2 className="final-cta__title">
          Tu Ecuador te está<br />
          esperando.
        </h2>

        <p className="final-cta__body">
          Cuéntanos qué regiones te llaman, cuántos días tienes y
          cuántas personas viajan. Te preparamos un itinerario a medida
          sin coste ni compromiso.
        </p>

        <div className="final-cta__ctas">
          <a href={ROUTES.CONTACT} className="btn btn--primary">
            Planifica tu viaje →
          </a>
          <a href={ROUTES.DESTINATIONS} className="btn btn--ghost">
            Explorar destinos
          </a>
        </div>
      </div>
    </section>
  )
}
