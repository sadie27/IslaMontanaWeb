import { notFound } from 'next/navigation'
import { EXPERIENCES } from '@/data/experiences'
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
  if (!tour) return { title: 'Experiencia no encontrada — Islamontana Travel' }
  return {
    title: `${tour.name} — Islamontana Travel`,
    description: tour.overview ?? tour.highlights.join(' · '),
  }
}

export default function ExperienceDetailPage({ params }: Props) {
  const tour = EXPERIENCES.find((exp) => exp.id === params.id)

  if (!tour) return notFound()

  return (
    <>
      <ExperienceHero tour={tour} heroImage={tour.gallery?.[0]} />
      <ExperienceOverview tour={tour} />
      <ExperienceItinerary tour={tour} />
      <ExperienceIncludes tour={tour} />
      <ExperienceCta tour={tour} />
    </>
  )
}
