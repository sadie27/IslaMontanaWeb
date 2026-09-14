import type { TeamMember, CompanyValue } from '@/lib/types'
import { ASSETS } from '@/config/assets'

export const ABOUT_HISTORY = {
  eyebrow: 'Nuestra historia',
  title: 'Empezó con un biólogo que fue a Galápagos y no volvió.',
  body: 'Luis llegó desde España hace 40 años para trabajar como guía naturalista en las islas y ya nunca pudo dejarlas. Años después unió fuerzas con Irene, que llevaba toda su carrera operando grupos por Ecuador, y fundaron Islamontana Travel. Seguimos siendo un equipo pequeño a propósito: así podemos diseñar cada viaje uno a uno y conocer a quien viaja con nosotros antes de que se suba al avión.',
  milestone: {
    value: '40',
    label: 'años guiando en Galápagos',
  },
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Irene Morejón',
    role: 'Cofundadora y Gerente General',
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
    icon: 'users',
    title: 'Trato directo, siempre',
    desc: 'Hablas con quien diseña tu viaje, y como somos tres, no hay departamento al que pasarte ni ticket que se pierda por el camino.',
  },
  {
    icon: 'compass',
    title: 'Conocemos el terreno',
    desc: 'Recomendamos rutas y barcos que hemos pisado nosotros. Si algo no encaja contigo, te lo decimos.',
  },
  {
    icon: 'leaf',
    title: 'Turismo responsable',
    desc: 'Guías locales certificados y actividades de bajo impacto. En Galápagos, respetando siempre los cupos del Parque Nacional.',
  },
  {
    icon: 'shield',
    title: 'Seguridad primero',
    desc: 'Guías certificados en cada actividad y protocolos escritos. En el agua es donde importa de verdad.',
  },
]
