import Link from 'next/link'
import type { Tour } from '@/components/home/TourCard'
import { ROUTES } from '@/config/routes'

interface Props {
  tour: Tour
}

export default function ExperienceCta({ tour }: Props) {
  return (
    <section className="exp-cta">
      <h2 className="exp-cta__heading">¿Listo para vivirlo?</h2>
      <p className="exp-cta__body">
        Sin compromiso. Cuéntanos tus fechas y cuántos viajeros son, y te
        preparamos una propuesta a medida para {tour.name}.
      </p>
      <Link href={ROUTES.TOUR_CONTACT(tour.id)} className="exp-cta__btn" style={{ background: tour.accent }}>
        Contactarnos
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  )
}
