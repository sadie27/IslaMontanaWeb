"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import GalleryFilters from "@/components/gallery/GalleryFilters"
import GalleryGrid from "@/components/gallery/GalleryGrid"
import GalleryLightbox from "@/components/gallery/GalleryLightbox"
import { useLightbox } from "@/hooks/useLightbox"
import { GALLERY_IMAGES, GALLERY_CATEGORIES, GALLERY_SUBFILTERS } from "@/data/gallery"
import type { GalleryCategory } from "@/types/gallery"

const PAGE_SIZE = 10

// Enlaces legacy del MegaMenu (categorías antiguas de /gallery?category=...)
// → estado inicial equivalente en la nueva taxonomía destinos/experiencias.
const LEGACY_CATEGORY_MAP: Record<string, { category: GalleryCategory; sub: string }> = {
  'fauna-wildlife': { category: 'destinos', sub: 'todos' },
  'paisajes': { category: 'destinos', sub: 'todos' },
  'cultura': { category: 'destinos', sub: 'andes-cultura' },
  'aventura': { category: 'experiencias', sub: 'todos' },
}

const VALID_CATEGORIES = GALLERY_CATEGORIES.map((c) => c.slug)

function resolveFilters(rawCategory: string | null, rawSub: string | null): { category: GalleryCategory; sub: string } {
  if (rawCategory && rawCategory in LEGACY_CATEGORY_MAP) {
    return LEGACY_CATEGORY_MAP[rawCategory]
  }

  const category = VALID_CATEGORIES.includes(rawCategory as GalleryCategory)
    ? (rawCategory as GalleryCategory)
    : 'destinos'

  const validSubs = GALLERY_SUBFILTERS[category].map((s) => s.slug)
  const sub = rawSub && validSubs.includes(rawSub) ? rawSub : 'todos'

  return { category, sub }
}

export default function GalleryView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { category, sub } = resolveFilters(
    searchParams.get('category'),
    searchParams.get('sub')
  )

  const { lightboxItems, lightboxIndex, triggerRef, openLightbox, closeLightbox, navLightbox } = useLightbox()

  const filteredItems = useMemo(() => {
    return GALLERY_IMAGES.filter(
      (img) => img.category === category && (sub === 'todos' || img.sub === sub)
    )
  }, [category, sub])

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Cada vez que cambian los filtros, la paginación vuelve a empezar desde la primera página.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [category, sub])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  function loadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  function resetFilters() {
    router.replace(`${pathname}?category=destinos&sub=todos`, { scroll: false })
  }

  return (
    <>
      <GalleryFilters category={category} sub={sub} resultCount={filteredItems.length} />
      <GalleryGrid
        items={visibleItems}
        allItems={filteredItems}
        onOpen={openLightbox}
        onReset={resetFilters}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
      <GalleryLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNav={navLightbox}
        triggerRef={triggerRef}
      />
    </>
  )
}
