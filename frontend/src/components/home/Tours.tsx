/* ─── Tours.tsx — Server Component ─────────────────────────── */

import TourCard, { type Tour } from './TourCard'

const TOURS: Tour[] = [
  {
    id: 'galapagos-esencial',
    name: 'Galápagos Esencial',
    duration: '8 días / 7 noches',
    difficulty: 'Fácil',
    price: 'desde $1.890',
    badge: 'Más reservado',
    accent: '#1a7a8a',
    region: 'Galápagos',
    highlights: [
      'Snorkel en Kicker Rock',
      'Colonia de leones marinos',
      'Guía naturalista certificado',
    ],
  },
  {
    id: 'cuyabeno-inmersivo',
    name: 'Cuyabeno Inmersivo',
    duration: '7 días / 6 noches',
    difficulty: 'Fácil',
    price: 'desde $890',
    badge: 'Auténtico',
    accent: '#2d6a1e',
    region: 'Amazonía',
    highlights: [
      'Lodge en Reserva Cuyabeno',
      'Delfines rosados del Amazonas',
      'Cielos sin contaminación lumínica',
    ],
  },
  {
    id: 'quilotoa-loop',
    name: 'Quilotoa Loop',
    duration: '4 días / 3 noches',
    difficulty: 'Moderado',
    price: 'desde $310',
    badge: 'Trekking clásico',
    accent: '#4a6fa5',
    region: 'Andes',
    highlights: [
      'Laguna volcánica esmeralda',
      'Trekking guiado 3 días',
      'Pueblos Tigua y Zumbahua',
    ],
  },
]

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
          <a href="/tours" className="tours__view-all tours__view-all--desktop">
            Ver todos los tours →
          </a>
        </div>

        {/* ── Grid ── */}
        <ul className="tours__grid" role="list">
          {TOURS.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>

        {/* Ver todos — mobile: al final */}
        <div className="tours__view-all-wrap">
          <a href="/tours" className="tours__view-all tours__view-all--mobile">
            Ver todos los tours →
          </a>
        </div>
      </div>
    </section>
  )
}
