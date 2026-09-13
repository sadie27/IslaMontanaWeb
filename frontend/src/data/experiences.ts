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

export const EXPERIENCES: Experience[] = HOME_TOURS.map((tour): Experience => ({
  ...tour,
  category: TOUR_CATEGORY[tour.id] ?? 'tierra',
}))
