import Link from 'next/link'
import type { Tour } from '@/components/home/TourCard'
import { ROUTES } from '@/config/routes'

interface Props {
  tour: Tour
}

export default function ExperienceCta({ tour }: Props) {
  return (
    <section className="exp-cta">
      <h2 className="exp-cta__heading">¿Te encaja este viaje?</h2>
      <p className="exp-cta__body">
        Dinos tus fechas y cuántos sois y te pasamos precio y disponibilidad
        para {tour.name}. Si quieres cambiarle días o paradas, también.
      </p>
      <Link href={ROUTES.TOUR_CONTACT(tour.id)} className="exp-cta__btn" style={{ background: tour.accent }}>
        Pedir precio y fechas
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  )
}
