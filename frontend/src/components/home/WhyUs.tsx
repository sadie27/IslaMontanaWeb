/* ─── WhyUs.tsx — Server Component ─────────────────────────── */

const WHY_ITEMS = [
  {
    icon: 'compass',
    title: 'Guías expertos y locales',
    desc: 'Todos nuestros guías son certificados por el Ministerio de Turismo de Ecuador y conocen cada rincón de sus regiones.',
  },
  {
    icon: 'leaf',
    title: 'Turismo responsable',
    desc: 'El 15% de cada tour va directo a comunidades locales y proyectos de conservación. Viajar bien tiene impacto real.',
  },
  {
    icon: 'users',
    title: 'Grupos reducidos',
    desc: 'Máximo 12 personas por tour. Sin masificación, sin prisas. La experiencia que te mereces.',
  },
  {
    icon: 'map-pin',
    title: 'Itinerarios a medida',
    desc: '¿Quieres algo diferente? Diseñamos tu viaje desde cero. Solo dinos cuántos días tienes y qué te mueve.',
  },
]

function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function getIcon(name: string) {
  switch (name) {
    case 'compass':  return <CompassIcon />
    case 'leaf':     return <LeafIcon />
    case 'users':    return <UsersIcon />
    case 'map-pin':  return <MapPinIcon />
    default:         return null
  }
}

import { ROUTES } from '@/config/routes'

export default function WhyUs() {
  return (
    <section className="why-us">
      <div className="why-us__inner">
        {/* ── Left column ── */}
        <div className="why-us__left">
          <p className="why-us__label">Por qué elegirnos</p>
          <h2 className="why-us__title">
            Viajes que dejan<br />
            <span className="why-us__title-accent">huella de verdad.</span>
          </h2>
          <p className="why-us__body">
            No somos una agencia más. Somos un equipo pequeño de viajeros ecuatorianos
            que llevan más de diez años diseñando experiencias auténticas en los cuatro
            mundos del Ecuador.
          </p>
          <a href={ROUTES.ABOUT} className="why-us__link">
            Conoce nuestro equipo →
          </a>
        </div>

        {/* ── Right column: trust items ── */}
        <div className="why-us__right">
          <ul className="trust-grid" role="list">
            {WHY_ITEMS.map((item) => (
              <li key={item.icon} className="trust-item">
                <span className="trust-item__icon" aria-hidden="true">
                  {getIcon(item.icon)}
                </span>
                <h3 className="trust-item__title">{item.title}</h3>
                <p className="trust-item__desc">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
