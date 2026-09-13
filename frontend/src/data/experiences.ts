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

const TOUR_CATEGORY: Record<string, ExperienceCategory> = {
  c3: 'cruceros',
  t3: 'tierra',
  at3: 'tierra',
  act4: 'tierra',
  and2: 'dia',
  ant4: 'tierra',
  ant5: 'tierra',
}

/**
 * Slug del destino padre de cada tour, para el enlace de vuelta desde
 * /experiences/[id] hacia /destinations/[slug] (cross-link bidireccional).
 * Derivado de `tours` en src/data/destinations.ts — si se añade un tour
 * nuevo allí, añadir aquí su slug de destino correspondiente.
 */
export const TOUR_DESTINATION_SLUG: Record<string, string> = {
  c3: 'galapagos',
  t3: 'galapagos',
  at3: 'amazonia',
  act4: 'andes-cultura',
  and2: 'andes-naturaleza',
  ant4: 'andes-naturaleza',
  ant5: 'andes-naturaleza',
}

export const EXPERIENCES: Experience[] = HOME_TOURS.map((tour): Experience => ({
  ...tour,
  category: TOUR_CATEGORY[tour.id] ?? 'tierra',
}))
