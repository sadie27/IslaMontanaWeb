import type { Tour } from '@/components/home/TourCard'
import { ASSETS } from '@/config/assets'

/*
 * PRECIOS ORIENTATIVOS — PENDIENTE DE RELLENAR
 * ---------------------------------------------
 * Cada tour acepta un campo opcional `priceFrom` con el precio "desde" por
 * persona, ej. priceFrom: '2.400 €'. Mientras esté vacío, la web sigue
 * mostrando "Consultar" sin romper nada.
 *
 * Para activarlo: descomenta la línea `// priceFrom:` de cada tour y pon la
 * cifra real confirmada. No inventar precios — un precio erróneo publicado
 * es peor que no publicar ninguno.
 */

/** Todos los tours base — fuente de verdad para /experiences. */
export const HOME_TOURS: Tour[] = [
  {
    id: 'c3',
    groupSize: 'Hasta 16 viajeros',
    name: 'Crucero Islas Occidentales',
    duration: '6 días / 5 noches',
    difficulty: 'Moderado',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Islas remotas',
    accent: '#1a7a8a',
    region: 'Galápagos',
    image: ASSETS.TOURS.CRUCERO_ISLAS_OCCIDENTALES,
    activities: ['Navegación', 'Snorkel', 'Kayak', 'Caminatas guiadas', 'Panga ride'],
    highlights: [
      'Isabela y Fernandina — mejor zona para ballenas',
      'Pingüinos de Galápagos en Elizabeth Bay',
      'Yate de hasta 16 pasajeros',
    ],
    overview:
      'Navega las islas occidentales de Galápagos a bordo de un yate de hasta 16 pasajeros, combinando ' +
      'buen servicio, cabinas cómodas y altos estándares de seguridad con guías naturalistas expertos. ' +
      'Este itinerario recorre Santa Cruz, Isabela, Fernandina y Santiago — la zona con mayor concentración ' +
      'de vida silvestre endémica del archipiélago, incluyendo las mejores áreas para observar pingüinos ' +
      'de Galápagos y ballenas, paisajes volcánicos espectaculares y algunas de las mejores zonas de snorkel ' +
      'de las islas. Cuéntanos tus intereses y tu presupuesto y armamos contigo el itinerario ideal.',
    itinerary: [
      {
        title: 'Día 1 — Baltra · Santa Cruz · Estación Charles Darwin',
        description:
          'Llegada al aeropuerto de Baltra y traslado a Santa Cruz, donde embarcas en tu yate. Por la tarde, ' +
          'visita a la Estación Científica Charles Darwin para conocer el programa de reproducción de tortugas ' +
          'gigantes e iguanas terrestres, y buscar pinzones de Darwin, pájaros papamoscas y sinsontes en el ' +
          'bosque seco nativo. Caminata de 2 km.',
      },
      {
        title: 'Día 2 — Isabela: Punta Moreno y Bahía Elizabeth',
        description:
          'Punta Moreno combina extensos campos de lava con lagunas de agua salobre donde viven flamencos, ' +
          'gallaretas y garzas; en la costa buscamos pingüinos, iguanas marinas, cormoranes no voladores y lobos ' +
          'marinos, con snorkel incluido. Por la tarde, recorrido en panga por los canales de Bahía Elizabeth, ' +
          'rodeada de manglares — uno de los mejores lugares del archipiélago para ver al pingüino de Galápagos.',
      },
      {
        title: 'Día 3 — Isabela: Bahía Urbina y Caleta Tagus',
        description:
          'Bahía Urbina conserva evidencia del levantamiento geológico de los años 50: conchas y corales varios ' +
          'metros sobre el nivel del mar. Caminata en busca de iguanas terrestres, tortugas gigantes y pinzones, ' +
          'con snorkel desde la playa. En Caleta Tagus, sendero por bosque seco de palo santo hasta el lago ' +
          'Darwin, con vistas a los volcanes del norte de Isabela, seguido de recorrido en panga, kayak y snorkel.',
      },
      {
        title: 'Día 4 — Fernandina: Punta Espinosa · Isabela: Punta Vicente Roca',
        description:
          'En Punta Espinosa, al pie del volcán más activo de Galápagos, te espera la colonia de iguanas ' +
          'marinas más grande del archipiélago, lobos marinos, cormoranes no voladores anidando y tortugas ' +
          'marinas en aguas ricas en nutrientes. Por la tarde, recorrido en panga en Punta Vicente Roca, bajo ' +
          'algunos de los acantilados más altos de las islas, con snorkel entre tortugas marinas y pingüinos.',
      },
      {
        title: 'Día 5 — Santiago: Puerto Egas · Rábida',
        description:
          'Puerto Egas, donde Charles Darwin pasó más tiempo en tierra, ofrece las Grutas de los Lobos Marinos ' +
          'y excelentes pozas de marea para observar aves costeras y snorkel desde la playa. Rábida, famosa por ' +
          'sus rocas de lava rojiza, tiene una laguna de agua salada con flamencos y una colonia de lobos ' +
          'marinos; sendero, snorkel y kayak.',
      },
      {
        title: 'Día 6 — Santa Cruz: Caleta Tortuga Negra · Baltra',
        description:
          'Recorrido en panga por los canales de manglar de Caleta Tortuga Negra, zona de apareamiento de ' +
          'tortugas marinas y vivero de tiburones, con buenas opciones de ver tiburones de puntas blanca y ' +
          'negra, rayas y aves marinas. Traslado final al aeropuerto de Baltra para el vuelo de regreso al ' +
          'continente (posibilidad de extender la estadía en las islas).',
      },
    ],
    includes: [
      'Navegación en yate de hasta 16 pasajeros con cabinas',
      'Todas las comidas a bordo',
      'Guía naturalista bilingüe certificado por el Parque Nacional Galápagos',
      'Excursiones diarias en panga, snorkel y caminatas guiadas',
      'Equipo de snorkel',
    ],
    excludes: [
      'Vuelos Quito/Guayaquil – Galápagos',
      'Tasa de ingreso al Parque Nacional Galápagos y tarjeta de tránsito INGALA',
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas para guía y tripulación',
      'Gastos personales',
    ],
  },
  {
    id: 't3',
    groupSize: 'Programa privado',
    name: 'Galápagos Aventura Privada',
    duration: '7 días / 6 noches',
    difficulty: 'Moderado',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Hiking & Snorkel',
    accent: '#1a7a8a',
    region: 'Galápagos',
    image: ASSETS.TOURS.GALAPAGOS_AVENTURA_PRIVADA,
    activities: ['Hiking', 'Snorkel', 'Kayak', 'Ciclismo', 'Birdwatching', 'Fotografía'],
    highlights: [
      'Trekking al cráter del Sierra Negra',
      'Snorkel con tortugas, lobos marinos y tiburones',
      'Quito colonial + Santa Cruz + Isabela',
    ],
    overview:
      'Descubre otra cara de Galápagos en esta aventura basada en lodges que combina las islas de Santa Cruz ' +
      'e Isabela. Con guías naturalistas expertos exploramos rincones a los que los barcos de crucero no ' +
      'llegan, viviendo cada día una excursión distinta: caminatas por volcanes remotos, snorkel, kayak y ' +
      'ciclismo, siempre rodeados de la fauna icónica de las islas. El viaje comienza en el histórico Quito, ' +
      'Patrimonio de la Humanidad por la UNESCO.',
    itinerary: [
      {
        title: 'Día 1 — Quito colonial',
        description:
          'Tour guiado de medio día por el centro histórico de Quito, uno de los primeros Patrimonios de la ' +
          'Humanidad declarados por la UNESCO, con su arquitectura colonial, iglesias doradas y la Iglesia de ' +
          'San Francisco. Tarde libre.',
      },
      {
        title: 'Día 2 — Vuelo a Galápagos · Tortugas gigantes en Santa Cruz',
        description:
          'Vuelo a la isla Baltra, donde te recibe tu guía naturalista. Traslado a Santa Cruz con parada en ' +
          'las tierras altas para buscar tortugas gigantes de Darwin en su hábitat natural y aves nativas como ' +
          'sinsontes, pinzones y patos. Visita a un túnel de lava y almuerzo en las tierras altas antes de ' +
          'continuar a Puerto Ayora.',
      },
      {
        title: 'Día 3 — Bahía Tortuga y Estación Charles Darwin',
        description:
          'Caminata hasta Bahía Tortuga, una de las playas más bellas de Galápagos, para nadar, fotografiar ' +
          'iguanas marinas y observar piqueros de patas azules. Kayak en la "playa mansa" en busca de pelícanos, ' +
          'garzas, rayas y tortugas marinas. Por la tarde, visita al proyecto de crianza de tortugas gigantes.',
      },
      {
        title: 'Día 4 — Isla Isabela',
        description:
          'Traslado en lancha rápida a Isabela (o vuelo alternativo en avioneta). Recorrido por Puerto Villamil ' +
          'y sus lagunas costeras en busca de flamencos y aves playeras. Por la tarde, snorkel en una caleta con ' +
          'tortugas marinas, lobos marinos, tiburones de arrecife y, con suerte, pingüinos.',
      },
      {
        title: 'Día 5 — Volcán Sierra Negra',
        description:
          'Caminata hasta el borde del cráter del Sierra Negra, uno de los volcanes activos más grandes de ' +
          'Galápagos, entre fumarolas y formaciones de lava petrificada, con vistas al océano y opción de ' +
          'extender la caminata hasta el Volcán Chico.',
      },
      {
        title: 'Día 6 — Islote Tintoreras y Muro de las Lágrimas',
        description:
          'Visita al islote de Tintoreras, accesible solo en bote pequeño, con grandes grupos de iguanas ' +
          'marinas, lobos marinos, pingüinos y tiburones de arrecife, seguido de snorkel entre peces tropicales ' +
          'y tortugas marinas. Por la tarde, recorrido en bicicleta por el sendero al Muro de las Lágrimas.',
      },
      {
        title: 'Día 7 — Regreso a Quito',
        description:
          'Traslado a Santa Cruz en lancha rápida y de ahí a Baltra por tierra (o vuelo directo alternativo) ' +
          'para tomar el vuelo de regreso a Quito.',
      },
      {
        title: '¿Quieres alargarlo? — días extra opcionales',
        description:
          'Puedes añadir uno o dos días más con excursiones de día completo en barco. Seymour Norte: lobos ' +
          'marinos, colonias de fragatas en cortejo y piqueros de patas azules anidando, con snorkel ' +
          'excepcional. South Plaza: iguanas terrestres y marinas, gaviotas de cola bifurcada y rabijuncos. ' +
          'Bartolomé y Bahía Sullivan: el paisaje volcánico más espectacular del archipiélago, con ' +
          'pingüinos y halcones de Galápagos. Dinos si te interesa y lo montamos.',
      },
    ],
    includes: [
      'Alojamiento en lodges en Santa Cruz e Isabela',
      'Guía naturalista bilingüe en todo el recorrido',
      'Traslados internos, incluida lancha rápida entre islas',
      'Excursiones y actividades detalladas en el itinerario',
      'Equipo de snorkel',
    ],
    excludes: [
      'Vuelos Quito – Galápagos',
      'Tasa de ingreso al Parque Nacional Galápagos y tarjeta de tránsito INGALA',
      'Comidas no especificadas en el itinerario',
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas y gastos personales',
    ],
  },
  {
    id: 'at3',
    name: 'Sacha Lodge — Alto Napo',
    duration: '4 días / 3 noches',
    difficulty: 'Fácil',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Lodge premiado',
    accent: '#2d6a1e',
    region: 'Amazonía',
    image: ASSETS.TOURS.SACHA_LODGE_ALTO_NAPO,
    activities: ['Canoa', 'Caminatas guiadas', 'Birdwatching', 'Caminata nocturna', 'Pesca de pirañas'],
    highlights: [
      'Torre Kapok y puente colgante sobre el dosel',
      'Canoa nocturna en busca de caimanes',
      'Visita a comunidad indígena del río Napo',
    ],
    overview:
      'La Amazonía, relativamente cercana a Quito, se extiende desde las estribaciones de los Andes y es, con ' +
      'más de 6 millones de km², la mayor selva tropical del mundo y la más diversa. Te invitamos a explorarla ' +
      'en el alto río Napo, disfrutando de su biodiversidad sin igual, sus plantas y animales espectaculares y ' +
      'la belleza de sus lagunas y bosques inundados. Este lodge premiado ofrece una experiencia única de la ' +
      'selva amazónica con la comodidad y seguridad de habitaciones amplias con mosquiteros, gastronomía ' +
      'destacada y una extensa red de senderos propios. También operamos este programa en versión de ' +
      '5 días / 4 noches si quieres más tiempo en la selva — dínoslo y lo ajustamos.',
    itinerary: [
      {
        title: 'Día 1 — Quito · Coca · Sacha Lodge',
        description:
          'Vuelo de 30 minutos desde Quito sobre los Andes hasta Coca, ciudad petrolera en la cuenca ' +
          'amazónica. Almuerzo rápido y traslado en canoa privada por el río Napo (2 h) hasta la reserva de ' +
          'Sacha. Caminata de 30 minutos por la selva hasta la laguna Pilchicocha, donde un guía nativo te ' +
          'traslada en canoa hasta el lodge para un almuerzo tardío. Por la tarde, salida en canoa por la laguna ' +
          'en busca de monos, nutrias gigantes, garzas, loros o caimanes, y por la noche, caminata nocturna o ' +
          'paseo en canoa para ver caimanes con sus ojos brillantes.',
      },
      {
        title: 'Día 2 — Torre Kapok y puente colgante',
        description:
          'Sacha ofrece una variedad de senderos para observar monos y aves y aprender sobre los distintos ' +
          'tipos de bosque amazónico. Visita a la Torre Kapok y el puente colgante sobre el dosel para vistas ' +
          'espectaculares y avistamiento de aves de colores vibrantes, monos, perezosos y águilas a la altura ' +
          'de los ojos. Por la tarde, caminata por el sendero "Leoncillo" en busca del esquivo mono tití, y ' +
          'alrededor de las 15:30, un paseo silencioso en canoa por el bosque inundado en busca de monos ' +
          'ardilla, capuchinos, aulladores, nutrias gigantes y perezosos de tres dedos.',
      },
      {
        title: 'Día 3 — Collpa de loros y comunidad indígena',
        description:
          'Salida temprano (6 am) en canoa motorizada hacia la collpa de loros cercana al Parque Nacional ' +
          'Yasuní, donde hasta cuatro especies distintas de loros se alimentan de arcilla para neutralizar las ' +
          'toxinas de su dieta. Visita a una comunidad indígena para un almuerzo típico preparado con productos ' +
          'locales, aprendiendo cómo los nativos han vivido en la Amazonía durante milenios.',
      },
      {
        title: 'Día 4 — Regreso a Quito',
        description:
          'Desayuno temprano y salida del lodge en canoa. Llegada a Coca y traslado al aeropuerto para el ' +
          'vuelo de regreso a Quito, con llegada prevista alrededor de las 12:30 pm (sujeto a cambios).',
      },
    ],
    includes: [
      'Traslados aéreos Quito – Coca – Quito',
      'Transporte fluvial privado en el río Napo',
      'Alojamiento en Sacha Lodge en habitación doble',
      'Todas las comidas durante la estadía',
      'Guía naturalista bilingüe y guía nativo',
      'Actividades y excursiones especificadas en el programa',
    ],
    excludes: [
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas para guías y personal',
      'Lavandería y gastos personales',
    ],
  },
  {
    id: 'act4',
    name: 'Hacienda Zuleta & Mercado de Otavalo',
    duration: '3 días / 2 noches',
    difficulty: 'Fácil',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Hacienda histórica',
    accent: '#8B4513',
    region: 'Andes',
    activities: ['Hiking', 'Birdwatching', 'Ciclismo', 'Cabalgata', 'Cocina tradicional'],
    highlights: [
      'Hospedaje en hacienda histórica del siglo XVII',
      'Valle de los cóndores — programa de reproducción',
      'Comunidad indígena y taller de bordado',
    ],
    overview:
      'La Hacienda Zuleta es una de las haciendas históricas más magníficas de Ecuador. Este hotel y granja en ' +
      'funcionamiento del siglo XVII perteneció a un antiguo presidente de Ecuador, Galo Plaza Lasso, y su ' +
      'familia. Con la calidez y los lazos comunitarios que la caracterizan, Zuleta combina naturaleza salvaje, ' +
      'habitaciones antiguas llenas de historia, exquisita cocina andina casera y una gran variedad de ' +
      'actividades: cabalgatas por lagunas de montaña, senderos con siglos de historia a pie o en bicicleta, el ' +
      'centro Cóndor Huasi de especies en peligro, y hasta clases de cocina o bordado local.',
    itinerary: [
      {
        title: 'Día 1 — Quito · Mercado de Otavalo · Hacienda Zuleta',
        description:
          'Salida desde tu hotel hacia el norte, dos horas hasta Otavalo, para visitar su famoso mercado ' +
          'indígena, uno de los más grandes y coloridos de Ecuador — los sábados es día de mercado grande, ' +
          'aunque hay un mercado permanente de artesanías todos los días. Por la tarde, traslado a Zuleta, donde ' +
          'al llegar recorrerás la casa de hacienda y conocerás su historia.',
      },
      {
        title: 'Día 2 — Hacienda Zuleta · Valle de los Cóndores',
        description:
          'Después del desayuno, salida al Valle de los Cóndores, parte de la propiedad de Zuleta, a pie, a ' +
          'caballo o en bicicleta. La hacienda mantiene un importante programa de cría en cautiverio de cóndores ' +
          'para reproducir esta especie en peligro, y es muy probable ver cóndores silvestres volando bajo sobre ' +
          'el valle. El guía también buscará osos andinos alimentándose de bromelias en las laderas cercanas. El ' +
          'valle alberga además pirámides y sitios funerarios preincaicos de la cultura Caranqui (siglos VIII–XIII). ' +
          'Por la tarde, visita a la comunidad indígena de Zuleta, célebre por su bordado, y a la biblioteca ' +
          'comunitaria apoyada por la hacienda.',
      },
      {
        title: 'Día 3 — Hacienda Zuleta · Regreso a Quito',
        description:
          'Después del desayuno, actividades a elección según tus intereses, aprovechando la extensa red de ' +
          'senderos de la propiedad — algunos escénicos, otros culturales o enfocados en fauna y flora. Tras el ' +
          'almuerzo, visita al huerto orgánico donde se cultivan los vegetales que has disfrutado durante tu ' +
          'estadía. Regreso a Quito (aproximadamente 2h30).',
      },
    ],
    includes: [
      'Alojamiento en la Hacienda Zuleta en habitación doble',
      'Todas las comidas durante la estadía',
      'Guía bilingüe',
      'Transporte privado Quito – Zuleta – Quito',
      'Entrada al mercado de Otavalo y actividades del programa',
    ],
    excludes: [
      'Bebidas alcohólicas y no alcohólicas',
      'Actividades opcionales no especificadas (cabalgatas extra, clases de cocina o bordado)',
      'Propinas y gastos personales',
    ],
  },
  {
    id: 'and2',
    name: 'Volcán Antisana Full Day',
    duration: '1 día',
    difficulty: 'Moderado',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Birdwatching',
    accent: '#4a6fa5',
    region: 'Andes',
    activities: ['Hiking', 'Birdwatching', 'Fotografía'],
    highlights: [
      'Mayor población de cóndores andinos del país',
      'Laguna La Mica y aves acuáticas altoandinas',
      'Vistas del Antisana, 5.753m',
    ],
    overview:
      'Los páramos de la Reserva Antisana están considerados entre los mejor conservados de Ecuador, con la ' +
      'mayor población de cóndores del país y buenas poblaciones de otras especies amenazadas como el puma, el ' +
      'venado de páramo y el lobo de páramo. Los pastizales altoandinos, que a primera vista parecen casi sin ' +
      'vida, esconden una sorprendente variedad de aves únicas: gaviotas andinas, el amenazado ibis andino, ' +
      'caracaras carunculados, cinclodes, avefrías andinas, varias especies de rapaces y el endémico colibrí ' +
      'estrella ecuatoriano, que vive exclusivamente en altura.',
    itinerary: [
      {
        title: 'Salida desde Quito',
        description:
          'Salida temprano desde tu hotel. Aproximadamente 1 h (45 km) de trayecto hasta entrar al valle que ' +
          'conduce a la meseta alta.',
      },
      {
        title: 'Mirador de cóndores',
        description:
          'Parada en un mirador para observar los acantilados donde anidan y descansan los cóndores andinos, ' +
          'y con algo de suerte, osos andinos alimentándose en la vegetación de altura. Buen lugar para colibríes ' +
          'y otras especies características de los altos Andes.',
      },
      {
        title: 'Paso a 4.100 m y vistas del Antisana',
        description:
          'Continuación hasta un paso a 4.100 m (13.500 ft) de altura desde donde, si el clima acompaña, se ' +
          'aprecian las primeras vistas espectaculares del volcán Antisana (5.753 m / 18.875 ft), la cuarta ' +
          'montaña más alta de Ecuador y una de las más remotas y difíciles de escalar.',
      },
      {
        title: 'Laguna La Mica',
        description:
          'Varias paradas para observar fauna hasta llegar a la laguna La Mica, la más grande de la zona y ' +
          'hogar de numerosas aves acuáticas. Caminata para observar cerceta andina y piquiamarilla, focha ' +
          'andina y la mayor población reproductora de zambullidor plateado.',
      },
      {
        title: 'Almuerzo y regreso',
        description:
          'Almuerzo en un restaurante local con especialidades preparadas con productos de la zona. Por la ' +
          'tarde, regreso a Quito.',
      },
    ],
    includes: [
      'Transporte privado desde tu hotel en Quito',
      'Guía naturalista bilingüe especializado en aves',
      'Entrada a la Reserva Antisana',
      'Almuerzo en restaurante local',
    ],
    excludes: [
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas para guía y conductor',
      'Gastos personales',
    ],
  },
  {
    id: 'ant4',
    groupSize: 'Grupo reducido: 8 viajeros',
    name: 'Joyas del Chocó — Mindo Birding',
    duration: '3 días / 2 noches',
    difficulty: 'Fácil',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Birdwatching',
    accent: '#4a6fa5',
    region: 'Andes',
    activities: ['Birdwatching', 'Hiking', 'Fotografía'],
    highlights: [
      'Mayor diversidad de colibríes de América',
      'Antpittas de Ángel Paz y Cock-of-the-rock',
      'Reservas Yanacocha, Milpe y Sachatamia',
    ],
    overview:
      'Este programa te permite explorar uno de los ecosistemas más biodiversos del mundo: los bosques ' +
      'húmedos del Chocó ecuatoriano. El Chocó se extiende por las estribaciones del Pacífico de los Andes, ' +
      'abarcando el noroccidente de Ecuador y el occidente de Colombia — una extensa zona con algunos de los ' +
      'bosques tropicales más húmedos del mundo, hogar de una gran variedad de aves, orquídeas y bromelias que ' +
      'no se encuentran en ningún otro lugar de América.',
    itinerary: [
      {
        title: 'Día 1 — Yanacocha · Nono · Mindo',
        description:
          'Recogida en tu hotel a las 6 am. Salida hacia el noroccidente, comenzando en la Reserva Yanacocha ' +
          '(3.200 m), bosque altoandino con hasta 12 especies de colibríes y tangaras de montaña, con vistas ' +
          'espectaculares de los Andes. Continuación con almuerzo tipo picnic en ruta, cubriendo un amplio rango ' +
          'de altitudes, con parada de observación en la vieja carretera a Mindo, hasta llegar por la tarde al ' +
          'lodge y reserva Sachatamia (1.607 m) para el descanso.',
      },
      {
        title: 'Día 2 — Antpittas de Ángel Paz y el camino a Tandayapa',
        description:
          'Visita a la famosa reserva de antpittas de Ángel Paz (1.900 m), donde hace veinte años Ángel ' +
          'revolucionó la observación de aves al conseguir que hasta 5 especies distintas de antpittas ' +
          '(Gigante, Bigotuda, Pechiamarilla, Coroninegra y Ocrácea) respondan a su voz. La reserva también ' +
          'permite ver otras especies difíciles como el Gallo de la Peña, quetzales, tucanetes y motmots. ' +
          'Almuerzo en Bellavista y tarde de observación en el valle de Tandayapa, buscando especialistas del ' +
          'bosque nuboso como el Tapaculo Ocelado, la Tangara Filuda y el Barbudo Cabecipúrpura.',
      },
      {
        title: 'Día 3 — Reserva Milpe · Sachatamia · Regreso a Quito',
        description:
          'Desayuno temprano y corto trayecto (30 min) hasta la Reserva Milpe (1.100 m), zona de piedemonte ' +
          'con especialidades del Chocó como motmots, quetzales, trogones, hasta 20 especies de tangaras, 25 de ' +
          'colibríes, tucanes, loros, hormigueros y papamoscas, además del Saltarín Alicastaño y el ' +
          'Alidorado. Regreso a Sachatamia para el almuerzo y última sesión de observación antes de volver a ' +
          'Quito.',
      },
    ],
    includes: [
      'Transporte privado durante todo el programa',
      'Guía de observación de aves de habla inglesa',
      'Comidas especificadas en el programa (desayuno, almuerzo, box lunch, cena)',
      'Entradas a las reservas incluidas en el programa (Yanacocha, Ángel Paz, Milpe, San Tadeo, Bellavista)',
      'Alojamiento en habitación doble',
    ],
    excludes: [
      'Entradas a otras reservas privadas no especificadas en el programa',
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas para guía y conductor',
      'Lavandería y otros gastos personales',
    ],
  },
  {
    id: 'ant5',
    groupSize: 'Programa privado para 2',
    name: 'Mindo Birding Privado',
    duration: '2 días / 1 noche',
    difficulty: 'Fácil',
    price: 'Consultar',
    // TODO(precio): priceFrom: 'X.XXX €',  ← rellenar con cifra real
    badge: 'Grupo privado',
    accent: '#4a6fa5',
    region: 'Andes',
    activities: ['Birdwatching', 'Hiking', 'Fotografía'],
    highlights: [
      'Programa privado para 2 personas',
      'Reservas Zuroloma, Guaycapi y Sachatamia',
      'Comederos de colibríes y tangaras',
    ],
    overview:
      'Programa privado para dos personas que te permite explorar uno de los ecosistemas más biodiversos del ' +
      'mundo: los bosques húmedos de la región del Chocó. El Chocó se extiende por las estribaciones del ' +
      'Pacífico de los Andes, abarcando el noroccidente de Ecuador y el occidente de Colombia, con algunos de ' +
      'los bosques tropicales más húmedos del planeta y una gran variedad de aves, orquídeas y bromelias que no ' +
      'se encuentran en ningún otro lugar de América.',
    itinerary: [
      {
        title: 'Día 1 — Zuroloma · Guaycapi · Bosque nuboso de Mindo',
        description:
          'Recogida temprano en tu hotel para iniciar el trayecto desde Quito, con primera parada en la ' +
          'Reserva Zuroloma (3.200 m), a 1h15 de la capital — una pequeña reserva privada excelente para ver y ' +
          'fotografiar colibríes, antpittas y tangaras en sus comederos, con una corta caminata por el bosque ' +
          'altoandino. Continuación hacia Mindo con parada en Guaycapi Lodge (1.920 m) para el almuerzo y tarde ' +
          'de observación en su reserva, un bosque nuboso más bajo y tropical con especies muy distintas como ' +
          'barbudos, tucanetes, tangaras, antpittas y hasta veinte especies de colibríes. Por la tarde, ' +
          'continuación al lodge Sachatamia (1.676 m) para pasar la noche.',
      },
      {
        title: 'Día 2 — Observación en la Reserva Sachatamia',
        description:
          'Madrugada para observar la trampa de polillas, donde numerosas aves se congregan al amanecer para ' +
          'alimentarse de insectos atraídos por la luz — excelente para reinitas, papamoscas, motmots y ' +
          'carpinteros. Después del desayuno, observación en los comederos de tangaras y colibríes y recorrido ' +
          'por los senderos de las 300 acres de la reserva Sachatamia. Almuerzo y salida de regreso a Quito, con ' +
          'parada en el restaurante Guaycapi (1.676 m) para revisar sus comederos antes de volver a la ciudad.',
      },
    ],
    includes: [
      'Transporte privado durante todo el programa',
      'Guía de observación de aves bilingüe',
      'Comidas especificadas en el programa',
      'Entradas a las reservas Zuroloma, Guaycapi y Sachatamia',
      'Alojamiento en Sachatamia Lodge',
    ],
    excludes: [
      'Entradas a otras reservas privadas no especificadas en el programa',
      'Bebidas alcohólicas y no alcohólicas',
      'Propinas para guía y conductor',
      'Gastos personales',
    ],
  },
]

const FEATURED_IDS = ['c3', 't3', 'at3']

/** Selección destacada para la landing — Sacha Lodge + los dos tours de Galápagos. */
export const FEATURED_HOME_TOURS: Tour[] = FEATURED_IDS
  .map((id) => HOME_TOURS.find((tour) => tour.id === id))
  .filter((tour): tour is Tour => Boolean(tour))
