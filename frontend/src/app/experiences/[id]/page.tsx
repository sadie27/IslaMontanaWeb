import { notFound } from 'next/navigation'
import { EXPERIENCES, TOUR_DESTINATION_SLUG } from '@/data/experiences'
import { getDestinationBySlug } from '@/data/destinations'
import { SITE_URL } from '@/config/site'
import ExperienceHero from '@/components/experiences/detail/ExperienceHero'
import ExperienceOverview from '@/components/experiences/detail/ExperienceOverview'
import ExperienceItinerary from '@/components/experiences/detail/ExperienceItinerary'
import ExperienceIncludes from '@/components/experiences/detail/ExperienceIncludes'
import ExperienceCta from '@/components/experiences/detail/ExperienceCta'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({ id: exp.id }))
}

export function generateMetadata({ params }: Props) {
  const tour = EXPERIENCES.find((exp) => exp.id === params.id)
  if (!tour) {
    return {
      title: 'Experiencia no encontrada — Islamontana Travel',
      robots: { index: false },
    }
  }

  const title = `${tour.name} — Islamontana Travel`
  const description = tour.overview ?? tour.highlights.join(' · ')
  const url = `/experiences/${tour.id}`
  const image = tour.gallery?.[0] ?? tour.image

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export default function ExperienceDetailPage({ params }: Props) {
  const tour = EXPERIENCES.find((exp) => exp.id === params.id)

  if (!tour) return notFound()

  const destinationSlug = TOUR_DESTINATION_SLUG[tour.id]
  const destination = destinationSlug ? getDestinationBySlug(destinationSlug) : undefined

  const breadcrumbItems = [
    { name: 'Inicio', url: SITE_URL },
    { name: 'Experiencias', url: `${SITE_URL}/experiences` },
    ...(destination
      ? [{ name: destination.name, url: `${SITE_URL}/destinations/${destination.slug}` }]
      : []),
    { name: tour.name, url: `${SITE_URL}/experiences/${tour.id}` },
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ExperienceHero tour={tour} heroImage={tour.gallery?.[0]} destination={destination} />
      <ExperienceOverview tour={tour} />
      <ExperienceItinerary tour={tour} />
      <ExperienceIncludes tour={tour} />
      <ExperienceCta tour={tour} />
    </>
  )
}
