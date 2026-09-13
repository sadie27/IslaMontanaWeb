import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HomeHero from '@/components/home/HomeHero'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'

const Stats = dynamic(
  () => import('@/components/home/Stats'),
  { loading: () => <div className="stats" />, ssr: false }
)

// Keyword primaria de esta URL: "agencia de viajes / turismo de naturaleza Ecuador"
// (marca + categoría). Deliberadamente NO se usa "Galápagos" como keyword
// dominante aquí para evitar canibalización con /destinations/galapagos,
// que sí compite por "tours Galápagos" / "cruceros Galápagos".
const title = 'Agencia de Viajes y Turismo de Naturaleza en Ecuador'
const description =
  'Agencia de viajes especializada en turismo de naturaleza en Ecuador. Tours y cruceros a Galápagos, expediciones en la Amazonía y rutas por los Andes.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${title} — Islamontana Travel`,
    description,
    url: '/',
  },
  twitter: {
    title: `${title} — Islamontana Travel`,
    description,
  },
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Destinations />
      <WhyUs />
      <Tours />
      <Gallery />
    </>
  )
}
