import type { Tour } from '@/components/home/TourCard'

export const HOME_TOURS: Tour[] = [
  {
    id: 'galapagos-esencial',
    name: 'Galápagos Esencial',
    duration: '8 días / 7 noches',
    difficulty: 'Fácil',
    price: 'desde $1.890',
    badge: 'Más reservado',
    accent: '#1a7a8a',
    region: 'Galápagos',
    highlights: [
      'Snorkel en Kicker Rock',
      'Colonia de leones marinos',
      'Guía naturalista certificado',
    ],
  },
  {
    id: 'cuyabeno-inmersivo',
    name: 'Cuyabeno Inmersivo',
    duration: '7 días / 6 noches',
    difficulty: 'Fácil',
    price: 'desde $890',
    badge: 'Auténtico',
    accent: '#2d6a1e',
    region: 'Amazonía',
    highlights: [
      'Lodge en Reserva Cuyabeno',
      'Delfines rosados del Amazonas',
      'Cielos sin contaminación lumínica',
    ],
  },
  {
    id: 'quilotoa-loop',
    name: 'Quilotoa Loop',
    duration: '4 días / 3 noches',
    difficulty: 'Moderado',
    price: 'desde $310',
    badge: 'Trekking clásico',
    accent: '#4a6fa5',
    region: 'Andes',
    highlights: [
      'Laguna volcánica esmeralda',
      'Trekking guiado 3 días',
      'Pueblos Tigua y Zumbahua',
    ],
  },
]
