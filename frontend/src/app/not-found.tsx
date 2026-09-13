import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ErrorPageClient = dynamic(
  () => import('@/components/ui/ErrorPageClient'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Página no encontrada — Islamontana Travel',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <ErrorPageClient type="404" />
}
