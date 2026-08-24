'use client';

import Link from 'next/link';
import { ArrowLeft, Home, SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  };

  return (
    <section
      className="flex min-h-[calc(100vh-7rem)] items-center justify-center py-6 sm:py-10"
      aria-labelledby="not-found-title"
    >
      <div className="relative isolate w-full max-w-4xl overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 px-5 py-12 shadow-[var(--shadow-card)] backdrop-blur-md sm:px-10 sm:py-16 lg:px-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl animate-pulse"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-64 rounded-full bg-accent/10 blur-3xl animate-pulse [animation-delay:900ms]"
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="relative mb-8 flex size-36 items-center justify-center sm:size-44">
            <div
              className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_60px_color-mix(in_oklch,var(--color-primary)_18%,transparent)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-3 rounded-full border border-dashed border-primary/35 animate-[spin_14s_linear_infinite]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-7 rounded-full border border-accent/25 animate-[spin_10s_linear_infinite_reverse]"
              aria-hidden="true"
            />
            <span
              className="absolute -right-1 top-8 size-2 rounded-full bg-primary shadow-[0_0_14px_var(--color-primary)] animate-ping"
              aria-hidden="true"
            />
            <span
              className="absolute -bottom-1 left-9 size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)] animate-pulse"
              aria-hidden="true"
            />
            <div className="relative flex size-20 items-center justify-center rounded-2xl border border-border/70 bg-background/80 shadow-lg sm:size-24">
              <SearchX className="size-9 text-primary sm:size-10" strokeWidth={1.6} />
            </div>
          </div>

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Error 404
          </span>
          <h1
            id="not-found-title"
            className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            The page you are looking for may have moved, expired, or never existed. Let’s get your FinPay workspace back on track.
          </p>

          <div className="mt-8 flex w-full flex-col-reverse items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="h-10 rounded-xl border-border/70 bg-background/60 px-5 text-xs hover:border-primary/40 hover:bg-primary/5"
            >
              <ArrowLeft className="size-4" />
              Go back
            </Button>
            <Button
              asChild
              className="h-10 rounded-xl px-5 text-xs shadow-[0_8px_24px_color-mix(in_oklch,var(--color-primary)_25%,transparent)]"
            >
              <Link href="/">
                <Home className="size-4" />
                Back to dashboard
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
            <span className="h-px w-8 bg-border/70 sm:w-12" aria-hidden="true" />
            FinPay workspace
            <span className="h-px w-8 bg-border/70 sm:w-12" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
