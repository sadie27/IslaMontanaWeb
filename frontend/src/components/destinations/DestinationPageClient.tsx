'use client'

import '@/styles/destinations.css'
import { useEffect, useState } from 'react'
import type { Destination } from '@/lib/types'
import DestinationHero from './DestinationHero'
import WhyVisit        from './WhyVisit'
import Tours           from './Tours'
import GalleryCta      from './GalleryCta'
import FAQ             from './FAQ'
import FinalCta        from './FinalCta'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

function getBreakpoint(): Breakpoint {
  if (window.matchMedia('(max-width: 767px)').matches) return 'mobile'
  if (window.matchMedia('(max-width: 1023px)').matches) return 'tablet'
  return 'desktop'
}

interface Props { destination: Destination }

export default function DestinationPageClient({ destination }: Props) {
  const [bp, setBp] = useState<Breakpoint | null>(null)

  useEffect(() => {
    setBp(getBreakpoint())
    const handler = () => setBp(getBreakpoint())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (bp === null) return null

  const isMobile = bp === 'mobile'

  return (
    <>
      <DestinationHero destination={destination} bp={bp} />
      <WhyVisit        destination={destination} bp={bp} />
      <Tours           destination={destination} bp={bp} />
      <GalleryCta      destination={destination} isMobile={isMobile} />
      <FAQ             destination={destination} isMobile={isMobile} />
      <FinalCta        destination={destination} isMobile={isMobile} />
    </>
  )
}
