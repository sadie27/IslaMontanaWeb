import Link from 'next/link'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
  isMobile: boolean
}

export default function FinalCta({ destination, isMobile }: Props) {
  const { name } = destination
  const px = isMobile ? '24px' : '56px'
  const displayName = name.split(' ')[0] === 'Islas' ? 'Galápagos' : name.split(' ')[0]

  return (
    <section style={{
      background: 'var(--color-dark, #0d200c)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: isMobile ? `56px ${px}` : `80px ${px}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <div>
          <h2 style={{
            fontSize: isMobile ? 26 : 36,
            fontWeight: 900, letterSpacing: '-0.03em', color: 'white', lineHeight: 1, marginBottom: 8,
          }}>
            ¿Listo para {displayName}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, fontWeight: 300, maxWidth: '44ch', lineHeight: 1.65 }}>
            Cupos limitados por regulación del Parque Nacional. Planifica con anticipación.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 8,
              background: '#3aa023', color: 'white', fontWeight: 700, fontSize: 14,
              textDecoration: 'none',
              minHeight: 44,
            }}
          >
            Planifica tu viaje
          </Link>
          <Link
            href="/destinations"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.45)', fontWeight: 500, fontSize: 14,
              textDecoration: 'none',
              minHeight: 44,
            }}
          >
            ← Todos los destinos
          </Link>
        </div>
      </div>
    </section>
  )
}
