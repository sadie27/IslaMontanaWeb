'use client'

import Link from "next/link"
import { useHeroImages } from "@/hooks/useHeroImages"
import { ROUTES } from "@/config/routes"

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
              src={image.src}
              srcSet={image.srcset}
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
          Nuestro destino insignia, y la puerta a los rincones más extraordinarios
          de Ecuador. Experiencias que transforman para siempre.
        </p>

        <div className="hero__ctas">
          <Link href={ROUTES.DESTINATIONS} className="btn btn--primary">Ver destinos →</Link>
          <Link href={ROUTES.EXPERIENCES} className="btn btn--ghost">Diseña tu viaje</Link>
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
