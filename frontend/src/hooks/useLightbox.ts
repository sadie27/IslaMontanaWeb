"use client"

import { useRef, useState } from "react"
import type { GalleryImage } from "@/types/gallery"

interface UseLightboxReturn {
  lightboxItems: GalleryImage[]
  lightboxIndex: number | null
  triggerRef: React.RefObject<HTMLElement | null>
  openLightbox: (items: GalleryImage[], index: number) => void
  closeLightbox: () => void
  navLightbox: (direction: 1 | -1) => void
}

export function useLightbox(): UseLightboxReturn {
  const [lightboxItems, setLightboxItems] = useState<GalleryImage[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  function openLightbox(items: GalleryImage[], index: number) {
    triggerRef.current = document.activeElement as HTMLElement
    setLightboxItems(items)
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function navLightbox(direction: 1 | -1) {
    setLightboxIndex((prev) => {
      if (prev === null || lightboxItems.length === 0) return prev
      return (prev + direction + lightboxItems.length) % lightboxItems.length
    })
  }

  return { lightboxItems, lightboxIndex, triggerRef, openLightbox, closeLightbox, navLightbox }
}
