import { Destination } from '@/lib/types'
import { ASSETS } from '@/config/assets'

export const DESTINATIONS: Destination[] = [
  {
    slug: 'galapagos',
    name: 'Islas Galápagos',
    tagline: 'Donde Darwin tomó notas',
    description: 'A mil kilómetros del continente, donde la evolución ocurrió sin interferencias. Aquí los animales nunca aprendieron a temer al ser humano.',
    heroImage: ASSETS.MEGA_MENU.GALAPAGOS,
    accentColor: '#1a7a8a',
    placeholderBg: '#061318',
    mapRegion: 'galapagos',
    stats: [
      { label: 'Especies endémicas', value: '1.900+' },
      { label: 'Km² protegidos', value: '133.000' },
      { label: 'Islas habitadas', value: '4' },
    ],
    whyVisit: [
      {
        title: 'Leones marinos que se acercan a jugar',
        desc: 'Los únicos del mundo que nunca aprendieron a temer al ser humano. Experiencia imposible en cualquier otro lugar del planeta.',
      },
      {
        title: 'Snorkel con tiburones sin jaula',
        desc: 'Punta blanca, ballena, martillo. Sin jaula. Sin miedo. Con guía naturalista certificado por el Parque Nacional.',
      },
      {
        title: 'Iguanas marinas — las únicas del planeta',
        desc: 'Las mismas que Darwin describió en sus cuadernos. Las únicas iguanas del mundo que se alimentan bajo el mar.',
      },
    ],
    bestTime: 'Junio – Diciembre',
    photos: [
      ASSETS.GALLERY.GALAPAGOS_CASTILLOS,
      ASSETS.GALLERY.GALAPAGOS_TORTUGA,
      ASSETS.GALLERY.GALAPAGOS_SEA_LIONS,
    ],
    tours: {
      dia: [],
      cruceros: [
        {
          id: 'c3',
          name: 'Crucero Islas Occidentales',
          duration: '6 días / 5 noches',
          difficulty: 'Moderado',
          highlights: ['Isabela y Fernandina — mejor zona para ballenas', 'Pingüinos de Galápagos en Elizabeth Bay', 'Yate de hasta 16 pasajeros'],
          price: 'Consultar',
          badge: 'Islas remotas',
        },
      ],
      tierra: [
        {
          id: 't3',
          name: 'Galápagos Aventura Privada',
          duration: '7 días / 6 noches',
          difficulty: 'Moderado',
          highlights: ['Trekking al cráter del Sierra Negra', 'Snorkel con tortugas, lobos marinos y tiburones', 'Quito colonial + Santa Cruz + Isabela'],
          price: 'Consultar',
          badge: 'Hiking & Snorkel',
        },
      ],
      personalizado: [],
    },
    faq: [
      {
        q: '¿Necesito permiso especial para visitar Galápagos?',
        a: 'Sí. Todos los visitantes pagan una tasa de entrada al Parque Nacional: $200 USD para extranjeros, $100 para residentes en Ecuador. La gestionamos junto con tu reserva, sin coste adicional de gestión.',
      },
      {
        q: '¿En qué época del año es mejor visitar?',
        a: 'Galápagos es visitable todo el año. Junio–Diciembre tiene agua más fría (18–22°C) y mejor visibilidad submarina — ideal para buceo y tiburones martillo. Enero–Mayo tiene agua más cálida (24–27°C), crías de tortugas y piqueros de patas azules en celo.',
      },
      {
        q: '¿Cuántos días necesito para ver lo esencial?',
        a: 'Recomendamos mínimo 6 días. Con 8–10 días puedes visitar varias islas con comodidad y sin prisas. Los cruceros de 8 días son la opción más completa: cubres mayor distancia y accedes a islas que no tienen tours de día.',
      },
    ],
  },
  {
    slug: 'amazonia',
    name: 'Amazonía Ecuatoriana',
    tagline: 'El silencio más ruidoso del planeta',
    description: 'La selva no es un lugar — es un estado de atención. Canoas al amanecer, 600 especies de aves y guías Kichwa que leen el bosque como un texto antiguo.',
    heroImage: ASSETS.MEGA_MENU.AMAZONIA,
    accentColor: '#2d6a1e',
    placeholderBg: '#0a1a06',
    mapRegion: 'amazonia',
    stats: [
      { label: 'Especies de aves', value: '600+' },
      { label: 'Ríos navegables', value: '23' },
      { label: 'Comunidades nativas', value: '12' },
    ],
    whyVisit: [
      {
        title: '300 especies de aves antes del desayuno',
        desc: 'El coro más complejo del planeta. Cada amanecer, diferente. Un paraíso para ornitólogos y curiosos por igual.',
      },
      {
        title: 'Navegar el Napo con guías Kichwa',
        desc: 'Conocen cada árbol, cada planta medicinal, cada sonido del bosque. No hay app que lo replique.',
      },
      {
        title: 'La Vía Láctea sin contaminación lumínica',
        desc: 'El cielo que los humanos hemos olvidado cómo se ve. Completo, brillante, abrumador.',
      },
    ],
    bestTime: 'Agosto – Enero',
    photos: [
      ASSETS.GALLERY.AMAZONIA_BUHO,
      ASSETS.GALLERY.AMAZONIA_NUTRIA,
      ASSETS.GALLERY.AMAZONIA_PASARELA,
    ],
    tours: {
      dia: [],
      cruceros: [],
      tierra: [
        {
          id: 'at3',
          name: 'Sacha Lodge — Alto Napo',
          duration: '4 días / 3 noches',
          difficulty: 'Fácil',
          highlights: ['Torre Kapok y puente colgante sobre el dosel', 'Canoa nocturna en busca de caimanes', 'Visita a comunidad indígena del río Napo'],
          price: 'Consultar',
          badge: 'Lodge premiado',
        },
      ],
      personalizado: [],
    },
    faq: [
      {
        q: '¿Es seguro viajar a la Amazonía ecuatoriana?',
        a: 'Con un operador certificado, absolutamente. Nuestros guías Kichwa conocen el territorio palmo a palmo. Todas las rutas están dentro de áreas protegidas y contamos con protocolos de emergencia y seguros de viaje.',
      },
      {
        q: '¿Necesito vacunas para visitar la selva?',
        a: 'Recomendamos fiebre amarilla (obligatoria en algunos países de tránsito), hepatitis A y B, y tifoidea. Consulta con tu médico al menos 4 semanas antes de viajar. También recomendamos repelente de alta concentración (DEET 30%+).',
      },
      {
        q: '¿Qué nivel físico se requiere?',
        a: 'La mayoría de nuestros tours son nivel fácil-moderado. No se requiere experiencia previa en trekking. Los senderos son cortos (2–6 km) y siempre guiados. El reto principal es la humedad y el calor, no la dificultad física.',
      },
    ],
  },
  {
    slug: 'andes-cultura',
    name: 'Andes Cultural',
    tagline: 'Donde el tiempo mide en mercados y tejidos',
    description: 'Quito colonial, mercados indígenas y comunidades que guardan tradiciones de siglos. Los Andes culturales son la memoria viva de Ecuador.',
    heroImage: ASSETS.MEGA_MENU.ANDES_CULTURA,
    accentColor: '#8B4513',
    placeholderBg: '#1a0e06',
    mapRegion: 'andes',
    stats: [
      { label: 'Mercados indígenas', value: '18' },
      { label: 'Patrimonio UNESCO', value: '2' },
      { label: 'Etnias representadas', value: '14' },
    ],
    whyVisit: [
      {
        title: 'Mercado de Otavalo — el más grande de América',
        desc: 'Cada sábado desde hace 700 años. Artesanía, música andina y textiles que no encontrarás en ningún otro lugar del continente.',
      },
      {
        title: 'Quito: el centro histórico mejor preservado de Latinoamérica',
        desc: 'Declarado Patrimonio de la Humanidad por la UNESCO. Iglesias barrocas, conventos y plazas que cuentan 500 años de historia.',
      },
      {
        title: 'Comunidades Kichwa de la Sierra',
        desc: 'Vivir un día como agricultor en los Andes. Cocina tradicional, ceremonias y el Pachamama que aún se siente.',
      },
    ],
    bestTime: 'Todo el año',
    // TODO: fotos reales pendientes en public/images/andes-cultura/ (ver ASSETS.GALLERY.ANDES_CULTURA_*).
    // Mientras no existan los archivos, se usa la imagen del mega-menu como única foto propia disponible.
    photos: [
      ASSETS.MEGA_MENU.ANDES_CULTURA,
    ],
    tours: {
      dia: [],
      cruceros: [],
      tierra: [
        {
          id: 'act4',
          name: 'Hacienda Zuleta & Mercado de Otavalo',
          duration: '3 días / 2 noches',
          difficulty: 'Fácil',
          highlights: ['Hospedaje en hacienda histórica del siglo XVII', 'Valle de los cóndores — programa de reproducción', 'Comunidad indígena y taller de bordado'],
          price: 'Consultar',
          badge: 'Hacienda histórica',
        },
      ],
      personalizado: [],
    },
    faq: [
      {
        q: '¿Qué idioma hablan las comunidades indígenas?',
        a: 'La mayoría de comunidades hablan Kichwa como lengua materna y español como segunda lengua. Nuestros guías son bilingües y actúan de intérpretes culturales, no solo lingüísticos.',
      },
      {
        q: '¿Los mercados están todos los días?',
        a: 'El mercado de Otavalo es el más activo los sábados (el mayor), aunque abre toda la semana. Saquisilí es exclusivamente los jueves. Te organizamos el itinerario para que coincidas con los mejores días.',
      },
      {
        q: '¿Se puede visitar Quito y los Andes en el mismo viaje?',
        a: 'Absolutamente. Quito es el hub natural: a 2h de Otavalo, a 45 min del Cotopaxi y a 3h de Saquisilí. Casi todos nuestros itinerarios de Andes Cultural incluyen al menos 2 noches en Quito.',
      },
    ],
  },
  {
    slug: 'andes-naturaleza',
    name: 'Andes & Volcanes',
    tagline: 'La avenida de los volcanes que Humboldt bautizó',
    description: 'Cotopaxi, Chimborazo, Quilotoa. La mayor concentración de volcanes activos del mundo, con lagunas de cráter esmeralda y páramos que parecen de otro planeta.',
    heroImage: ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    accentColor: '#4a6fa5',
    placeholderBg: '#060c18',
    mapRegion: 'andes',
    stats: [
      { label: 'Volcanes activos', value: '50+' },
      { label: 'Metros de altitud máx.', value: '6.268' },
      { label: 'Lagunas de cráter', value: '8' },
    ],
    whyVisit: [
      {
        title: 'Cotopaxi: el volcán activo más alto del mundo',
        desc: '5.897 metros. Perfectamente cónico. Nevado. Activo. Una de las imágenes más icónicas de los Andes y de toda Sudamérica.',
      },
      {
        title: 'Laguna del Quilotoa: turquesa en el cráter',
        desc: 'Un lago volcánico de color esmeralda a 3.914 m de altura. El trekking del loop de Quilotoa (3 días) es uno de los mejores de América del Sur.',
      },
      {
        title: 'Páramo: el ecosistema más rápido para capturar agua',
        desc: 'Solo existe en los Andes tropicales. Un paisaje de otro mundo, con frailejones gigantes y el silencio más denso que hayas experimentado.',
      },
    ],
    bestTime: 'Junio – Septiembre',
    // TODO: fotos reales pendientes en public/images/andes-naturaleza/ (ver ASSETS.GALLERY.ANDES_NATURALEZA_*).
    // Mientras no existan los archivos, se usa la imagen del mega-menu como única foto propia disponible.
    photos: [
      ASSETS.MEGA_MENU.ANDES_NATURALEZA,
    ],
    tours: {
      dia: [
        {
          id: 'and2',
          name: 'Volcán Antisana Full Day',
          duration: '1 día',
          difficulty: 'Moderado',
          highlights: ['Mayor población de cóndores andinos del país', 'Laguna La Mica y aves acuáticas altoandinas', 'Vistas del Antisana, 5.753m'],
          price: 'Consultar',
          badge: 'Birdwatching',
        },
      ],
      cruceros: [],
      tierra: [
        {
          id: 'ant4',
          name: 'Joyas del Chocó — Mindo Birding',
          duration: '3 días / 2 noches',
          difficulty: 'Fácil',
          highlights: ['Mayor diversidad de colibríes de América', 'Antpittas de Ángel Paz y Cock-of-the-rock', 'Reservas Yanacocha, Milpe y Sachatamia'],
          price: 'Consultar',
          badge: 'Birdwatching',
        },
        {
          id: 'ant5',
          name: 'Mindo Birding Privado',
          duration: '2 días / 1 noche',
          difficulty: 'Fácil',
          highlights: ['Programa privado para 2 personas', 'Reservas Zuroloma, Guaycapi y Sachatamia', 'Comederos de colibríes y tangaras'],
          price: 'Consultar',
          badge: 'Grupo privado',
        },
      ],
      personalizado: [],
    },
    faq: [
      {
        q: '¿Se necesita experiencia de montaña para visitar el Cotopaxi?',
        a: 'Para los day tours y el refugio no. Para el ascenso al cráter (>5.000m) sí requerimos experiencia mínima de alta montaña y buena condición física. Tenemos opciones para todos los niveles — desde familias hasta alpinistas.',
      },
      {
        q: '¿Hay riesgo por actividad volcánica?',
        a: 'Monitoreamos en tiempo real el estado del IG-EPN (Instituto Geofísico). El Cotopaxi tuvo actividad en 2015; desde entonces el acceso al cráter es controlado. Nunca operamos en zonas de alerta naranja o roja. La seguridad es la primera decisión, siempre.',
      },
      {
        q: '¿El mal de altura es un problema?',
        a: 'Dependiendo del destino, operas entre 3.000 y 5.000m. Recomendamos 1 día de aclimatación en Quito (2.850m) antes de subir. Nuestros guías llevan oxígeno suplementario. La clave es hidratación, ritmo lento y nada de alcohol el primer día.',
      },
    ],
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug)
}

export const destinations = DESTINATIONS
export const getDestination = getDestinationBySlug
