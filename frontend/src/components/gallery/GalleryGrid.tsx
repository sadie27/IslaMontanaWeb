"use client"

import GalleryItem from "./GalleryItem"
import type { GalleryImage } from "@/types/gallery"

interface GalleryGridProps {
  items: GalleryImage[]
  onOpen: (items: GalleryImage[], index: number) => void
  onReset: () => void
}

export default function GalleryGrid({ items, onOpen, onReset }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="gallery-grid">
        <div className="gallery-grid__empty">
          <p>No hay fotos en esta categoría todavía.</p>
          <button type="button" className="gallery-grid__empty-reset" onClick={onReset}>
            Ver todas las fotos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-grid">
      <div className="gallery-grid__inner">
        {items.map((item, i) => (
          <GalleryItem
            key={item.id}
            item={item}
            index={i}
            priority={i < 4}
            onOpen={() => onOpen(items, i)}
          />
        ))}
      </div>
    </div>
  )
}
