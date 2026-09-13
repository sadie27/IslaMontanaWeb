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
      <Link href={ROUTES.HOME} className="btn btn--primary">
        Ir al inicio
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <Link href={ROUTES.DESTINATIONS} className="btn btn--ghost">
        Ver destinos
      </Link>
      {!is404 && reset && (
        <button onClick={reset} className="btn btn--ghost">
          ↻ Reintentar
        </button>
      )}
    </div>
  )
}
