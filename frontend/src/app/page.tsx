import dynamic from 'next/dynamic'
import HomeHero from '@/components/home/HomeHero'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'
import FinalCta from '@/components/home/FinalCta'

const Stats = dynamic(
  () => import('@/components/home/Stats'),
  { loading: () => <div className="stats" />, ssr: false }
)

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Destinations />
      <WhyUs />
      <Tours />
      <Gallery />
      <FinalCta />
    </>
  )
}
