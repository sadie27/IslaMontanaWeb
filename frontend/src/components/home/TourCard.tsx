/* ─── TourCard.tsx — Client Component (fallback de imagen requiere estado) ── */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'
import { DIFF_COLORS } from '@/config/colors'

export interface TourItineraryDay {
  title: string
  description: string
}

export interface Tour {
  id: string
  name: string
  duration: string
  difficulty: string
  price: string
  /**
   * Precio orientativo "desde", por persona, ej. '2.400 €'.
   * Opcional a propósito: si falta, la card y la ficha caen a `price`
   * ("Consultar") sin romper nada. No inventar cifras — rellenar solo
   * con datos confirmados por el cliente.
   */
  priceFrom?: string
  /**
   * Tamaño máximo del grupo, ej. 'Hasta 16 viajeros'. Dato tomado de los
   * programas oficiales del operador — no estimar.
   */
  groupSize?: string
  badge: string
  accent: string
  region: string
  highlights: string[]
  /** Foto de portada de la card — opcional, cae a un bloque de color por región si falta o no carga. */
  image?: string
  /** Párrafo largo de presentación — ficha de detalle. Opcional hasta rellenar. */
  overview?: string
  /** Fotos propias del tour — ficha de detalle. */
  gallery?: string[]
  /** Itinerario día a día — ficha de detalle. */
  itinerary?: TourItineraryDay[]
  /** Qué incluye el programa — ficha de detalle. */
  includes?: string[]
  /** Qué no incluye el programa — ficha de detalle. */
  excludes?: string[]
  /** Actividades principales, ej. "Hiking, birdwatching" — ficha de detalle. */
  activities?: string[]
}

interface TourCardProps {
  tour: Tour
  /** Fuerza carga inmediata — úsalo solo para grids pequeños (landing), no en listados largos. */
  priority?: boolean
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const diffColor = DIFF_COLORS[tour.difficulty] ?? '#6b7560'
  const [imgError, setImgError] = useState(false)
  const showImage = Boolean(tour.image) && !imgError

  return (
    <article className="tour-card">
      {/* Media */}
      <div className="tour-card__media">
        {showImage ? (
          <Image
            src={tour.image as string}
            alt={tour.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="tour-card__media-fallback" style={{ background: tour.accent }} aria-hidden="true" />
        )}
        <span className="tour-card__region">{tour.region}</span>
      </div>

      {/* Body */}
      <div className="tour-card__body">
        <div className="tour-card__meta">
          <span className="tour-card__duration">{tour.duration}</span>
          <span className="tour-card__dot" aria-hidden="true" />
          <span className="tour-card__difficulty" style={{ color: diffColor }}>
            {tour.difficulty}
          </span>
        </div>

        <h3 className="tour-card__title">{tour.name}</h3>

        <p className="tour-card__highlight">{tour.highlights[0]}</p>

        <div className="tour-card__footer">
          {/* Si hay precio orientativo lo mostramos con su "Desde" encima;
              si no, cae al texto plano de `price` ("Consultar"). */}
          {tour.priceFrom ? (
            <span className="tour-card__price-wrap">
              <span className="tour-card__price-from">Desde</span>
              <span className="tour-card__price">{tour.priceFrom}</span>
              <span className="tour-card__price-unit">/ persona</span>
            </span>
          ) : (
            <span className="tour-card__price">{tour.price}</span>
          )}
          <Link href={ROUTES.EXPERIENCE(tour.id)} className="tour-card__cta">
            Más información
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
