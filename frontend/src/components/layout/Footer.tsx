import Link from "next/link"
import Image from "next/image"

const FOOTER_COLS = [
  {
    title: "Destinos",
    links: [
      { label: "Galápagos",        href: "/destinations/galapagos" },
      { label: "Amazonía",         href: "/destinations/amazonia" },
      { label: "Andes Cultural",   href: "/destinations/andes-cultura" },
      { label: "Andes & Volcanes", href: "/destinations/andes-naturaleza" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros",  href: "/about" },
      { label: "Tours",     href: "/experiences" },
      { label: "Galería",   href: "/gallery" },
      { label: "Contacto",  href: "/contact" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Top grid ── */}
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Image
                src="/images/logos/logo-simple.webp"
                alt="Islamontana Travel"
                width={150}
                height={42}
                className="footer__logo-img"
              />
            </div>
            <p className="footer__tagline">
              Agencia especializada en turismo de naturaleza en Ecuador.
              Tours a Galápagos, Amazonía y más desde 2015.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="footer__col">
              <p className="footer__col-title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <span>© 2025 Islamontana Travel — Todos los derechos reservados</span>
          <div className="footer__locales">
            <span>Ecuador</span>
            <span>United States</span>
            <span>ES · EN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

