/* ─── FinalCta.tsx — Server Component ──────────────────────── */

import Link from 'next/link'
import { ROUTES } from '@/config/routes'

export default function FinalCta() {
  return (
    <section className="final-cta">
      {/* Texto decorativo "EC" */}
      <span className="final-cta__bg-text" aria-hidden="true">EC</span>

      <div className="final-cta__content">
        <h2 className="final-cta__title">
          <span className="final-cta__title-lead">Empieza tu viaje</span>
          Tu Ecuador te está esperando.
        </h2>

        <p className="final-cta__body">
          Cuéntanos qué regiones te llaman, cuántos días tienes y
          cuántas personas viajan. Te preparamos un itinerario a medida
          sin coste ni compromiso.
        </p>

        <div className="final-cta__ctas">
          <Link href={ROUTES.CONTACT} className="btn btn--primary">
            Planifica tu viaje →
          </Link>
          <Link href={ROUTES.DESTINATIONS} className="btn btn--ghost">
            Explorar destinos
          </Link>
        </div>
      </div>
    </section>
  )
}
