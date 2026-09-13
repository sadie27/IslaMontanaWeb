import type { ImageLoaderProps } from 'next/image'
import imageVariants from '@/config/image-variants.json'

/**
 * Loader personalizado para next/image en este export estático.
 *
 * Por qué existe: `output: 'export'` no tiene servidor que redimensione
 * imágenes bajo demanda, así que este loader debe resolver `width` a un
 * fichero que YA existe en disco. Las variantes se generan en build con
 * `npm run generate:image-variants` (ver scripts/generate-image-variants.mjs)
 * y quedan registradas en src/config/image-variants.json como
 * { "<src original>": { "<ancho>": "<src de la variante>" } }.
 *
 * Si `src` no tiene entrada en el manifiesto (imagen sin procesar, logo,
 * SVG, URL externa) se hace passthrough al comportamiento anterior: se
 * devuelve la imagen original con el basePath — nunca se rompe una imagen
 * por falta de variantes.
 */
const VARIANTS: Record<string, Record<string, string>> = imageVariants

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  // OJO: en dev, `base` es '' y TODO string empieza con '' — el segundo
  // check solo tiene sentido cuando `base` no está vacío (producción).
  if (src.startsWith('http') || (base !== '' && src.startsWith(base))) return src

  const variantsForSrc = VARIANTS[src]
  if (variantsForSrc) {
    const availableWidths = Object.keys(variantsForSrc)
      .map(Number)
      .sort((a, b) => a - b)

    // La variante más pequeña que sea igual o mayor al ancho pedido —
    // nunca servir algo más pequeño de lo que next/image necesita.
    const chosenWidth = availableWidths.find((w) => w >= width) ?? availableWidths[availableWidths.length - 1]

    if (chosenWidth !== undefined) {
      return `${base}${variantsForSrc[chosenWidth]}`
    }
  }

  return `${base}${src}`
}
