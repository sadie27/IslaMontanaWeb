/* ════════════════════════════════════════════════════════════
   Destinations.tsx — Sección de destinos
   Server Component: datos estáticos, sin 'use client'
════════════════════════════════════════════════════════════ */

import Link from 'next/link'
import DestCard, { type DestinationItem } from './DestCard'

const DESTINATIONS: DestinationItem[] = [
  {
    slug: 'galapagos',
    name: 'Islas Galápagos',
    label: 'Fauna & Snorkel',
    src: '/images/hero-main/galapagos.webp',
    accent: '#1a7a8a',
    desc: 'Nada junto a leones marinos en aguas cristalinas. Un archipiélago único donde la evolución ocurrió a su propio ritmo.',
  },
  {
    slug: 'amazonia',
    name: 'Amazonía Ecuatoriana',
    label: 'Selva & Biodiversidad',
    src: '/images/hero-main/amazonia.webp',
    accent: '#2d6a1e',
    desc: '600 especies de aves y una biodiversidad sin igual. La selva más rica del planeta te espera.',
  },
  {
    slug: 'andes-naturaleza',
    name: 'Andes & Volcanes',
    label: 'Trekking & Cumbres',
    src: '/images/hero-main/andes-naturaleza.webp',
    accent: '#4a6fa5',
    desc: 'Ocho volcanes activos y paisajes de altitud que cortan el aliento. La columna vertebral de Ecuador.',
  },
  {
    slug: 'andes-cultura',
    name: 'Andes Cultural',
    label: 'Pueblos & Tradición',
    src: '/images/hero-main/galapagos.webp',
    accent: '#8B4513',
    desc: 'Mercados indígenas, textiles artesanales y comunidades que guardan siglos de historia viva.',
  },
]

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
          <Link href="/destinations" className="destinations__header-link btn btn--outline">
            Ver todos los destinos →
          </Link>
        </div>

        {/* Grid de cards */}
        <div className="destinations__grid">
          {DESTINATIONS.map((dest, i) => (
            <DestCard
              key={dest.slug}
              d={dest}
              tall={i === 0}
            />
          ))}
        </div>

        {/* Link mobile (oculto en desktop via CSS) */}
        <div className="destinations__footer-link">
          <Link href="/destinations" className="btn btn--outline">
            Ver todos los destinos →
          </Link>
        </div>
      </div>
    </section>
  )
}
