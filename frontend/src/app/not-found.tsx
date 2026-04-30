import dynamic from 'next/dynamic'

const ErrorPageClient = dynamic(
  () => import('@/components/ui/ErrorPageClient'),
  { ssr: false }
)

export default function NotFound() {
  return <ErrorPageClient type="404" />
}
