'use client'

import { useState } from 'react'
import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
  isMobile: boolean
}

export default function FAQ({ destination, isMobile }: Props) {
  const { accentColor, faq } = destination
  const [open, setOpen] = useState<number | null>(null)
  const px = isMobile ? '24px' : '56px'

  return (
    <section style={{ background: '#f4f8f2', padding: isMobile ? `64px ${px}` : `96px ${px}` }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <span style={{
          display: 'block', fontSize: 11, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: accentColor, fontWeight: 700, marginBottom: 10,
        }}>
          Preguntas frecuentes
        </span>
        <h2 style={{
          fontSize: isMobile ? 26 : 38,
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95,
          marginBottom: 40, color: 'var(--color-dark, #0d200c)',
        }}>
          Lo que más<br />nos preguntan.
        </h2>

        <div>
          {faq.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderTop: i === 0 ? '1px solid rgba(13,32,12,0.1)' : 'none',
                borderBottom: '1px solid rgba(13,32,12,0.1)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'transparent', border: 'none', textAlign: 'left', gap: 14, cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: isMobile ? 15 : 17, color: 'var(--color-dark, #0d200c)', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span
                  className="faq-icon"
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1.5px solid rgba(13,32,12,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.22s ease, border-color 0.2s',
                    color: accentColor, fontSize: 20, fontWeight: 300, lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p style={{ fontSize: 15, color: 'rgba(13,32,12,0.72)', lineHeight: 1.78, paddingBottom: 22, fontWeight: 300 }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
