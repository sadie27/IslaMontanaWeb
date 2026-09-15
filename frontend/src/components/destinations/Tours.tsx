/* ─── Tours.tsx — Experiencias del destino ──────────────────────────────────
 *
 * Reutiliza el TourCard y el BEM `.tours__*` / `.tour-card__*` de la landing
 * (definidos en styles/home.css, cargado global vía globals.css). El objetivo
 * es que un destino y la home se vean como la misma web: antes esta sección
 * tenía su propia card de estilos inline y 4 tabs de categoría que, con el
 * catálogo actual, solo mostraban huecos vacíos.
 *
 * Los datos salen de HOME_TOURS (fuente de verdad, con foto y ficha completa),
 * no del campo `tours` de destinations.ts.
 */

import Link from 'next/link'
import type { Destination } from '@/lib/types'
import TourCard from '@/components/home/TourCard'
import { getToursByDestination } from '@/data/experiences'
import { ROUTES } from '@/config/routes'

interface Props {
  destination: Destination
  bp: 'mobile' | 'tablet' | 'desktop'
}

export default function Tours({ destination }: Props) {
  const tours = getToursByDestination(destination.slug)

  // Un destino sin experiencias aún no debe renderizar una sección vacía.
  if (tours.length === 0) return null

  return (
    <section id="tours" className="tours">
      <div className="tours__inner">

        {/* ── Header ── */}
        <div className="tours__header">
          <div className="tours__header-left">
            <h2 className="tours__title">
              <span className="tours__title-lead">Experiencias en este destino</span>
              Así se recorre {destination.name}. El itinerario final lo armamos contigo.
            </h2>
          </div>
          <Link href={ROUTES.EXPERIENCES} className="tours__view-all tours__view-all--desktop">
            Ver todas las experiencias →
          </Link>
        </div>

        {/* ── Grid ──
            `--tours-count` colapsa las columnas al número real de cards: un
            destino con 1 experiencia no debe dejar dos huecos vacíos. En tablet
            el CSS ya limita a 2 col, así que el máximo aquí es 3. */}
        <ul
          className="tours__grid tours__grid--fit"
          role="list"
          style={{ '--tours-count': tours.length } as React.CSSProperties}
        >
          {tours.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>

        <div className="tours__view-all-wrap">
          <Link href={ROUTES.EXPERIENCES} className="tours__view-all tours__view-all--mobile">
            Ver todas las experiencias →
          </Link>
        </div>

      </div>
    </section>
  )
}
