import FooterBackground from "./footer/FooterBackground"
import FooterNav from "./footer/FooterNav"
import FooterCta from "./footer/FooterCta"
import FooterSocial from "./footer/FooterSocial"
import FooterLocales from "./footer/FooterLocales"
import FooterWordmark from "./footer/FooterWordmark"

export default function Footer() {
  return (
    <footer className="footer">
      <FooterBackground />

      <div className="footer__content">
        <div className="footer__inner">
          <div className="footer__row">
            <FooterNav />
            <FooterCta />
            <FooterSocial />
          </div>

          <FooterLocales />
        </div>

        <FooterWordmark />
      </div>
    </footer>
  )
}
