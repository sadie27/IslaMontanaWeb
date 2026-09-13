/* ── config/hero-images.ts ─────────────────────────────────
   Manifiesto estático de imágenes del Hero.

   IMPORTANTE: Este archivo se genera automáticamente.
   Ejecutar: npm run generate:hero
   cada vez que agregues o elimines imágenes en:
   - /public/images/hero-main/computer/ (landscape desktop)
   - /public/images/hero-main/mobile/   (portrait mobile)

   Cada entrada incluye `srcset` con variantes redimensionadas reales
   (generadas en build con sharp) y `alt` descriptivo — ver
   scripts/hero-alt-text.mjs para el mapeo de alt text por fichero.
──────────────────────────────────────────────────────────── */

export interface HeroImage {
  src: string
  srcset: string
  alt: string
}

export const heroImages: { computer: HeroImage[]; mobile: HeroImage[] } = {
  computer: [
    { src: '/images/hero-main/computer/Bahia Gardner Feb2018.webp', srcset: '/images/hero-main/computer/resized/Bahia Gardner Feb2018-768w.webp 768w, /images/hero-main/computer/resized/Bahia Gardner Feb2018-1280w.webp 1280w, /images/hero-main/computer/resized/Bahia Gardner Feb2018-1920w.webp 1920w', alt: 'Playa de arena blanca en Bahía Gardner, Galápagos' },
    { src: '/images/hero-main/computer/DSC_0436.webp', srcset: '/images/hero-main/computer/resized/DSC_0436-768w.webp 768w, /images/hero-main/computer/resized/DSC_0436-1280w.webp 1280w, /images/hero-main/computer/resized/DSC_0436-1920w.webp 1920w', alt: 'Costa volcánica de las Islas Galápagos' },
    { src: '/images/hero-main/computer/GLP 4 Amalia con Pinguinos Isabela May02019 - Copy.webp', srcset: '/images/hero-main/computer/resized/GLP 4 Amalia con Pinguinos Isabela May02019 - Copy-768w.webp 768w, /images/hero-main/computer/resized/GLP 4 Amalia con Pinguinos Isabela May02019 - Copy-1280w.webp 1280w, /images/hero-main/computer/resized/GLP 4 Amalia con Pinguinos Isabela May02019 - Copy-1920w.webp 1920w', alt: 'Pingüinos de Galápagos en la isla Isabela' },
    { src: '/images/hero-main/computer/GLP 5 Amalia con TortugaMarina Mayo2019.webp', srcset: '/images/hero-main/computer/resized/GLP 5 Amalia con TortugaMarina Mayo2019-768w.webp 768w, /images/hero-main/computer/resized/GLP 5 Amalia con TortugaMarina Mayo2019-1280w.webp 1280w, /images/hero-main/computer/resized/GLP 5 Amalia con TortugaMarina Mayo2019-1920w.webp 1920w', alt: 'Tortuga marina nadando en aguas de Galápagos' },
    { src: '/images/hero-main/computer/Galapagos DaniSanti 31 Ag2016.webp', srcset: '/images/hero-main/computer/resized/Galapagos DaniSanti 31 Ag2016-768w.webp 768w, /images/hero-main/computer/resized/Galapagos DaniSanti 31 Ag2016-1280w.webp 1280w, /images/hero-main/computer/resized/Galapagos DaniSanti 31 Ag2016-1920w.webp 1920w', alt: 'Paisaje costero de las Islas Galápagos' },
    { src: '/images/hero-main/computer/Lobito marino 2 IslaLobos Feb2021.webp', srcset: '/images/hero-main/computer/resized/Lobito marino 2 IslaLobos Feb2021-768w.webp 768w, /images/hero-main/computer/resized/Lobito marino 2 IslaLobos Feb2021-1280w.webp 1280w, /images/hero-main/computer/resized/Lobito marino 2 IslaLobos Feb2021-1920w.webp 1920w', alt: 'Lobo marino de Galápagos en Isla Lobos' },
    { src: '/images/hero-main/computer/Orcas Mom and Calf Feb2016.webp', srcset: '/images/hero-main/computer/resized/Orcas Mom and Calf Feb2016-768w.webp 768w, /images/hero-main/computer/resized/Orcas Mom and Calf Feb2016-1280w.webp 1280w, /images/hero-main/computer/resized/Orcas Mom and Calf Feb2016-1920w.webp 1920w', alt: 'Orcas madre y cría frente a la costa de Ecuador' },
    { src: '/images/hero-main/computer/Penguin Last Snorkle Sombrero Chino Apr2014.webp', srcset: '/images/hero-main/computer/resized/Penguin Last Snorkle Sombrero Chino Apr2014-768w.webp 768w, /images/hero-main/computer/resized/Penguin Last Snorkle Sombrero Chino Apr2014-1280w.webp 1280w, /images/hero-main/computer/resized/Penguin Last Snorkle Sombrero Chino Apr2014-1920w.webp 1920w', alt: 'Pingüino de Galápagos en Sombrero Chino' },
    { src: '/images/hero-main/computer/Reserva PazdelasAves Cock-of-the-Rock Nov2018.webp', srcset: '/images/hero-main/computer/resized/Reserva PazdelasAves Cock-of-the-Rock Nov2018-768w.webp 768w, /images/hero-main/computer/resized/Reserva PazdelasAves Cock-of-the-Rock Nov2018-1280w.webp 1280w, /images/hero-main/computer/resized/Reserva PazdelasAves Cock-of-the-Rock Nov2018-1920w.webp 1920w', alt: 'Gallito de las rocas andino en la Reserva Paz de las Aves' },
    { src: '/images/hero-main/computer/SachaLodge 29 Barizo Ag2019.webp', srcset: '/images/hero-main/computer/resized/SachaLodge 29 Barizo Ag2019-768w.webp 768w, /images/hero-main/computer/resized/SachaLodge 29 Barizo Ag2019-1280w.webp 1280w, /images/hero-main/computer/resized/SachaLodge 29 Barizo Ag2019-1920w.webp 1920w', alt: 'Fauna de la selva amazónica en Sacha Lodge' },
    { src: '/images/hero-main/computer/Sea Lion Pup and Kid.webp', srcset: '/images/hero-main/computer/resized/Sea Lion Pup and Kid-768w.webp 768w, /images/hero-main/computer/resized/Sea Lion Pup and Kid-1280w.webp 1280w, /images/hero-main/computer/resized/Sea Lion Pup and Kid-1920w.webp 1920w', alt: 'Cría de lobo marino jugando en Galápagos' },
    { src: '/images/hero-main/computer/Tortuga bay panorama.webp', srcset: '/images/hero-main/computer/resized/Tortuga bay panorama-768w.webp 768w, /images/hero-main/computer/resized/Tortuga bay panorama-1280w.webp 1280w, /images/hero-main/computer/resized/Tortuga bay panorama-1920w.webp 1920w', alt: 'Vista panorámica de Tortuga Bay, Galápagos' },
    { src: '/images/hero-main/computer/Yubarta 8 Isla de La Plata Ag2019.webp', srcset: '/images/hero-main/computer/resized/Yubarta 8 Isla de La Plata Ag2019-768w.webp 768w, /images/hero-main/computer/resized/Yubarta 8 Isla de La Plata Ag2019-1280w.webp 1280w, /images/hero-main/computer/resized/Yubarta 8 Isla de La Plata Ag2019-1920w.webp 1920w', alt: 'Ballena jorobada frente a Isla de la Plata' },
  ],
  mobile: [
    { src: '/images/hero-main/mobile/Papallacta Antisana Nov2016.webp', srcset: '/images/hero-main/mobile/resized/Papallacta Antisana Nov2016-480w.webp 480w, /images/hero-main/mobile/resized/Papallacta Antisana Nov2016-768w.webp 768w, /images/hero-main/mobile/resized/Papallacta Antisana Nov2016-1080w.webp 1080w', alt: 'Páramo andino con vista al volcán Antisana' },
    { src: '/images/hero-main/mobile/lobito.webp', srcset: '/images/hero-main/mobile/resized/lobito-480w.webp 480w, /images/hero-main/mobile/resized/lobito-768w.webp 768w, /images/hero-main/mobile/resized/lobito-1080w.webp 1080w', alt: 'Lobo marino de Galápagos' },
    { src: '/images/hero-main/mobile/piqueros.webp', srcset: '/images/hero-main/mobile/resized/piqueros-480w.webp 480w, /images/hero-main/mobile/resized/piqueros-768w.webp 768w, /images/hero-main/mobile/resized/piqueros-1080w.webp 1080w', alt: 'Piqueros de patas azules en Galápagos' },
  ],
}
