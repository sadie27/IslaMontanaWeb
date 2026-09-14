import AboutHero from '@/components/about/AboutHero'
import AboutHistory from '@/components/about/AboutHistory'
import AboutTeam from '@/components/about/AboutTeam'
import AboutValues from '@/components/about/AboutValues'
import FinalCta from '@/components/home/FinalCta'

// Keyword primaria: "agencia de viajes Ecuador" (marca / equipo)
const title = 'Nuestro Equipo — Agencia de Viajes en Ecuador | Islamontana'
const description =
  'Irene, Luis y Kleber: el equipo de tres personas que diseña y opera cada viaje de Islamontana Travel, con 40 años de experiencia como guías naturalistas en Galápagos.'

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
