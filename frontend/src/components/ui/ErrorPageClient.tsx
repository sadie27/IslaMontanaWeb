'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ASSETS } from '@/config/assets'
import ErrorHeader from './ErrorHeader'
import ErrorCTAs from './ErrorCTAs'

const LINKS = [
  { label: 'Islas Galápagos', sub: 'Fauna & Snorkel',      href: '/destinations/galapagos',       color: '#1a7a8a' },
  { label: 'Amazonía',        sub: 'Selva & Biodiversidad', href: '/destinations/amazonia',        color: '#2d6a1e' },
  { label: 'Andes Cultural',  sub: 'Pueblos & Tradición',   href: '/destinations/andes-cultura',   color: '#8B4513' },
  { label: 'Andes & Volcanes',sub: 'Trekking & Cumbres',    href: '/destinations/andes-naturaleza', color: '#4a6fa5' },
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
      <div className="error-page__overlay" />
      <div
        className="error-page__illustration"
        style={{ right: isMobile ? '-20%' : '-4%', width: isMobile ? '70%' : '42%' }}
      >
        <BgIllustration />
      </div>
      <div
        className="error-page__content"
        style={{
          padding: isMobile ? `100px ${px} 64px` : `120px ${px} 80px`,
          maxWidth: isMobile ? 'none' : 1280,
        }}
      >
        <ErrorHeader type={type} isMobile={isMobile} />
        <ErrorCTAs type={type} isMobile={isMobile} reset={reset} />
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
                <a
                  key={link.href}
                  href={link.href}
                  style={{ padding: isMobile ? '12px 14px' : '14px 16px' }}
                  className="error-page__link-card"
                >
                  <span className="error-page__link-card-bar" style={{ background: link.color }} />
                  <span className="error-page__link-card-label" style={{ fontSize: isMobile ? 13 : 14 }}>
                    {link.label}
                  </span>
                  <span className="error-page__link-card-sub">{link.sub}</span>
                </a>
              ))}
            </div>
          </>
        )}
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
