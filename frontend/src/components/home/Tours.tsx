/* ─── Tours.tsx — Server Component ─────────────────────────── */

import Link from 'next/link'
import TourCard from './TourCard'
import { ROUTES } from '@/config/routes'
import { FEATURED_HOME_TOURS } from '@/data/home-tours'

export default function Tours() {
  return (
    <section className="tours">
      <div className="tours__inner">
        {/* ── Header ── */}
        <div className="tours__header">
          <div className="tours__header-left">
            <h2 className="tours__title">
              <span className="tours__title-lead">Tours populares</span>
              Los más elegidos por nuestros viajeros.
            </h2>
          </div>
          {/* Ver todos — desktop: arriba derecha */}
          <Link href={ROUTES.EXPERIENCES} className="tours__view-all tours__view-all--desktop">
            Ver todos los tours →
          </Link>
        </div>

        {/* ── Grid ── */}
        <ul className="tours__grid" role="list">
          {FEATURED_HOME_TOURS.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} priority />
            </li>
          ))}
        </ul>

        {/* Ver todos — mobile: al final */}
        <div className="tours__view-all-wrap">
          <Link href={ROUTES.EXPERIENCES} className="tours__view-all tours__view-all--mobile">
            Ver todos los tours →
          </Link>
        </div>
      </div>
    </section>
  )
}
