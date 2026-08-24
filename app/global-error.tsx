'use client'

import { ErrorFallback } from '@/components/error-fallback'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return <ErrorFallback error={error} global />
}
