/* ─── Gallery.tsx — Server Component ───────────────────────── */

import Image from 'next/image'
import { ROUTES } from '@/config/routes'
import { ASSETS } from '@/config/assets'

const GALLERY_IMGS = [
  {
    src: ASSETS.GALLERY.GALAPAGOS_PORTADA,
    alt: 'Islas Galápagos',
    tall: true,
    href: ROUTES.GALLERY_FILTERED('destinos', 'galapagos'),
  },
  {
    src: ASSETS.GALLERY.AMAZONIA_VIAJE_22,
    alt: 'Amazonía Ecuatoriana',
    tall: false,
    href: ROUTES.GALLERY_FILTERED('destinos', 'amazonia'),
  },
  {
    src: ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    alt: 'Andes y Volcanes',
    tall: false,
    href: ROUTES.GALLERY_FILTERED('destinos', 'andes-naturaleza'),
  },
  {
    src: ASSETS.GALLERY.GALAPAGOS_TORTUGA,
    alt: 'Buceo con tortugas marinas en Galápagos',
    tall: false,
    href: ROUTES.GALLERY_FILTERED('destinos', 'galapagos'),
  },
  {
    src: ASSETS.GALLERY.AMAZONIA_BUHO,
    alt: 'Fauna de la selva amazónica',
    tall: false,
    href: ROUTES.GALLERY,
  },
]

export default function Gallery() {
  return (
    <section className="gallery">
      <div className="gallery__inner">
        {/* ── Header ── */}
        <div className="gallery__header">
          <p className="gallery__label">Galería</p>
          <h2 className="gallery__title">Ecuador en imágenes.</h2>
        </div>

        {/* ── Grid ── */}
        <div className="gallery__grid" role="list" aria-label="Galería de destinos">

          {GALLERY_IMGS.map((img, idx) => {
            const isTall    = img.tall
            const isLast    = idx === GALLERY_IMGS.length - 1
            const isMobileHidden = isLast // 5ª imagen oculta en mobile

            return (
              <div
                key={img.src}
                className={[
                  'gallery__item',
                  isTall  ? 'gallery__item--tall'         : '',
                  isMobileHidden ? 'gallery__item--last'  : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="listitem"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    isTall
                      ? '(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 40vw'
                      : '(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 20vw'
                  }
                  className="gallery__img"
                />

                {/* Overlay en la última imagen (desktop) */}
                {isLast && (
                  <a
                    href={img.href}
                    className="gallery__img-overlay"
                    aria-label="Ver todas las fotos de la galería"
                  >
                    <span className="gallery__overlay-text">+80 fotos →</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
