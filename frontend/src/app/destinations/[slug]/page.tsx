import { notFound } from 'next/navigation'
import { getDestinationBySlug, DESTINATIONS } from '@/data/destinations'
import DestinationPageClient from '@/components/destinations/DestinationPageClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props) {
  const dest = getDestinationBySlug(params.slug)
  if (!dest) return { title: 'Destino no encontrado' }
  return {
    title: `${dest.name} — Islamontana Travel`,
    description: dest.description,
  }
}

export default function DestinationPage({ params }: Props) {
  const destination = getDestinationBySlug(params.slug)
  if (!destination) notFound()

  return <DestinationPageClient destination={destination} />
}
