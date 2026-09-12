import type { TeamMember, CompanyValue } from '@/lib/types'
import { ASSETS } from '@/config/assets'

export const ABOUT_HISTORY = {
  eyebrow: 'Nuestra historia',
  title: 'Nacimos para mostrar el Ecuador que nosotros mismos amamos.',
  body: 'Luis llegó desde España para trabajar como guía naturalista en Galápagos y ya nunca pudo dejar las islas. Años más tarde unió fuerzas con Irene, que llevaba toda su carrera organizando y operando grupos por Ecuador, y juntos fundaron Islamontana Travel. Desde entonces seguimos guiando viajeros por Galápagos, la Amazonía y los Andes, siempre con el mismo criterio: experiencias auténticas, respeto por el entorno y atención cercana en cada detalle del viaje.',
  milestone: {
    value: '+20',
    label: 'años guiando viajes por Ecuador',
  },
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Irene Morejón',
    role: 'Gerente General',
    photo: ASSETS.TEAM.IRENE,
    placeholderBg: '#3aa023',
    bio: 'Es la Gerente General y verdadera alma de Islamontana Travel. Con una licenciatura en Turismo y otra en Marketing, comenzó a trabajar en empresas turísticas desde muy joven y lleva más de 30 años organizando y operando grupos a todos los destinos de Ecuador. Sigue siendo la persona que supervisa y se ocupa personalmente de los detalles para que la experiencia de nuestros clientes sea excelente.',
  },
  {
    name: 'Luis Die',
    role: 'Cofundador y guía naturalista',
    photo: ASSETS.TEAM.LUIS,
    placeholderBg: '#1a3a18',
    bio: 'Llegó desde España a trabajar en las Galápagos como guía naturalista hace 40 años y ya nunca pudo dejar las islas. Es Biólogo, con una maestría en Ecología, y quedó maravillado con la naturaleza y los paisajes de las islas Galápagos. Uniendo fortalezas junto a Irene, fundaron Islamontana Travel hace más de 20 años y, desde entonces, sigue guiando nuestros grupos y demostrando su pasión por la naturaleza de este país megadiverso.',
  },
  {
    name: 'Kleber Cisneros',
    role: 'Coordinador de operaciones',
    photo: ASSETS.TEAM.KLEBER,
    placeholderBg: '#6b7560',
    bio: 'Es la mano derecha de Irene y se encarga de los detalles operativos, asegurándose de que nuestros viajes discurran sin contratiempos. Detallista e incansable, siempre está pendiente de que todo esté listo desde el día que nuestros viajeros llegan a Ecuador hasta el momento en que regresan a su país.',
  },
]

export const COMPANY_VALUES: CompanyValue[] = [
  {
    icon: 'leaf',
    title: 'Turismo responsable',
    desc: 'Operamos con guías locales certificados y priorizamos actividades de bajo impacto ambiental.',
  },
  {
    icon: 'compass',
    title: 'Experiencia real',
    desc: 'Diseñamos cada ruta desde el conocimiento directo del terreno, no desde un catálogo genérico.',
  },
  {
    icon: 'users',
    title: 'Atención cercana',
    desc: 'Acompañamos al viajero antes, durante y después del viaje — sin intermediarios anónimos.',
  },
  {
    icon: 'shield',
    title: 'Seguridad primero',
    desc: 'Protocolos claros y guías certificados en cada actividad, especialmente en trekking y navegación.',
  },
]
