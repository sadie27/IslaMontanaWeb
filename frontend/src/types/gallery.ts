export type GalleryCategory = 'destinos' | 'experiencias'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  sub: string
  tag: string
  big?: boolean
  width: number
  height: number
  accent?: string
}

export interface GallerySubfilter {
  slug: string
  label: string
}
