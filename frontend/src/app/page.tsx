/* ── app/page.tsx ──────────────────────────────────────────
   Página de inicio. Hero + Stats + Destinations + WhyUs + Tours + Gallery + FinalCta.
   Navbar y Footer los inyecta automáticamente app/layout.tsx
──────────────────────────────────────────────────────────── */

'use client'

import Image from "next/image"
import { useHeroImages } from "@/hooks/useHeroImages"
import Stats from '@/components/home/Stats'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'
import FinalCta from '@/components/home/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Destinations />
      <WhyUs />
      <Tours />
      <Gallery />
      <FinalCta />
    </>
  )
}

function Hero() {
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
          <a href="/destinations" className="btn btn--primary">Ver destinos →</a>
          <a href="/tours" className="btn btn--ghost">Nuestros tours</a>
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

