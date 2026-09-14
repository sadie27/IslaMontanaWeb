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
          Cuéntanos qué te gustaría ver.
        </h2>

        <p className="final-cta__body">
          No necesitamos que lo tengas decidido. Con unas fechas aproximadas ya
          podemos ponerte algo sobre la mesa, y a partir de ahí lo movemos. Te
          contestamos nosotros, gratis.
        </p>

        <div className="final-cta__ctas">
          <Link href={ROUTES.CONTACT} className="btn btn--primary">
            Pedir mi propuesta →
          </Link>
          <Link href={ROUTES.EXPERIENCES} className="btn btn--ghost">
            Ver ideas de viaje
          </Link>
        </div>
      </div>
    </section>
  )
}
