'use client'

import { useEffect, useState } from 'react'
import DestinationMapAnimation from './DestinationMapAnimation'
import DestinationMapAnimationMobile from './DestinationMapAnimationMobile'

export default function DestinationMapAnimationWrapper() {
  // "isSmall" cubre mobile (< 768px) Y tablet (768–1023px).
  // En tablet, las cards absolutas del mapa desktop (45 vw) compiten con
  // el SVG dejando poco espacio visual; la versión mobile/swipe es más usable.
  const [isSmall, setIsSmall] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsSmall(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Evitar flash durante hidratación
  if (isSmall === null) return null

  return isSmall
    ? <DestinationMapAnimationMobile />
    : <DestinationMapAnimation />
}
