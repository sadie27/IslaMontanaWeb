/* ════════════════════════════════════════════════════════════
   Destinations.tsx — Sección de destinos
   Server Component: datos estáticos, sin 'use client'
════════════════════════════════════════════════════════════ */

import Link from 'next/link'
import DestCard from './DestCard'
import { ROUTES } from '@/config/routes'
import { HOME_DESTINATIONS } from '@/data/home-destinations'

export default function Destinations() {
  return (
    <section className="destinations" aria-label="Nuestros destinos">
      <div className="destinations__inner">
        {/* Header — en desktop el link "Ver todos" va a la derecha */}
        <div className="destinations__header">
          <div className="destinations__header-text">
            <span className="destinations__kicker">Ecuador, cuatro mundos</span>
            <h2 className="destinations__title">Destinos que<br />transforman</h2>
          </div>

          {/* Link desktop (oculto en mobile via CSS) */}
          <Link href={ROUTES.DESTINATIONS} className="destinations__header-link btn btn--outline">
            Ver todos los destinos →
          </Link>
        </div>

        {/* Grid de cards */}
        <div className="destinations__grid">
          {HOME_DESTINATIONS.map((dest, i) => (
            <DestCard
              key={dest.slug}
              d={dest}
              tall={i === 0}
            />
          ))}
        </div>

        {/* Link mobile (oculto en desktop via CSS) */}
        <div className="destinations__footer-link">
          <Link href={ROUTES.DESTINATIONS} className="btn btn--outline">
            Ver todos los destinos →
          </Link>
        </div>
      </div>
    </section>
  )
}
