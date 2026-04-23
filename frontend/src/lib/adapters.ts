import type { DestinationResponse, NavItemResponse } from '@/types/api'
import type { Destination } from '@/lib/types'
import type { NavItem } from '@/lib/types'

export function adaptDestination(d: DestinationResponse): Partial<Destination> & {
  imageExists?: boolean
  whyVisit: Destination['whyVisit']
  tours: Destination['tours']
} {
  return {
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    heroImage: d.hero_image,
    imageExists: d.image_exists,
    accentColor: d.accent_color,
    placeholderBg: d.placeholder_bg,
    mapRegion: 'galapagos',
    stats: d.stats,
    whyVisit: d.why_visit.map((title) => ({ title, desc: '' })),
    bestTime: d.best_time,
    photos: [],
    tours: {
      dia: d.tours.map((t) => ({
        id: t.id,
        name: t.name,
        duration: t.duration,
        difficulty: t.difficulty,
        highlights: t.highlights,
        price: t.price,
        badge: t.badge ?? undefined,
      })),
      cruceros: [],
      tierra: [],
      personalizado: [],
    },
    faq: [],
  }
}

export function adaptNavItem(n: NavItemResponse): NavItem {
  return {
    label: n.label,
    href: n.href,
    subItems: n.sub_items.map(s => ({
      label: s.label,
      description: s.description,
      href: s.href,
      image: s.image,
    })),
  }
}
