'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, Clipboard, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ErrorFallbackProps = {
  error: Error & { digest?: string }
  reset?: () => void
  global?: boolean
}

export function ErrorFallback({ error, reset, global = false }: ErrorFallbackProps) {
  const [copied, setCopied] = useState(false)
  const reference = error.digest || 'FINPAY-UNSPECIFIED'
  const report = `FinPay error reference: ${reference}`

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  const content = (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground" aria-labelledby="error-title">
      <div className="sr-only" aria-live="assertive">FinPay encountered an error. Recovery options are available below.</div>
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8" role="alert">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive" aria-hidden="true">
            <AlertTriangle className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">FinPay recovery</p>
            <h1 id="error-title" className="mt-2 text-balance text-2xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">This page could not finish loading. Your workspace is safe. Try again or return to the dashboard.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {reset ? <Button type="button" onClick={reset}><RefreshCw data-icon="inline-start" />Try again</Button> : null}
          <Button asChild variant="outline"><Link href="/"><Home data-icon="inline-start" />Dashboard</Link></Button>
          <Button type="button" variant="ghost" onClick={copyReport} aria-label="Copy error reference"><Clipboard data-icon="inline-start" />{copied ? 'Copied' : 'Copy report'}</Button>
        </div>
        <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-muted-foreground" aria-live="polite">Reference: {reference}{global ? ' · Root recovery' : ''}</p>
      </section>
    </main>
  )

  return global ? <html lang="en"><body>{content}</body></html> : content
}
