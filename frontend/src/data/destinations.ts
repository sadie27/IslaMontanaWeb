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
      ASSETS.HERO.COMPUTER.LOBITOS,
      ASSETS.HERO.COMPUTER.PIQUERO,
      ASSETS.HERO.COMPUTER.PAISAJE,
    ],
    tours: {
      dia: [
        {
          id: 'd1',
          name: 'Kicker Rock Day Tour',
          duration: '1 día',
          difficulty: 'Fácil',
          highlights: ['Snorkel con tiburones de punta blanca', 'Colonia de lobos marinos', 'Guía naturalista certificado'],
          price: 'desde $180',
          badge: 'Más popular',
        },
        {
          id: 'd2',
          name: 'Isla Bartolomé',
          duration: '1 día',
          difficulty: 'Fácil',
          highlights: ['Pinnacle Rock & vista panorámica', 'Pingüinos de Galápagos', 'Snorkel en bahía volcánica'],
          price: 'desde $155',
        },
        {
          id: 'd3',
          name: 'Playa Tortuga Bay',
          duration: 'Medio día',
          difficulty: 'Fácil',
          highlights: ['Iguanas marinas en libertad', 'Flamingos en laguna interior', 'Playa de arena blanca'],
          price: 'desde $80',
        },
      ],
      cruceros: [
        {
          id: 'c1',
          name: 'Crucero Islas del Norte',
          duration: '12 días / 11 noches',
          difficulty: 'Moderado',
          highlights: ['Darwin & Wolf — tiburones martillo', 'Zonas sin acceso terrestre', 'Cupo máx. 16 personas'],
          price: 'desde $3.200',
          badge: 'Premium',
        },
        {
          id: 'c2',
          name: 'Crucero Clásico',
          duration: '8 días / 7 noches',
          difficulty: 'Fácil',
          highlights: ['Santa Cruz · Española · Isabela', '5 islas diferentes', 'Buceo y snorkel diario'],
          price: 'desde $2.100',
          badge: 'Recomendado',
        },
      ],
      tierra: [
        {
          id: 't1',
          name: 'Galápagos Esencial',
          duration: '8 días / 7 noches',
          difficulty: 'Fácil',
          highlights: ['Base en Puerto Ayora, Santa Cruz', 'Day tours a 3 islas', 'Snorkel en Kicker Rock incluido'],
          price: 'desde $1.890',
          badge: 'Más reservado',
        },
        {
          id: 't2',
          name: 'Galápagos Activo',
          duration: '10 días / 9 noches',
          difficulty: 'Moderado',
          highlights: ['Kayak de mar en Isabela', 'Ciclismo en lava solidificada', 'Buceo opcional (+$)'],
          price: 'desde $2.350',
        },
      ],
      personalizado: [
        {
          id: 'p1',
          name: 'Tu Galápagos Ideal',
          duration: 'A tu medida',
          difficulty: 'Fácil',
          highlights: ['Itinerario 100% personalizado', 'Guía privado certificado', 'Fechas y ritmo flexibles'],
          price: 'Consultar',
          badge: 'Exclusivo',
        },
      ],
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
      ASSETS.MEGA_MENU.AMAZONIA,
      ASSETS.HERO.COMPUTER.PAISAJE,
      ASSETS.HERO.COMPUTER.LOBITOS,
    ],
    tours: {
      dia: [
        {
          id: 'ad1',
          name: 'Canoa Río Napo al Amanecer',
          duration: '1 día',
          difficulty: 'Fácil',
          highlights: ['Navegación en canoa tradicional', 'Avistamiento de delfines rosados', 'Comunidad Kichwa — artesanía'],
          price: 'desde $120',
          badge: 'Auténtico',
        },
      ],
      cruceros: [],
      tierra: [
        {
          id: 'at1',
          name: 'Selva Profunda Napo',
          duration: '5 días / 4 noches',
          difficulty: 'Moderado',
          highlights: ['Lodge en zona de acceso restringido', 'Canoa nocturna y avistamiento de caimanes', 'Delfines rosados del Amazonas'],
          price: 'desde $680',
          badge: 'Experiencia real',
        },
        {
          id: 'at2',
          name: 'Cuyabeno Inmersivo',
          duration: '7 días / 6 noches',
          difficulty: 'Fácil',
          highlights: ['Reserva de Producción Faunística Cuyabeno', 'Laguna Grande — natación con delfines', 'Visita a comunidades Siona'],
          price: 'desde $890',
          badge: 'Más reservado',
        },
      ],
      personalizado: [
        {
          id: 'ap1',
          name: 'Tu Amazonía',
          duration: 'A tu medida',
          difficulty: 'Fácil',
          highlights: ['Lodge privado en zona remota', 'Guía ornitólogo o etnobotánico', 'Enfoque cultural o de biodiversidad'],
          price: 'Consultar',
          badge: 'Exclusivo',
        },
      ],
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
    photos: [
      ASSETS.MEGA_MENU.ANDES_CULTURA,
      ASSETS.HERO.COMPUTER.PAISAJE,
      ASSETS.HERO.COMPUTER.LOBITOS,
    ],
    tours: {
      dia: [
        {
          id: 'acd1',
          name: 'Otavalo & Mercado Artesanal',
          duration: '1 día',
          difficulty: 'Fácil',
          highlights: ['Mercado indígena de Otavalo', 'Lago San Pablo', 'Taller de tejidos Kichwa'],
          price: 'desde $95',
          badge: 'Más popular',
        },
      ],
      cruceros: [],
      tierra: [
        {
          id: 'act1',
          name: 'Ruta de los Mercados',
          duration: '5 días / 4 noches',
          difficulty: 'Fácil',
          highlights: ['Otavalo, Saquisilí y Zumbahua', 'Quito colonial + teleférico', 'Comunidad Kichwa en Cotacachi'],
          price: 'desde $720',
          badge: 'Más reservado',
        },
        {
          id: 'act2',
          name: 'Ecuador Indígena',
          duration: '8 días / 7 noches',
          difficulty: 'Fácil',
          highlights: ['4 mercados y 3 comunidades', 'Gastronomía andina auténtica', 'Español + Kichwa básico'],
          price: 'desde $1.050',
        },
        {
          id: 'act3',
          name: 'Camino del Inca',
          duration: '4 días / 3 noches',
          difficulty: 'Moderado',
          highlights: ['Ruta Inca por Ingapirca', 'Cuenca colonial UNESCO', 'Guía arqueólogo'],
          price: 'desde $490',
        },
      ],
      personalizado: [
        {
          id: 'acp1',
          name: 'Tu Ecuador Cultural',
          duration: 'A tu medida',
          difficulty: 'Fácil',
          highlights: ['Itinerario cultural personalizado', 'Contacto directo con comunidades', 'Fotografía y artesanía'],
          price: 'Consultar',
          badge: 'Exclusivo',
        },
      ],
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
    photos: [
      ASSETS.MEGA_MENU.ANDES_NATURALEZA,
      ASSETS.HERO.COMPUTER.PAISAJE,
      ASSETS.HERO.COMPUTER.PIQUERO,
    ],
    tours: {
      dia: [
        {
          id: 'and1',
          name: 'Cotopaxi Day Tour',
          duration: '1 día',
          difficulty: 'Moderado',
          highlights: ['Refugio a 4.800m', 'Trekking en el glaciar', 'Fauna de páramo: cóndores'],
          price: 'desde $85',
          badge: 'Más popular',
        },
      ],
      cruceros: [],
      tierra: [
        {
          id: 'ant1',
          name: 'Cotopaxi Clásico',
          duration: '3 días / 2 noches',
          difficulty: 'Moderado',
          highlights: ['Hacienda colonial en el pie del volcán', 'Trekking guiado al refugio', 'Fauna andina: cóndores y zorros'],
          price: 'desde $380',
          badge: 'Más reservado',
        },
        {
          id: 'ant2',
          name: 'Quilotoa Loop',
          duration: '4 días / 3 noches',
          difficulty: 'Moderado',
          highlights: ['Trekking entre comunidades indígenas', 'Laguna del Quilotoa en kayak', 'Alojamiento en posadas locales'],
          price: 'desde $310',
        },
        {
          id: 'ant3',
          name: 'Avenida de los Volcanes',
          duration: '7 días / 6 noches',
          difficulty: 'Exigente',
          highlights: ['Cotopaxi + Chimborazo + Quilotoa', 'Ascenso técnico opcional (+$)', 'Guía alpinista certificado ASEGUIM'],
          price: 'desde $860',
          badge: 'Para aventureros',
        },
      ],
      personalizado: [
        {
          id: 'anp1',
          name: 'Tu Ruta de Volcanes',
          duration: 'A tu medida',
          difficulty: 'Moderado',
          highlights: ['Selección de volcanes a medida', 'Ascensos técnicos o rutas panorámicas', 'Hacienda privada o camping'],
          price: 'Consultar',
          badge: 'Exclusivo',
        },
      ],
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
