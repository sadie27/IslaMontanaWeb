import { notFound } from 'next/navigation'
import { getDestinationBySlug, DESTINATIONS } from '@/data/destinations'
import DestinationPageClient from '@/components/destinations/DestinationPageClient'
import { SITE_URL } from '@/config/site'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props) {
  const dest = getDestinationBySlug(params.slug)
  if (!dest) return { title: 'Destino no encontrado', robots: { index: false } }

  // Keyword primaria por destino: "tours <destino> Ecuador" — la variante
  // transaccional, distinta de la keyword de visión general en /destinations.
  const title = `Tours a ${dest.name} — Islamontana Travel`
  const url = `/destinations/${dest.slug}`

  return {
    title,
    description: dest.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: dest.description,
      url,
      images: [{ url: dest.heroImage, width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: dest.description,
      images: [dest.heroImage],
    },
  }
}

export default function DestinationPage({ params }: Props) {
  const destination = getDestinationBySlug(params.slug)
  if (!destination) notFound()

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: destination.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  // TouristDestination: usa los datos ya existentes (whyVisit, stats,
  // bestTime, photos) — sin inventar rating/reviews mientras no haya
  // testimonios reales en data/testimonials.ts.
  const touristDestinationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    url: `${SITE_URL}/destinations/${destination.slug}`,
    image: destination.photos.map((photo) => `${SITE_URL}${photo}`),
    touristType: destination.whyVisit.map((item) => item.title),
    includesAttraction: destination.whyVisit.map((item) => ({
      '@type': 'TouristAttraction',
      name: item.title,
      description: item.desc,
    })),
    additionalProperty: [
      ...destination.stats.map((stat) => ({
        '@type': 'PropertyValue',
        name: stat.label,
        value: stat.value,
      })),
      {
        '@type': 'PropertyValue',
        name: 'Mejor época para visitar',
        value: destination.bestTime,
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Destinos', item: `${SITE_URL}/destinations` },
      { '@type': 'ListItem', position: 3, name: destination.name, item: `${SITE_URL}/destinations/${destination.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DestinationPageClient destination={destination} />
    </>
  )
}
