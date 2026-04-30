import type { DestinationItem } from '@/components/home/DestCard'
import { ASSETS } from '@/config/assets'

export const HOME_DESTINATIONS: DestinationItem[] = [
  {
    slug: 'galapagos',
    name: 'Islas Galápagos',
    label: 'Fauna & Snorkel',
    src: ASSETS.MEGA_MENU.GALAPAGOS,
    accent: '#1a7a8a',
    desc: 'Nada junto a leones marinos en aguas cristalinas. Un archipiélago único donde la evolución ocurrió a su propio ritmo.',
  },
  {
    slug: 'amazonia',
    name: 'Amazonía Ecuatoriana',
    label: 'Selva & Biodiversidad',
    src: ASSETS.MEGA_MENU.AMAZONIA,
    accent: '#2d6a1e',
    desc: '600 especies de aves y una biodiversidad sin igual. La selva más rica del planeta te espera.',
  },
  {
    slug: 'andes-naturaleza',
    name: 'Andes & Volcanes',
    label: 'Trekking & Cumbres',
    src: ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    accent: '#4a6fa5',
    desc: 'Ocho volcanes activos y paisajes de altitud que cortan el aliento. La columna vertebral de Ecuador.',
  },
  {
    slug: 'andes-cultura',
    name: 'Andes Cultural',
    label: 'Pueblos & Tradición',
    src: ASSETS.MEGA_MENU.COSTA,
    accent: '#8B4513',
    desc: 'Mercados indígenas, textiles artesanales y comunidades que guardan siglos de historia viva.',
  },
]
