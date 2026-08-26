"use client"

import { useEffect, useRef, useState } from "react"
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
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return
      setOpen(false)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

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
    setOpen(false)
  }

  const activeCategoryLabel = GALLERY_CATEGORIES.find((c) => c.slug === category)?.label ?? ''
  const activeSubLabel = GALLERY_SUBFILTERS[category].find((s) => s.slug === sub)?.label ?? ''

  return (
    <div className="gallery-filters">
      <div className="gallery-filters__inner">
        <button
          ref={toggleRef}
          type="button"
          className="gallery-filters__toggle"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Filtrar
          <span className="gallery-filters__toggle-value">
            {activeCategoryLabel}
            {sub !== 'todos' ? ` · ${activeSubLabel}` : ''}
          </span>
        </button>

        <p className="gallery-filters__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'foto' : 'fotos'}
        </p>

        {open && (
          <div ref={panelRef} className="gallery-filters__panel" role="dialog" aria-label="Filtrar galería">
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
          </div>
        )}
      </div>
    </div>
  )
}
