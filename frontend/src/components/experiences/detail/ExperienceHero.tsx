'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Tour } from '@/components/home/TourCard'
import { ROUTES } from '@/config/routes'
import { DIFF_COLORS } from '@/config/colors'

interface Props {
  tour: Tour
  heroImage?: string
}

export default function ExperienceHero({ tour, heroImage }: Props) {
  const [imgError, setImgError] = useState(false)
  const diffColor = DIFF_COLORS[tour.difficulty] ?? '#6b7560'
  const showImage = Boolean(heroImage) && !imgError

  return (
    <section className="exp-hero">
      {showImage ? (
        <div className="exp-hero__bg">
          <Image
            src={heroImage as string}
            alt={tour.name}
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.55 }}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="exp-hero__bg" style={{ background: `${tour.accent}22` }} />
      )}
      <div className="exp-hero__gradient" aria-hidden="true" />

      <div className="exp-hero__inner">
        <nav className="exp-hero__breadcrumb fade-up fade-up-1" aria-label="Ruta de navegación">
          <Link href={ROUTES.EXPERIENCES}>Experiencias</Link>
          <span aria-hidden="true">/</span>
          <span>{tour.name}</span>
        </nav>

        <span
          className="exp-hero__badge fade-up fade-up-2"
          style={{ background: `${tour.accent}20`, border: `1px solid ${tour.accent}45`, color: tour.accent }}
        >
          <span className="exp-hero__badge-dot" style={{ background: tour.accent }} />
          {tour.region} · {tour.badge}
        </span>

        <h1 className="exp-hero__title fade-up fade-up-3">{tour.name}</h1>

        <div className="exp-hero__meta fade-up fade-up-4">
          <div className="exp-hero__meta-item">
            <span className="exp-hero__meta-value">{tour.duration}</span>
            <span className="exp-hero__meta-label">Duración</span>
          </div>
          <div className="exp-hero__meta-item">
            <span className="exp-hero__meta-value" style={{ color: diffColor }}>{tour.difficulty}</span>
            <span className="exp-hero__meta-label">Dificultad</span>
          </div>
          {tour.activities && tour.activities.length > 0 && (
            <div className="exp-hero__meta-item">
              <span className="exp-hero__meta-value">{tour.activities.join(' · ')}</span>
              <span className="exp-hero__meta-label">Actividades</span>
            </div>
          )}
        </div>

        <div className="exp-hero__actions fade-up fade-up-5">
          <span className="exp-hero__price">{tour.price}</span>
          <Link href={ROUTES.TOUR_CONTACT(tour.id)} className="exp-hero__cta" style={{ background: tour.accent }}>
            Consultar disponibilidad
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
