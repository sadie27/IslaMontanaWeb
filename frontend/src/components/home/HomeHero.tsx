'use client'

import Link from "next/link"
import { useHeroImages } from "@/hooks/useHeroImages"
import { ROUTES } from "@/config/routes"
import { imgPath } from "@/lib/image-path"

// Antepone basePath (vía imgPath, el mismo helper que usan FooterBackground
// y GalleryLightbox) a cada URL de un srcset "w" — ej. "/images/foo-400w.webp 400w, ...".
// Necesario porque estas imágenes se sirven con <img> nativo, sin pasar por
// next/image ni por el loader personalizado que normalmente añade basePath.
function imgPathInSrcSet(srcset: string): string {
  return srcset
    .split(', ')
    .map((entry) => {
      const [url, descriptor] = entry.split(' ')
      return `${imgPath(url)} ${descriptor}`
    })
    .join(', ')
}

export default function HomeHero() {
  const { images, currentIndex } = useHeroImages()

  return (
    <header className="hero">
      {/* Stack de imágenes de fondo con transición cross-fade.
          Se usa <img> nativo (no next/image) para poder servir el srcset
          real generado en build por sharp: el loader personalizado de
          next/image no redimensiona (el sitio es export estático), así que
          next/image no puede aprovechar esas variantes por sí solo. */}
      <div className="hero__bg-image">
        {images.length === 0 ? (
          // Fallback si no hay imágenes en el manifiesto
          <div className="hero__bg-gradient" />
        ) : (
          // Renderizar todas las imágenes apiladas, solo la actual visible.
          // <img> nativo (no next/image): el loader 'custom' de este export
          // estático no redimensiona, así que next/image no puede servir el
          // srcset real generado por sharp — <img> sí puede.
          images.map((image, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.src}
              src={imgPath(image.src)}
              srcSet={imgPathInSrcSet(image.srcset)}
              sizes="100vw"
              alt={image.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              className="hero__image"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: "cover",
                objectPosition: "center",
                opacity: idx === currentIndex ? 1 : 0,
              }}
            />
          ))
        )}

        {/* Overlay oscuro sobre las imágenes */}
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        {/* Pill badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span>GALÁPAGOS · AMAZONÍA · ANDES</span>
        </div>

        {/* Headline — left-aligned (anti-center bias) */}
        <h1 className="hero__title">
          Galápagos<br />
          <span className="hero__title-accent">te espera.</span>
        </h1>

        <p className="hero__subtitle">
          Somos una agencia pequeña con más de 20 años y un guía que lleva 40
          en las islas. No vendemos paquetes cerrados: nos cuentas qué te
          gustaría ver y armamos el viaje contigo. Si quieres sumarle selva o
          volcanes, también.
        </p>

        <div className="hero__ctas">
          <Link href={ROUTES.CONTACT} className="btn btn--primary">Diseña tu viaje a Galápagos →</Link>
          <Link href={ROUTES.DESTINATIONS} className="btn btn--ghost">Ver destinos</Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span>SCROLL</span>
        <div className="hero__scroll-line" />
      </div>
    </header>
  )
}
