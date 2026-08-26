"use client"

import { useState } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/types/gallery"

interface GalleryItemProps {
  item: GalleryImage
  index: number
  priority: boolean
  onOpen: () => void
}

export default function GalleryItem({ item, index, priority, onOpen }: GalleryItemProps) {
  const [failed, setFailed] = useState(false)

  return (
    <button
      type="button"
      className={[
        "gallery-item",
        item.big ? "gallery-item--big" : "",
      ].join(" ")}
      style={{ '--d': `${(index % 8) * 40}ms` } as React.CSSProperties}
      onClick={onOpen}
      aria-label={`Ampliar foto: ${item.alt}`}
    >
      {!failed && (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="gallery-item__img"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div
          className="gallery-item__placeholder"
          style={{ backgroundColor: item.accent ?? 'var(--color-dark-mid)' }}
        >
          {item.tag}
        </div>
      )}
      <div className="gallery-item__overlay">
        <span className="gallery-item__caption">{item.tag}</span>
      </div>
    </button>
  )
}
