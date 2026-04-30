/* ─── Tours.tsx — Server Component ─────────────────────────── */

import Link from 'next/link'
import TourCard from './TourCard'
import { ROUTES } from '@/config/routes'
import { HOME_TOURS } from '@/data/home-tours'

export default function Tours() {
  return (
    <section className="tours">
      <div className="tours__inner">
        {/* ── Header ── */}
        <div className="tours__header">
          <div className="tours__header-left">
            <p className="tours__label">Tours populares</p>
            <h2 className="tours__title">Los más elegidos por nuestros viajeros.</h2>
          </div>
          {/* Ver todos — desktop: arriba derecha */}
          <Link href={ROUTES.TOURS} className="tours__view-all tours__view-all--desktop">
            Ver todos los tours →
          </Link>
        </div>

        {/* ── Grid ── */}
        <ul className="tours__grid" role="list">
          {HOME_TOURS.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>

        {/* Ver todos — mobile: al final */}
        <div className="tours__view-all-wrap">
          <Link href={ROUTES.TOURS} className="tours__view-all tours__view-all--mobile">
            Ver todos los tours →
          </Link>
        </div>
      </div>
    </section>
  )
}
