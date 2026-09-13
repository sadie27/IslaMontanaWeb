'use client'

import dynamic from 'next/dynamic'

const ErrorPageClient = dynamic(
  () => import('@/components/ui/ErrorPageClient'),
  { ssr: false }
)

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      {/* error.tsx es obligatoriamente Client Component en Next.js App Router,
          por lo que no puede exportar `metadata`. React 19 sube automáticamente
          las etiquetas <title>/<meta> renderizadas en el árbol al <head>. */}
      <meta name="robots" content="noindex, nofollow" />
      <ErrorPageClient type="500" reset={reset} />
    </>
  )
}
