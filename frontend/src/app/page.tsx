import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HomeHero from '@/components/home/HomeHero'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import PlanGalapagos from '@/components/home/PlanGalapagos'

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
  'Diseñamos tu viaje a Galápagos y Ecuador uno a uno, con trato directo y más de 20 años como agencia. Cuéntanos tus fechas y te proponemos itinerario sin compromiso.'

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
      {/* Testimonios: se auto-oculta mientras data/testimonials.ts esté vacío. */}
      <Testimonials />
      <Tours />
      {/* Resuelve las dudas previas al contacto (crucero vs isla, días, época, precio). */}
      <PlanGalapagos />
      <Gallery />
    </>
  )
}
