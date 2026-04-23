'use client'

import ErrorPageClient from '@/components/ui/ErrorPageClient'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <ErrorPageClient type="500" reset={reset} />
}
