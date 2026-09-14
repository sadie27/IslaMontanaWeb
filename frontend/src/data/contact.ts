import { DESTINATIONS } from '@/data/destinations'

export const CONTACT_DESTINATION_OPTIONS = [
  { value: '', label: 'Selecciona un destino' },
  ...DESTINATIONS.map((d) => ({ value: d.slug, label: d.name })),
  { value: 'otro', label: 'Aún no lo tengo claro — aconsejadme' },
]
