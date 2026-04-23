import Image from 'next/image'
import Link from 'next/link'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
  isMobile: boolean
}

export default function GalleryCta({ destination, isMobile }: Props) {
  const { name, accentColor, photos, heroImage } = destination
  const px = isMobile ? '24px' : '56px'
  const allPhotos = [...photos, heroImage].slice(0, 4)

  return (
    <section style={{ background: '#071a06', overflow: 'hidden' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        minHeight: isMobile ? 'auto' : 320,
      }}>

        {/* Text */}
        <div style={{
          flex: '0 0 46%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: isMobile ? `56px ${px}` : `72px ${px}`,
          gap: 16,
        }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: accentColor, fontWeight: 700, display: 'block', marginBottom: 4,
          }}>
            Galería
          </span>
          <h2 style={{
            fontSize: isMobile ? 26 : 38,
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: 'white', margin: 0,
          }}>
            Ver {name}<br />en imágenes.
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: 0, maxWidth: '36ch' }}>
            Más de 80 fotografías de nuestros tours, fauna, paisajes y experiencias.
          </p>
          <Link
            href="/gallery"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', borderRadius: 8,
              border: `1px solid ${accentColor}55`,
              color: accentColor, fontWeight: 600, fontSize: 14,
              width: 'fit-content', transition: 'all 0.2s',
            }}
          >
            Galería completa
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Photo grid */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: isMobile ? '120px 120px' : '1fr 1fr',
          gap: 2,
          minHeight: isMobile ? 240 : 'auto',
        }}>
          {allPhotos.map((src, i) => (
            <Link
              key={i}
              href="/gallery"
              style={{ position: 'relative', overflow: 'hidden', background: '#1a3018', display: 'block' }}
              className="group"
            >
              <Image
                src={src}
                alt=""
                fill
                unoptimized
                style={{
                  objectFit: 'cover',
                  opacity: i === 3 ? 0.5 : 0.75,
                  transition: 'transform 0.4s ease, opacity 0.3s ease',
                }}
                className="group-hover:scale-105 group-hover:opacity-90"
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(7,26,6,0)',
                  transition: 'background 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                className="group-hover:!bg-[rgba(7,26,6,0.35)]"
              >
                {i === 3 && (
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 15, letterSpacing: '0.02em' }}>
                    +80 fotos →
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
