'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'
import { ASSETS } from '@/config/assets'

const LINKS = [
  { label: 'Islas Galápagos', sub: 'Fauna & Snorkel',      href: ROUTES.DESTINATION('galapagos'),       color: '#1a7a8a' },
  { label: 'Amazonía',        sub: 'Selva & Biodiversidad', href: ROUTES.DESTINATION('amazonia'),        color: '#2d6a1e' },
  { label: 'Andes Cultural',  sub: 'Pueblos & Tradición',   href: ROUTES.DESTINATION('andes-cultura'),   color: '#8B4513' },
  { label: 'Andes & Volcanes',sub: 'Trekking & Cumbres',    href: ROUTES.DESTINATION('andes-naturaleza'), color: '#4a6fa5' },
]

function BgIllustration() {
  return (
    <svg viewBox="0 0 400 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.045 }}>
      <path d="M155,20 L240,18 L265,45 L268,90 L255,130 L270,175 L265,220 L245,265 L220,295 L195,308 L175,295 L155,265 L130,230 L118,190 L110,150 L108,105 L115,65 L130,35 Z" fill="white" />
      <path d="M155,70 L195,68 L200,105 L195,140 L155,142 L148,105 Z" fill="#abd430" opacity="0.9" />
      <circle cx="80"  cy="105" r="8"  fill="white" />
      <circle cx="96"  cy="98"  r="11" fill="white" />
      <circle cx="110" cy="110" r="7"  fill="white" />
      <circle cx="83"  cy="120" r="5"  fill="white" />
      <line x1="113" y1="108" x2="147" y2="105" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  )
}

interface Props {
  type: '404' | '500'
  reset?: () => void
}

export default function ErrorPageClient({ type, reset }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isMobile === null) return null

  const px = isMobile ? '28px' : '64px'
  const is404 = type === '404'

  return (
    <div className="error-page">

      {/* BG image */}
      <div className="error-page__bg-image">
        <Image
          src={ASSETS.MEGA_MENU.GALAPAGOS}
          alt=""
          fill
          unoptimized
          priority
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.18 }}
        />
      </div>

      {/* Dark overlay */}
      <div className="error-page__overlay" />

      {/* BG map illustration */}
      <div
        className="error-page__illustration"
        style={{
          right: isMobile ? '-20%' : '-4%',
          width: isMobile ? '70%' : '42%',
        }}
      >
        <BgIllustration />
      </div>

      {/* Content */}
      <div
        className="error-page__content"
        style={{
          padding: isMobile ? `100px ${px} 64px` : `120px ${px} 80px`,
          maxWidth: isMobile ? 'none' : 1280,
        }}
      >

        {/* Error badge */}
        <div className="error-page__badge fade-up fade-up-1">
          <span className="error-page__badge-pill">
            <span className="error-page__badge-dot" />
            ERROR {type}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="error-page__headline fade-up fade-up-2"
          style={{ fontSize: isMobile ? 'clamp(44px, 12vw, 68px)' : 'clamp(64px, 6vw, 96px)' }}
        >
          {is404
            ? <><span>Esta ruta</span><br /><span style={{ color: '#abd430' }}>no existe.</span></>
            : <><span>Algo salió</span><br /><span style={{ color: '#abd430' }}>mal.</span></>
          }
        </h1>

        {/* Subtitle */}
        <p
          className="error-page__subtitle fade-up fade-up-3"
          style={{
            fontSize: isMobile ? 15 : 18,
            marginBottom: isMobile ? 36 : 48,
          }}
        >
          {is404
            ? 'La página que buscas no existe o ha sido movida. Pero Ecuador sigue ahí, esperándote.'
            : 'Algo falló en nuestro servidor. Estamos trabajando para resolverlo. Intenta de nuevo en unos minutos.'}
        </p>

        {/* CTAs */}
        <div
          className="error-page__ctas fade-up fade-up-4"
          style={{ marginBottom: isMobile ? 48 : 64 }}
        >
          <Link
            href={ROUTES.HOME}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '13px 24px' : '15px 32px',
              borderRadius: 10,
              background: '#3aa023', color: 'white',
              fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
              transition: 'all 0.2s ease', textDecoration: 'none',
            }}
            className="btn-primary"
          >
            Ir al inicio
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href={ROUTES.DESTINATIONS}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '13px 22px' : '15px 28px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: 14,
              transition: 'all 0.2s ease', textDecoration: 'none',
            }}
            className="btn-ghost"
          >
            Ver destinos
          </Link>
          {!is404 && reset && (
            <button
              onClick={reset}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: isMobile ? '13px 22px' : '15px 28px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: 14,
                transition: 'all 0.2s ease', cursor: 'pointer',
              }}
              className="btn-ghost"
            >
              ↻ Reintentar
            </button>
          )}
        </div>

        {/* Quick links — solo en 404 */}
        {is404 && (
          <>
            <div className="fade-up fade-up-5">
              <p className="error-page__quick-label">Quizás buscabas</p>
            </div>
            <div
              className="error-page__quick-grid fade-up fade-up-5"
              style={{
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                gap: isMobile ? 8 : 10,
                maxWidth: isMobile ? '100%' : 680,
              }}
            >
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ padding: isMobile ? '12px 14px' : '14px 16px' }}
                  className="error-page__link-card"
                >
                  <span className="error-page__link-card-bar" style={{ background: link.color }} />
                  <span
                    className="error-page__link-card-label"
                    style={{ fontSize: isMobile ? 13 : 14 }}
                  >
                    {link.label}
                  </span>
                  <span className="error-page__link-card-sub">{link.sub}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Decoration — desktop only */}
        {!isMobile && (
          <div className="error-page__decoration">
            ISLAMONTANA
            <div className="error-page__decoration-line" />
          </div>
        )}
      </div>
    </div>
  )
}
