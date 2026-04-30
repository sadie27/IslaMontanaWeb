'use client'

import Image from "next/image"
import { useHeroImages } from "@/hooks/useHeroImages"
import { ROUTES } from "@/config/routes"

export default function HomeHero() {
  const { images, currentIndex } = useHeroImages()

  return (
    <header className="hero">
      {/* Stack de imágenes de fondo con transición cross-fade */}
      <div className="hero__bg-image">
        {images.length === 0 ? (
          // Fallback si no hay imágenes en el manifiesto
          <div className="hero__bg-gradient" />
        ) : (
          // Renderizar todas las imágenes apiladas, solo la actual visible
          images.map((imageSrc, idx) => (
            <Image
              key={imageSrc}
              src={imageSrc}
              alt={`Paisaje Ecuador – ${imageSrc.split('/').pop()?.replace('.webp', '') || 'Hero'}`}
              fill
              priority={idx === 0}
              quality={90}
              sizes="100vw"
              className="hero__image"
              style={{
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
          Ecuador<br />
          <span className="hero__title-accent">te espera.</span>
        </h1>

        <p className="hero__subtitle">
          Tours únicos a los rincones más extraordinarios del planeta.
          Experiencias que transforman para siempre.
        </p>

        <div className="hero__ctas">
          <a href={ROUTES.DESTINATIONS} className="btn btn--primary">Ver destinos →</a>
          <a href={ROUTES.TOURS} className="btn btn--ghost">Nuestros tours</a>
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
