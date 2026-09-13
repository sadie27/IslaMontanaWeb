import type { Tour } from '@/components/home/TourCard'

interface Props {
  tour: Tour
}

export default function ExperienceItinerary({ tour }: Props) {
  const days = tour.itinerary ?? []

  return (
    <section className="exp-itinerary">
      <div className="exp-itinerary__inner">
        <span className="exp-itinerary__eyebrow" style={{ color: tour.accent }}>
          Día a día
        </span>
        <h2 className="exp-itinerary__heading">Cómo se vive<br />el viaje.</h2>

        {days.length > 0 ? (
          <ol className="exp-itinerary__list" role="list">
            {days.map((day, i) => (
              <li key={day.title} className="exp-itinerary__day">
                <span className="exp-itinerary__day-index" style={{ background: tour.accent }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="exp-itinerary__day-title">{day.title}</h3>
                  <p className="exp-itinerary__day-desc">{day.description}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="exp-itinerary__empty">
            El itinerario detallado de este tour está en preparación.
          </p>
        )}
      </div>
    </section>
  )
}
