'use client'

import dynamic from 'next/dynamic'

const ErrorPageClient = dynamic(
  () => import('@/components/ui/ErrorPageClient'),
  { ssr: false }
)

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <ErrorPageClient type="500" reset={reset} />
}
