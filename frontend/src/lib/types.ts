export type SubItem = {
  label: string
  description: string
  href: string
  image: string
}

export type NavItem = {
  label: string
  href: string
  subItems: SubItem[]
}

// ─── Destination Types ───────────────────────────────────────────────────────

export interface StatItem {
  label: string
  value: string
}

export interface WhyVisitItem {
  title: string
  desc: string
}

export interface TourItem {
  id: string
  name: string
  duration: string
  difficulty: 'Fácil' | 'Moderado' | 'Exigente'
  highlights: string[]
  price: string
  badge?: string | null
}

export interface ToursByCategory {
  dia: TourItem[]
  cruceros: TourItem[]
  tierra: TourItem[]
  personalizado: TourItem[]
}

export interface FaqItem {
  q: string
  a: string
}

// ─── About Page Types ────────────────────────────────────────────────────────

export interface TeamMember {
  name: string
  role: string
  photo?: string
  placeholderBg: string
  bio: string
}

export interface CompanyValue {
  icon: 'compass' | 'leaf' | 'users' | 'shield'
  title: string
  desc: string
}

// ─── Testimonial Types ──────────────────────────────────────────

export interface Testimonial {
  /** Cita literal del cliente. */
  quote: string
  /** Nombre del cliente (o nombre + inicial). */
  name: string
  /** Ciudad y país de origen — aporta credibilidad. */
  origin: string
  /** Viaje realizado, ej. 'Galápagos, 8 días'. */
  trip: string
  /** Fecha aproximada del viaje, ej. 'marzo 2025'. Opcional. */
  date?: string
}

// ─── Footer Types ────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'facebook' | 'whatsapp'
}

export interface Destination {
  slug: string
  name: string
  tagline: string
  description: string
  heroImage: string
  accentColor: string
  placeholderBg: string
  mapRegion: 'galapagos' | 'amazonia' | 'andes'
  stats: StatItem[]
  whyVisit: WhyVisitItem[]
  bestTime: string
  photos: string[]
  tours: ToursByCategory
  faq: FaqItem[]
}
