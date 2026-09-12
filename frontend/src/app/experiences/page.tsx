import ExperiencesHero from '@/components/experiences/ExperiencesHero'
import ExperiencesView from '@/components/experiences/ExperiencesView'

export const metadata = {
  title: 'Experiencias — Islamontana Travel',
  description:
    'Tours de día, cruceros, expediciones en tierra firme y rutas a medida por Galápagos, Amazonía y los Andes de Ecuador.',
}

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesView />
    </>
  )
}
