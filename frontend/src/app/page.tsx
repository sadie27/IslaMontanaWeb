import HomeHero from '@/components/home/HomeHero'
import Stats from '@/components/home/Stats'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'
import FinalCta from '@/components/home/FinalCta'

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
