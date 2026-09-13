import type { MetadataRoute } from 'next'
import { DESTINATIONS } from '@/data/destinations'
import { EXPERIENCES } from '@/data/experiences'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/experiences',
    '/gallery',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map((d) => ({
    url: `${SITE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
  }))

  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCES.map((e) => ({
    url: `${SITE_URL}/experiences/${e.id}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...destinationRoutes, ...experienceRoutes]
}
