import AboutHero from '@/components/about/AboutHero'
import AboutHistory from '@/components/about/AboutHistory'
import AboutTeam from '@/components/about/AboutTeam'
import AboutValues from '@/components/about/AboutValues'
import FinalCta from '@/components/home/FinalCta'

// Keyword primaria: "agencia de viajes Ecuador" (marca / equipo)
const title = 'Nuestro Equipo — Agencia de Viajes en Ecuador | Islamontana'
const description =
  'Conoce al equipo de Islamontana Travel: guías locales y viajeros apasionados por la naturaleza de Ecuador, expertos en Galápagos, Amazonía y los Andes.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: '/about' },
  twitter: { title, description },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutHistory />
      <AboutTeam />
      <AboutValues />
      <FinalCta />
    </>
  )
}
