'use client'

import { useEffect } from 'react'
import { ErrorFallback } from '@/components/error-fallback'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[v0] FinPay route error', { digest: error.digest })
  }, [error])

  return <ErrorFallback error={error} reset={reset} />
}
