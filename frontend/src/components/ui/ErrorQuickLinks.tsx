interface QuickLink {
  label: string
  sub: string
  href: string
  color: string
}

interface ErrorQuickLinksProps {
  links: QuickLink[]
  isMobile: boolean
}

export default function ErrorQuickLinks({ links, isMobile }: ErrorQuickLinksProps) {
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
