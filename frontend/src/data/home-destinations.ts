import type { DestinationItem } from '@/components/home/DestCard'
import { ASSETS } from '@/config/assets'

export const HOME_DESTINATIONS: DestinationItem[] = [
  {
    slug: 'galapagos',
    name: 'Islas Galápagos',
    label: 'Fauna & Snorkel',
    src: ASSETS.MEGA_MENU.GALAPAGOS,
    accent: '#1a7a8a',
    desc: 'Nada con tortugas y leones marinos que no te tienen miedo. Nuestro destino de siempre: te ayudamos a elegir entre crucero o base en tierra.',
  },
  {
    slug: 'amazonia',
    name: 'Amazonía Ecuatoriana',
    label: 'Selva & Biodiversidad',
    src: ASSETS.MEGA_MENU.AMAZONIA,
    accent: '#2d6a1e',
    desc: 'Loros en la collpa al amanecer y monos a la altura de los ojos desde el dosel. A 30 minutos de vuelo desde Quito.',
  },
  {
    slug: 'andes-naturaleza',
    name: 'Andes & Volcanes',
    label: 'Trekking & Cumbres',
    src: ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    accent: '#4a6fa5',
    desc: 'Ocho volcanes activos y páramos por encima de las nubes. Se puede subir al Cotopaxi sin ser alpinista.',
  },
  {
    slug: 'andes-cultura',
    name: 'Andes Cultural',
    label: 'Pueblos & Tradición',
    src: ASSETS.MEGA_MENU.COSTA,
    accent: '#8B4513',
    desc: 'El mercado de Otavalo, haciendas del siglo XVII y comunidades donde se sigue tejiendo a mano.',
  },
]
