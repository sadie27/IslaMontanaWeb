"use client"

import { useEffect, useRef } from "react"
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock"
import { imgPath } from "@/lib/image-path"
import type { GalleryImage } from "@/types/gallery"

interface GalleryLightboxProps {
  items: GalleryImage[]
  index: number | null
  onClose: () => void
  onNav: (direction: 1 | -1) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const SWIPE_THRESHOLD = 50

export default function GalleryLightbox({ items, index, onClose, onNav, triggerRef }: GalleryLightboxProps) {
  const isOpen = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useBodyOverflowLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    closeRef.current?.focus()
    const trigger = triggerRef.current

    return () => {
      trigger?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe correr al abrir/cerrar, no en cada cambio de index
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowRight') {
        onNav(1)
        return
      }
      if (e.key === 'ArrowLeft') {
        onNav(-1)
        return
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose, onNav])

  // Precarga de la imagen anterior y siguiente
  useEffect(() => {
    if (!isOpen || index === null || items.length === 0) return
    const nextItem = items[(index + 1) % items.length]
    const prevItem = items[(index - 1 + items.length) % items.length]
    for (const item of [nextItem, prevItem]) {
      const img = new window.Image()
      img.src = imgPath(item.src)
    }
  }, [isOpen, index, items])

  if (index === null) return null

  const item = items[index]

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    onNav(dx < 0 ? 1 : -1)
  }

  return (
    <div
      ref={dialogRef}
      className={["gallery-lightbox", isOpen ? "gallery-lightbox--open" : ""].join(" ")}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        className="gallery-lightbox__close"
        onClick={onClose}
        aria-label="Cerrar galería ampliada"
      >
        ✕
      </button>
      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); onNav(-1) }}
        aria-label="Foto anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="gallery-lightbox__nav gallery-lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); onNav(1) }}
        aria-label="Foto siguiente"
      >
        ›
      </button>
      <figure className="gallery-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- resolución completa sin optimizador; el loader custom del proyecto no aporta aquí */}
        <img src={imgPath(item.src)} alt={item.alt} className="gallery-lightbox__img" />
        <figcaption className="gallery-lightbox__caption">{item.tag}</figcaption>
      </figure>
    </div>
  )
}
