import { Suspense } from 'react'
import GalleryHero from '@/components/gallery/GalleryHero'
import GalleryView from './GalleryView'

export const metadata = {
  title: 'Galería — Islamontana Travel',
  description:
    'Fauna, paisajes y experiencias capturadas en cada rincón del país más biodiverso del planeta.',
}

function GalleryFiltersSkeleton() {
  return <div className="gallery-filters" style={{ minHeight: 90 }} />
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <Suspense fallback={<GalleryFiltersSkeleton />}>
        <GalleryView />
      </Suspense>
    </>
  )
}
