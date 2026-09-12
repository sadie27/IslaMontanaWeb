import type { Tour } from '@/components/home/TourCard'
import { HOME_TOURS } from '@/data/home-tours'

export type ExperienceCategory = 'dia' | 'cruceros' | 'tierra' | 'personalizado'

export interface Experience extends Tour {
  category: ExperienceCategory
}

export const EXPERIENCE_CATEGORIES: { value: ExperienceCategory; label: string }[] = [
  { value: 'dia', label: 'Tours de día' },
  { value: 'cruceros', label: 'Cruceros' },
  { value: 'tierra', label: 'Tierra firme' },
  { value: 'personalizado', label: 'A medida' },
]

export const EXPERIENCES: Experience[] = [
  ...HOME_TOURS.map((tour): Experience => ({
    ...tour,
    category: tour.region === 'Galápagos' ? 'cruceros' : 'tierra',
  })),
  {
    id: 'islas-flotantes-dia',
    name: 'Galápagos de un Día',
    duration: '1 día',
    difficulty: 'Fácil',
    price: 'desde $180',
    badge: 'Ideal en familia',
    accent: '#1a7a8a',
    region: 'Galápagos',
    category: 'dia',
    highlights: [
      'Salida y regreso el mismo día',
      'Snorkel guiado en bahía protegida',
      'Almuerzo incluido a bordo',
    ],
  },
  {
    id: 'quito-colonial-dia',
    name: 'Quito Colonial en un Día',
    duration: '1 día',
    difficulty: 'Fácil',
    price: 'desde $65',
    badge: 'Patrimonio UNESCO',
    accent: '#4a6fa5',
    region: 'Andes',
    category: 'dia',
    highlights: [
      'Centro Histórico y La Ronda',
      'Teleférico con vista a la ciudad',
      'Guía especializado en historia local',
    ],
  },
  {
    id: 'cotopaxi-personalizado',
    name: 'Cotopaxi a tu Ritmo',
    duration: '2–5 días (flexible)',
    difficulty: 'Moderado',
    price: 'desde $420',
    badge: 'A medida',
    accent: '#2d6a1e',
    region: 'Andes',
    category: 'personalizado',
    highlights: [
      'Itinerario adaptado a tu nivel',
      'Guía de montaña certificado',
      'Alojamiento a elección: hacienda o refugio',
    ],
  },
]
