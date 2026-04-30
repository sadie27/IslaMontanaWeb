export const ROUTES = {
  HOME: '/',
  DESTINATIONS: '/destinations',
  DESTINATION: (slug: string) => `/destinations/${slug}`,
  EXPERIENCES: '/experiences',
  EXPERIENCE: (slug: string) => `/experiences/${slug}`,
  GALLERY: '/gallery',
  GALLERY_CATEGORY: (category: string) => `/gallery?category=${category}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  TOURS: '/tours',
  TOUR: (id: string) => `/tours/${id}`,
  TOUR_CONTACT: (id: string) => `/contact?tour=${id}`,
} as const
