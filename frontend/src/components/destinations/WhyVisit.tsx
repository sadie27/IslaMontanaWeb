'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
  bp: 'mobile' | 'tablet' | 'desktop'
}

export default function WhyVisit({ destination, bp }: Props) {
  const { name, accentColor, whyVisit, photos } = destination
  const isMobile  = bp === 'mobile'
  const isTablet  = bp === 'tablet'
  const isDesktop = bp === 'desktop'

  const px = isMobile ? '24px' : isTablet ? '40px' : '56px'
  const sectionPadding = isMobile ? `64px ${px}` : isTablet ? `80px ${px}` : `100px ${px}`

  const [hovered, setHovered] = useState(false)

  return (
    <section id="why" style={{ background: '#f4f8f2', padding: sectionPadding }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 48 : isTablet ? 48 : 80,
        alignItems: isMobile ? 'stretch' : 'flex-start',
      }}>

        {/* Photo album */}
        {isMobile ? (
          <div style={{ width: '100%', position: 'relative', paddingBottom: '52%', height: 0, marginBottom: 16 }}>
            {photos.slice(0, 3).map((src, i) => {
              const lefts    = ['2%', '25%', '48%']
              const rots     = [-7, 2, 6]
              const zIndexes = [1, 3, 2]
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: lefts[i],
                    width: '52%',
                    transform: `rotate(${rots[i]}deg)`,
                    zIndex: zIndexes[i],
                    boxShadow: '0 6px 20px rgba(0,0,0,0.14)',
                  }}
                >
                  <div className="polaroid-card polaroid-card--no-pseudo">
                    <div className="polaroid-image">
                      <Image src={src} alt="" fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Tablet + Desktop: polaroid stack with hover animation */
          <div
            className={hovered ? 'polaroid-stack-hovered' : ''}
            style={{
              flex: isTablet ? '0 0 42%' : '0 0 44%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {photos.slice(0, 3).map((src, i) => {
              const rotations      = [-8, 4, -5]
              const stackZIndex    = [1, 3, 2][i]
              const stackTranslateY = [0, -60, -120][i]
              const hoverTranslateY = [0, 20, 40][i]

              return (
                <div
                  key={i}
                  style={{
                    width: '78%',
                    flexShrink: 0,
                    transform: hovered
                      ? `translateY(${hoverTranslateY}px) rotate(0deg)`
                      : `translateY(${stackTranslateY}px) rotate(${rotations[i]}deg)`,
                    boxShadow: hovered
                      ? '0 20px 60px rgba(0,0,0,0.18)'
                      : '0 8px 32px rgba(0,0,0,0.12)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                    willChange: 'transform',
                    zIndex: hovered ? 3 - i : stackZIndex,
                  }}
                >
                  <div className="polaroid-card">
                    <div className="polaroid-image">
                      <Image src={src} alt="" fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Text */}
        <div style={{
          flex: 1,
          minWidth: 0,
          position: isMobile ? 'static' : 'sticky',
          top: isMobile ? 'auto' : 88,
          alignSelf: isMobile ? 'auto' : 'flex-start',
        }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: accentColor, fontWeight: 700, display: 'block', marginBottom: 10,
          }}>
            Por qué {name}
          </span>
          <h2 style={{
            fontSize: isMobile ? 30 : isTablet ? 38 : 48,
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95,
            marginBottom: 36, color: 'var(--color-dark, #0d200c)',
          }}>
            Razones que<br />no se olvidan.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {whyVisit.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 3,
                  alignSelf: 'stretch',
                  background: accentColor,
                  borderRadius: 2,
                  flexShrink: 0,
                  minHeight: 44,
                }} />
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: isMobile ? 15 : isTablet ? 15 : 16,
                    color: 'var(--color-dark, #0d200c)',
                    marginBottom: 5,
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(13,32,12,0.68)', lineHeight: 1.65, fontWeight: 300 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
