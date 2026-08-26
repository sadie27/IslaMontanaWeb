import { ASSETS } from '@/config/assets'
import type { GalleryCategory, GalleryImage, GallerySubfilter } from '@/types/gallery'

export const GALLERY_CATEGORIES: { slug: GalleryCategory; label: string }[] = [
  { slug: 'destinos', label: 'Destinos' },
  { slug: 'experiencias', label: 'Experiencias' },
]

export const GALLERY_SUBFILTERS: Record<GalleryCategory, GallerySubfilter[]> = {
  destinos: [
    { slug: 'todos', label: 'Todos' },
    { slug: 'galapagos', label: 'Galápagos' },
    { slug: 'amazonia', label: 'Amazonía' },
    { slug: 'andes-cultura', label: 'Andes Cultural' },
    { slug: 'andes-naturaleza', label: 'Andes Naturaleza' },
  ],
  experiencias: [
    { slug: 'todos', label: 'Todos' },
    { slug: 'cruceros', label: 'Cruceros' },
    { slug: 'day-tours', label: 'Day Tours' },
    // TODO: alinear con el submenú de Experiencias (Cruceros / Circuitos / Day Tours / Birdwatching).
    // "City Tours" viene del prototipo Gallery_Page.html y no existe en ese submenú.
    { slug: 'city-tours', label: 'City Tours' },
  ],
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'galapagos-portada',
    src: ASSETS.GALLERY.GALAPAGOS_PORTADA,
    alt: 'Costa rocosa de Galápagos con aguas turquesas',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    big: true,
    width: 3872,
    height: 2592,
  },
  {
    id: 'galapagos-lobos-castillos',
    src: ASSETS.GALLERY.GALAPAGOS_CASTILLOS,
    alt: 'Lobos marinos descansando junto a formaciones rocosas en Española',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    width: 3872,
    height: 2592,
  },
  {
    id: 'galapagos-sea-lions-sandcastles',
    src: ASSETS.GALLERY.GALAPAGOS_SEA_LIONS,
    alt: 'Niños jugando junto a lobos marinos en una playa de Galápagos',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    width: 3872,
    height: 2592,
  },
  {
    id: 'galapagos-tortuga-marina',
    src: ASSETS.GALLERY.GALAPAGOS_TORTUGA,
    alt: 'Buceadora nadando junto a una tortuga marina en Galápagos',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    width: 3872,
    height: 2592,
  },
  {
    id: 'galapagos-flycatcher',
    src: ASSETS.GALLERY.GALAPAGOS_FLYCATCHER,
    alt: 'Papamoscas de Galápagos posado sobre una rama',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    width: 3872,
    height: 2592,
  },
  {
    id: 'galapagos-dsc-0436',
    src: ASSETS.GALLERY.GALAPAGOS_DSC_0436,
    alt: 'Paisaje volcánico de las Islas Galápagos',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-viaje-22',
    src: ASSETS.GALLERY.AMAZONIA_VIAJE_22,
    alt: 'Selva amazónica ecuatoriana vista desde un mirador elevado',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    big: true,
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-buho-crestado',
    src: ASSETS.GALLERY.AMAZONIA_BUHO,
    alt: 'Búho crestado en la selva amazónica',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-nutria-gigante',
    src: ASSETS.GALLERY.AMAZONIA_NUTRIA,
    alt: 'Nutria gigante nadando en un canal de la Amazonía',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-pasarela',
    src: ASSETS.GALLERY.AMAZONIA_PASARELA,
    alt: 'Pasarela elevada entre la vegetación de Sacha Lodge',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-canal',
    src: ASSETS.GALLERY.AMAZONIA_CANAL,
    alt: 'Canal de aguas oscuras rodeado de selva primaria',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    width: 3872,
    height: 2592,
  },
  {
    id: 'amazonia-viaje-15',
    src: ASSETS.GALLERY.AMAZONIA_VIAJE_15,
    alt: 'Atardecer sobre el dosel de la selva amazónica',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    width: 3872,
    height: 2592,
  },
  // TODO: faltan fotos reales para "Andes Cultural" y "Andes Naturaleza" — ver informe final.
]

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return GALLERY_IMAGES
}
