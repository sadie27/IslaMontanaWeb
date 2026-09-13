import Image from 'next/image'
import type { Tour } from '@/components/home/TourCard'

interface Props {
  tour: Tour
}

export default function ExperienceOverview({ tour }: Props) {
  const gallery = tour.gallery ?? []

  return (
    <section className="exp-overview">
      <div className="exp-overview__inner">
        <div>
          <span className="exp-overview__eyebrow" style={{ color: tour.accent }}>
            Sobre este tour
          </span>
          <h2 className="exp-overview__heading">Lo que vas a vivir.</h2>

          {tour.overview ? (
            <p className="exp-overview__text">{tour.overview}</p>
          ) : (
            <p className="exp-overview__text">
              Estamos preparando la descripción detallada de este tour. Mientras tanto,
              contáctanos y te contamos todo el itinerario sin compromiso.
            </p>
          )}

          <ul className="exp-overview__highlights" role="list">
            {tour.highlights.map((h) => (
              <li key={h} className="exp-overview__highlight-item">
                <span className="exp-overview__highlight-bullet" style={{ background: tour.accent }} aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="exp-overview__gallery">
          {gallery.length > 0 ? (
            gallery.slice(0, 4).map((src, i) => (
              <div
                key={src}
                className={i === 0 ? 'exp-overview__gallery-item exp-overview__gallery-item--wide' : 'exp-overview__gallery-item'}
              >
                <Image src={src} alt={`${tour.name} — foto ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))
          ) : (
            <div className="exp-overview__gallery-empty">
              Fotos de este tour próximamente
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
