// Tipos que deben coincidir con los Pydantic schemas del backend FastAPI

export type Difficulty = 'Fácil' | 'Moderado' | 'Exigente'

export interface TourResponse {
  id: string
  name: string
  duration: string
  difficulty: Difficulty
  highlights: string[]
  price: string
  badge?: string | null
}

export interface StatResponse {
  label: string
  value: string
}

export interface DestinationResponse {
  slug: string
  name: string
  tagline: string
  description: string
  hero_image: string
  image_exists: boolean
  accent_color: string
  placeholder_bg: string
  stats: StatResponse[]
  why_visit: string[]
  best_time: string
  tours: TourResponse[]
}

export interface NavSubItemResponse {
  label: string
  description: string
  href: string
  image: string
}

export interface NavItemResponse {
  label: string
  href: string
  sub_items: NavSubItemResponse[]
}
