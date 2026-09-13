import { COMPANY_VALUES } from '@/data/about'

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

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
    </svg>
  )
}

function getIcon(icon: string) {
  switch (icon) {
    case 'compass': return <CompassIcon />
    case 'leaf':    return <LeafIcon />
    case 'users':   return <UsersIcon />
    case 'shield':  return <ShieldIcon />
    default:        return null
  }
}

export default function AboutValues() {
  return (
    <section className="about-values">
      <div className="about-values__inner">
        <h2 className="about-values__title">
          <span className="about-values__title-lead">Nuestros valores</span>
          Lo que no negociamos.
        </h2>

        <ul className="trust-grid" role="list">
          {COMPANY_VALUES.map((value) => (
            <li key={value.title} className="trust-item">
              <span className="trust-item__icon" aria-hidden="true">
                {getIcon(value.icon)}
              </span>
              <h3 className="trust-item__title">{value.title}</h3>
              <p className="trust-item__desc">{value.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
