const LINKS = [
  { label: 'Islas Galápagos', sub: 'Fauna & Snorkel',      href: '/destinations/galapagos',        color: '#1a7a8a' },
  { label: 'Amazonía',        sub: 'Selva & Biodiversidad', href: '/destinations/amazonia',         color: '#2d6a1e' },
  { label: 'Andes Cultural',  sub: 'Pueblos & Tradición',   href: '/destinations/andes-cultura',    color: '#8B4513' },
  { label: 'Andes & Volcanes',sub: 'Trekking & Cumbres',    href: '/destinations/andes-naturaleza', color: '#4a6fa5' },
]

interface ErrorQuickLinksProps {
  isMobile: boolean
}

export default function ErrorQuickLinks({ isMobile }: ErrorQuickLinksProps) {
  const links = LINKS
  return (
    <>
      <div className="fade-up fade-up-5">
        <p className="error-page__quick-label">Quizás buscabas</p>
      </div>
      <div
        className="error-page__quick-grid fade-up fade-up-5"
        style={{
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 8 : 10,
          maxWidth: isMobile ? '100%' : 680,
        }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{ padding: isMobile ? '12px 14px' : '14px 16px' }}
            className="error-page__link-card"
          >
            <span className="error-page__link-card-bar" style={{ background: link.color }} />
            <span className="error-page__link-card-label" style={{ fontSize: isMobile ? 13 : 14 }}>
              {link.label}
            </span>
            <span className="error-page__link-card-sub">{link.sub}</span>
          </a>
        ))}
      </div>
    </>
  )
}
