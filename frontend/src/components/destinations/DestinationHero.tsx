'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
  bp: 'mobile' | 'tablet' | 'desktop'
}

export default function DestinationHero({ destination, bp }: Props) {
  const { name, tagline, stats, accentColor, heroImage, placeholderBg } = destination
  const [imgError, setImgError] = useState(false)

  const isMobile  = bp === 'mobile'
  const isTablet  = bp === 'tablet'
  const isDesktop = bp === 'desktop'

  const px = isMobile ? '24px' : isTablet ? '40px' : '56px'

  return (
    <section style={{
      minHeight: isMobile ? '100svh' : '100vh',
      background: 'var(--color-dark, #0d200c)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background image */}
      {!imgError ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={heroImage}
            alt={name}
            fill
            priority
            unoptimized
            style={{ objectFit: 'cover', opacity: 0.5 }}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: placeholderBg }} />
      )}

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(13,32,12,0.5) 0%, rgba(13,32,12,0.85) 100%)'
            : isTablet
              ? 'linear-gradient(to bottom, rgba(13,32,12,0.45) 0%, rgba(13,32,12,0.82) 100%)'
              : 'linear-gradient(to right, rgba(13,32,12,0.97) 0%, rgba(13,32,12,0.8) 50%, rgba(13,32,12,0.1) 100%)',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: isMobile
          ? `90px ${px} 32px`
          : isTablet
            ? `100px ${px} 52px`
            : `120px ${px} 72px`,
      }}>
        {/* Badge */}
        <span
          className="fade-up fade-up-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}45`,
            color: accentColor,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            borderRadius: 100,
            padding: '5px 16px',
            width: 'fit-content',
            marginBottom: isMobile ? 20 : 24,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
          DESTINO · ECUADOR
        </span>

        {/* H1 */}
        <h1
          className="fade-up fade-up-2"
          style={{
            fontSize: isMobile
              ? 'clamp(36px, 9vw, 50px)'
              : isTablet
                ? 'clamp(44px, 7vw, 64px)'
                : 'clamp(52px, 5vw, 80px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 0.93,
            letterSpacing: '-0.03em',
            marginBottom: isMobile ? 16 : 22,
          }}
        >
          {name}
        </h1>

        {/* Tagline */}
        <p
          className="fade-up fade-up-3"
          style={{
            fontSize: isMobile
              ? 'clamp(14px, 4vw, 16px)'
              : isTablet
                ? 'clamp(15px, 2vw, 18px)'
                : 'clamp(16px, 1.4vw, 20px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '40ch',
            lineHeight: 1.5,
            marginBottom: isMobile ? 28 : 40,
          }}
        >
          {tagline}
        </p>

        {/* Stats */}
        <div
          className="fade-up fade-up-4"
          style={{ display: 'flex', gap: isMobile ? 18 : isTablet ? 24 : 32, marginBottom: isMobile ? 32 : 44, flexWrap: 'wrap' }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontSize: isMobile
                  ? 'clamp(20px, 6vw, 22px)'
                  : isTablet
                    ? 'clamp(22px, 4vw, 28px)'
                    : 'clamp(24px, 2.4vw, 32px)',
                fontWeight: 900,
                color: accentColor,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.58)', fontWeight: 500, marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="fade-up fade-up-5" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href="#tours"
            className="cta-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile
                ? 'clamp(11px, 3vw, 13px) clamp(20px, 5vw, 24px)'
                : isTablet
                  ? '12px 26px'
                  : 'clamp(13px, 1.1vw, 15px) clamp(24px, 2.2vw, 30px)',
              borderRadius: 10,
              background: accentColor,
              color: 'white',
              fontWeight: 700,
              fontSize: 'clamp(13px, 1vw, 14px)',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
          >
            Ver tours disponibles
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#why"
            className="cta-ghost"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile
                ? 'clamp(11px, 3vw, 13px) clamp(18px, 5vw, 22px)'
                : isTablet
                  ? '12px 24px'
                  : 'clamp(13px, 1.1vw, 15px) clamp(22px, 2vw, 28px)',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 500,
              fontSize: 'clamp(13px, 1vw, 14px)',
              textDecoration: 'none',
            }}
          >
            Por qué visitar
          </a>
        </div>
      </div>

      {/* Scroll hint — tablet + desktop */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute', bottom: 36, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.22)', fontSize: 9, letterSpacing: '0.22em',
          }}
          aria-hidden="true"
        >
          SCROLL
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)' }} />
        </div>
      )}
    </section>
  )
}
