'use client'

import Link from 'next/link'
import { ROUTES } from '@/config/routes'

interface ErrorCTAsProps {
  type: '404' | '500'
  isMobile: boolean
  reset?: () => void
}

export default function ErrorCTAs({ type, isMobile, reset }: ErrorCTAsProps) {
  const is404 = type === '404'

  return (
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
  )
}
