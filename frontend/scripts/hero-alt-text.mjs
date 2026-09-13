/**
 * Alt text descriptivo por imagen del hero, indexado por nombre de fichero
 * (tal como aparece en public/images/hero-main/{computer,mobile}/).
 *
 * Por qué existe: los nombres de fichero originales contienen nombres propios
 * y fechas (ej. "GLP 5 Amalia con TortugaMarina Mayo2019.webp") que no son
 * alt text válido — ni describen la imagen ni ayudan a SEO de imágenes.
 *
 * Al añadir una imagen nueva al hero, añade aquí su entrada; si falta,
 * generate-hero-manifest.mjs usa HERO_ALT_FALLBACK.
 */
export const HERO_ALT_TEXT = {
  'Bahia Gardner Feb2018.webp': 'Playa de arena blanca en Bahía Gardner, Galápagos',
  'DSC_0436.webp': 'Costa volcánica de las Islas Galápagos',
  'GLP 4 Amalia con Pinguinos Isabela May02019 - Copy.webp': 'Pingüinos de Galápagos en la isla Isabela',
  'GLP 5 Amalia con TortugaMarina Mayo2019.webp': 'Tortuga marina nadando en aguas de Galápagos',
  'Galapagos DaniSanti 31 Ag2016.webp': 'Paisaje costero de las Islas Galápagos',
  'Lobito marino 2 IslaLobos Feb2021.webp': 'Lobo marino de Galápagos en Isla Lobos',
  'Orcas Mom and Calf Feb2016.webp': 'Orcas madre y cría frente a la costa de Ecuador',
  'Penguin Last Snorkle Sombrero Chino Apr2014.webp': 'Pingüino de Galápagos en Sombrero Chino',
  'Reserva PazdelasAves Cock-of-the-Rock Nov2018.webp': 'Gallito de las rocas andino en la Reserva Paz de las Aves',
  'SachaLodge 29 Barizo Ag2019.webp': 'Fauna de la selva amazónica en Sacha Lodge',
  'Sea Lion Pup and Kid.webp': 'Cría de lobo marino jugando en Galápagos',
  'Tortuga bay panorama.webp': 'Vista panorámica de Tortuga Bay, Galápagos',
  'Yubarta 8 Isla de La Plata Ag2019.webp': 'Ballena jorobada frente a Isla de la Plata',
  'Papallacta Antisana Nov2016.webp': 'Páramo andino con vista al volcán Antisana',
  'lobito.webp': 'Lobo marino de Galápagos',
  'piqueros.webp': 'Piqueros de patas azules en Galápagos',
}

export const HERO_ALT_FALLBACK = 'Paisaje de naturaleza en Ecuador'
