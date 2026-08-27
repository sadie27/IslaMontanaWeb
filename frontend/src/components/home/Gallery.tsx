"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'
import { ASSETS } from '@/config/assets'
import { GALLERY_IMAGES } from '@/data/gallery'
import { useLightbox } from '@/hooks/useLightbox'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import type { GalleryImage } from '@/types/gallery'

const TOTAL_PHOTOS = GALLERY_IMAGES.length

const GALLERY_IMGS: (GalleryImage & { tall: boolean })[] = [
  {
    id: 'home-galapagos-portada',
    src: ASSETS.GALLERY.GALAPAGOS_PORTADA,
    alt: 'Islas Galápagos',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    tall: true,
    width: 3872,
    height: 2592,
  },
  {
    id: 'home-amazonia-viaje-22',
    src: ASSETS.GALLERY.AMAZONIA_VIAJE_22,
    alt: 'Amazonía Ecuatoriana',
    category: 'destinos',
    sub: 'amazonia',
    tag: 'Amazonía',
    tall: false,
    width: 3872,
    height: 2592,
  },
  {
    id: 'home-andes-naturaleza',
    src: ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    alt: 'Andes y Volcanes',
    category: 'destinos',
    sub: 'andes-naturaleza',
    tag: 'Andes Naturaleza',
    tall: false,
    width: 1200,
    height: 800,
  },
  {
    id: 'home-galapagos-tortuga',
    src: ASSETS.GALLERY.GALAPAGOS_TORTUGA,
    alt: 'Buceo con tortugas marinas en Galápagos',
    category: 'destinos',
    sub: 'galapagos',
    tag: 'Galápagos',
    tall: false,
    width: 3872,
    height: 2592,
  },
]

export default function Gallery() {
  const { lightboxItems, lightboxIndex, triggerRef, openLightbox, closeLightbox, navLightbox } = useLightbox()

  return (
    <section className="gallery">
      <div className="gallery__inner">
        {/* ── Header ── */}
        <div className="gallery__header">
          <p className="gallery__label">Galería</p>
          <h2 className="gallery__title">Ecuador en imágenes.</h2>
        </div>

        {/* ── Grid ── */}
        <div className="gallery__grid" role="list" aria-label="Galería de destinos">

          {GALLERY_IMGS.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              className={[
                'gallery__item',
                img.tall ? 'gallery__item--tall' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              role="listitem"
              onClick={() => openLightbox(GALLERY_IMGS, idx)}
              aria-label={`Ampliar foto: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  img.tall
                    ? '(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 40vw'
                    : '(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 20vw'
                }
                className="gallery__img"
              />
            </button>
          ))}

          {/* 5ª tarjeta: CTA a la galería completa, oculta en mobile */}
          <Link
            href={ROUTES.GALLERY}
            className="gallery__item gallery__item--last"
            role="listitem"
            aria-label="Ver todas las fotos de la galería"
          >
            <Image
              src={ASSETS.GALLERY.AMAZONIA_BUHO}
              alt="Fauna de la selva amazónica"
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 20vw"
              className="gallery__img"
            />
            <span className="gallery__img-overlay" aria-hidden="true">
              <span className="gallery__overlay-text">+{TOTAL_PHOTOS} fotos →</span>
            </span>
          </Link>
        </div>
      </div>

      <GalleryLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNav={navLightbox}
        triggerRef={triggerRef}
      />
    </section>
  )
}
