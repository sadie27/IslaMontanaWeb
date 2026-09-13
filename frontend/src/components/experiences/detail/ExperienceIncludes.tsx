import type { Tour } from '@/components/home/TourCard'

interface Props {
  tour: Tour
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="exp-includes__item-icon">
      <path d="M2 6.2l2.6 2.6L10 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="exp-includes__item-icon">
      <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="rgba(13,32,12,0.4)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function ExperienceIncludes({ tour }: Props) {
  const includes = tour.includes ?? []
  const excludes = tour.excludes ?? []

  return (
    <section className="exp-includes">
      <div className="exp-includes__inner">
        <div>
          <div className="exp-includes__col-title">
            <span className="exp-includes__icon" style={{ background: `${tour.accent}20`, color: tour.accent }}>
              <CheckIcon color={tour.accent} />
            </span>
            Incluye
          </div>
          {includes.length > 0 ? (
            <ul className="exp-includes__list" role="list">
              {includes.map((item) => (
                <li key={item} className="exp-includes__item">
                  <CheckIcon color={tour.accent} />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="exp-includes__empty">Por confirmar — consúltanos los detalles.</p>
          )}
        </div>

        <div>
          <div className="exp-includes__col-title">
            <span className="exp-includes__icon" style={{ background: 'rgba(13,32,12,0.06)' }}>
              <CrossIcon />
            </span>
            No incluye
          </div>
          {excludes.length > 0 ? (
            <ul className="exp-includes__list" role="list">
              {excludes.map((item) => (
                <li key={item} className="exp-includes__item">
                  <CrossIcon />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="exp-includes__empty">Por confirmar — consúltanos los detalles.</p>
          )}
        </div>
      </div>
    </section>
  )
}
