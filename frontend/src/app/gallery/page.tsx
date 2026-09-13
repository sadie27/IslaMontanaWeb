import { Suspense } from 'react'
import GalleryHero from '@/components/gallery/GalleryHero'
import GalleryView from './GalleryView'

// Keyword primaria: "fotos fauna y paisajes Ecuador"
const title = 'Galería de Fotos: Fauna y Paisajes de Ecuador — Islamontana'
const description =
  'Fauna, paisajes y experiencias capturadas en Galápagos, la Amazonía y los Andes: el país más biodiverso del planeta, en imágenes reales de nuestros viajes.'

export const metadata = {
  title,
  description,
  // Canonical fijo a /gallery sin querystring: los filtros (?category=, ?sub=)
  // no deben generar URLs indexables por separado.
  alternates: { canonical: '/gallery' },
  openGraph: { title, description, url: '/gallery' },
  twitter: { title, description },
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
