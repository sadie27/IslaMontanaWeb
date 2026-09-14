import ExperiencesHero from '@/components/experiences/ExperiencesHero'
import ExperiencesView from '@/components/experiences/ExperiencesView'

// Keyword primaria: "tours y cruceros Ecuador"
const title = 'Tours y Cruceros en Ecuador — Islamontana Travel'
const description =
  'Cruceros y viajes en tierra por Galápagos, expediciones en la Amazonía y rutas andinas. Ejemplos reales de viajes que adaptamos contigo: días, ruta y ritmo.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/experiences' },
  openGraph: { title, description, url: '/experiences' },
  twitter: { title, description },
}

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesView />
    </>
  )
}
