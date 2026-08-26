"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { GALLERY_CATEGORIES, GALLERY_SUBFILTERS } from "@/data/gallery"
import type { GalleryCategory } from "@/types/gallery"

interface GalleryFiltersProps {
  category: GalleryCategory
  sub: string
  resultCount: number
}

export default function GalleryFilters({ category, sub, resultCount }: GalleryFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateFilters(next: { category?: GalleryCategory; sub?: string }) {
    const params = new URLSearchParams(searchParams.toString())
    if (next.category) params.set('category', next.category)
    if (next.sub) params.set('sub', next.sub)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleCategoryChange(nextCategory: GalleryCategory) {
    updateFilters({ category: nextCategory, sub: 'todos' })
  }

  function handleSubChange(nextSub: string) {
    updateFilters({ sub: nextSub })
  }

  return (
    <div className="gallery-filters">
      <div className="gallery-filters__inner">
        <div className="gallery-filters__tabs" role="tablist" aria-label="Categoría de galería">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={category === c.slug}
              className={[
                "gallery-filters__btn",
                "gallery-filters__btn--tab",
                category === c.slug ? "gallery-filters__btn--active" : "",
              ].join(" ")}
              onClick={() => handleCategoryChange(c.slug)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="gallery-filters__subs">
          {GALLERY_SUBFILTERS[category].map((s) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={sub === s.slug}
              className={[
                "gallery-filters__btn",
                sub === s.slug ? "gallery-filters__btn--active" : "",
              ].join(" ")}
              onClick={() => handleSubChange(s.slug)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p className="gallery-filters__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'foto' : 'fotos'}
        </p>
      </div>
    </div>
  )
}
