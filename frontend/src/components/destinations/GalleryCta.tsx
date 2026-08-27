'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Destination } from '@/lib/types'
import { ROUTES } from '@/config/routes'
import { GALLERY_IMAGES } from '@/data/gallery'
import { useLightbox } from '@/hooks/useLightbox'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import type { GalleryImage } from '@/types/gallery'

interface Props {
  destination: Destination
  isMobile: boolean
}

export default function GalleryCta({ destination, isMobile }: Props) {
  const { slug, name, accentColor, photos, heroImage } = destination
  const px = isMobile ? '24px' : '56px'
  const allPhotos = [...photos, heroImage].slice(0, 4)
  const galleryHref = ROUTES.GALLERY_FILTERED('destinos', slug)
  const totalPhotos = GALLERY_IMAGES.length

  const { lightboxItems, lightboxIndex, triggerRef, openLightbox, closeLightbox, navLightbox } = useLightbox()
  const [ctaHovered, setCtaHovered] = useState(false)

  const lightboxSlides: GalleryImage[] = allPhotos.map((src, i) => ({
    id: `${slug}-cta-${i}`,
    src,
    alt: `${name} — foto ${i + 1}`,
    category: 'destinos',
    sub: slug,
    tag: name,
    width: 1200,
    height: 800,
  }))

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
            Más de {totalPhotos} fotografías de nuestros tours, fauna, paisajes y experiencias.
          </p>
          <Link
            href={galleryHref}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', borderRadius: 8,
              border: `1px solid ${ctaHovered ? accentColor : `${accentColor}55`}`,
              background: ctaHovered ? `${accentColor}18` : 'transparent',
              color: accentColor, fontWeight: 600, fontSize: 14,
              width: 'fit-content', transition: 'all 0.2s',
              transform: ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            Galería completa
            <svg
              width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              style={{ transition: 'transform 0.2s', transform: ctaHovered ? 'translateX(3px)' : 'translateX(0)' }}
            >
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
          {allPhotos.map((src, i) => {
            const isLast = i === 3

            if (isLast) {
              return (
                <Link
                  key={i}
                  href={galleryHref}
                  style={{ position: 'relative', overflow: 'hidden', background: '#1a3018', display: 'block' }}
                  className="group"
                  aria-label="Ver todas las fotos de la galería"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    style={{
                      objectFit: 'cover',
                      opacity: 0.5,
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
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 15, letterSpacing: '0.02em' }}>
                      +{totalPhotos} fotos →
                    </span>
                  </div>
                </Link>
              )
            }

            return (
              <button
                key={i}
                type="button"
                style={{
                  position: 'relative', overflow: 'hidden', background: '#1a3018', display: 'block',
                  width: '100%', height: '100%', padding: 0, border: 'none', textAlign: 'left',
                }}
                className="group"
                onClick={() => openLightbox(lightboxSlides, i)}
                aria-label={`Ampliar foto ${i + 1} de ${name}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    opacity: 0.75,
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
                />
              </button>
            )
          })}
        </div>

      </div>

      <GalleryLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNav={navLightbox}
        triggerRef={triggerRef}
      />
    </section>
  )
}
