import { ASSETS } from "@/config/assets"
import { imgPath } from "@/lib/image-path"

export default function FooterBackground() {
  return (
    <div className="footer__bg" aria-hidden="true">
      <picture>
        <source media="(min-width: 1024px)" srcSet={imgPath(ASSETS.FOOTER.BG_16X9)} />
        <source media="(min-width: 640px)" srcSet={imgPath(ASSETS.FOOTER.BG_1X1)} />
        <img src={imgPath(ASSETS.FOOTER.BG_4X5)} alt="" loading="lazy" decoding="async" />
      </picture>
      <div className="footer__gradient" />
    </div>
  )
}
