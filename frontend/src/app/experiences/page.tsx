import ExperiencesHero from '@/components/experiences/ExperiencesHero'
import ExperiencesView from '@/components/experiences/ExperiencesView'

// Keyword primaria: "tours y cruceros Ecuador"
const title = 'Tours y Cruceros en Ecuador — Islamontana Travel'
const description =
  'Tours de día, cruceros, expediciones en tierra firme y rutas a medida por Galápagos, Amazonía y los Andes de Ecuador. Encuentra tu próxima aventura.'

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
