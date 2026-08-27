import Link from "next/link"
import { FOOTER_NAV_LINKS } from "@/data/footer"

export default function FooterNav() {
  return (
    <nav className="footer__nav" aria-label="Enlaces del pie">
      <p className="footer__nav-eyebrow">Navegación</p>
      <ul>
        {FOOTER_NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer__link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
