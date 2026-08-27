import Link from "next/link"
import { FOOTER_CTA } from "@/data/footer"

export default function FooterCta() {
  return (
    <div className="footer__cta">
      <p className="footer__cta-title">{FOOTER_CTA.title}</p>
      <p className="footer__cta-subtitle">{FOOTER_CTA.subtitle}</p>
      <Link href={FOOTER_CTA.href} className="footer__cta-btn">
        {FOOTER_CTA.buttonLabel}
      </Link>
    </div>
  )
}
