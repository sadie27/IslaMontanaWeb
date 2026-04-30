const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const ROUTES = {
  HOME: `${base}/`,
  DESTINATIONS: `${base}/destinations`,
  DESTINATION: (slug: string) => `${base}/destinations/${slug}`,
  EXPERIENCES: `${base}/experiences`,
  EXPERIENCE: (slug: string) => `${base}/experiences/${slug}`,
  GALLERY: `${base}/gallery`,
  GALLERY_CATEGORY: (category: string) => `${base}/gallery?category=${category}`,
  ABOUT: `${base}/about`,
  CONTACT: `${base}/contact`,
  TOURS: `${base}/tours`,
  TOUR: (id: string) => `${base}/tours/${id}`,
  TOUR_CONTACT: (id: string) => `${base}/contact?tour=${id}`,
}
