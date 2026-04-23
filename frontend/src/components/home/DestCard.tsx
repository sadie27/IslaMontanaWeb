/* ════════════════════════════════════════════════════════════
   DestCard.tsx — Tarjeta de destino
   Server Component: sin 'use client'
   Hover/active gestionado 100% por CSS en home.css
════════════════════════════════════════════════════════════ */

import Image from 'next/image'
import Link from 'next/link'

export interface DestinationItem {
  slug: string
  name: string
  label: string
  src: string
  accent: string
  desc: string
}

interface DestCardProps {
  d: DestinationItem
  tall?: boolean
}

export default function DestCard({ d, tall = false }: DestCardProps) {
  const cardClass = ['dest-card', tall ? 'dest-card--tall' : ''].filter(Boolean).join(' ')

  return (
    <Link href={`/destinations/${d.slug}`} className={cardClass} aria-label={`Explorar ${d.name}`}>
      {/* Imagen de fondo */}
      <div className="dest-card__img">
        <Image
          src={d.src}
          alt={d.name}
          fill
          sizes={tall ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 100vw, 25vw'}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Overlay degradado */}
      <div className="dest-card__overlay" />

      {/* Botón Explorar — visible solo en hover desktop (CSS) */}
      <div className="dest-card__explore" aria-hidden="true">
        Explorar →
      </div>

      {/* Contenido inferior */}
      <div className="dest-card__content">
        <span
          className="dest-card__label"
          style={{ color: d.accent }}
        >
          {d.label}
        </span>
        <h3 className="dest-card__title">{d.name}</h3>
        {tall && <p className="dest-card__desc">{d.desc}</p>}
      </div>
    </Link>
  )
}
