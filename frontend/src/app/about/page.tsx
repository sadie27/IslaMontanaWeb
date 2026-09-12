import AboutHero from '@/components/about/AboutHero'
import AboutHistory from '@/components/about/AboutHistory'
import AboutTeam from '@/components/about/AboutTeam'
import AboutValues from '@/components/about/AboutValues'
import FinalCta from '@/components/home/FinalCta'

export const metadata = {
  title: 'Nosotros — Islamontana Travel',
  description:
    'Conoce al equipo detrás de Islamontana Travel: guías locales y viajeros apasionados por la naturaleza de Ecuador.',
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
