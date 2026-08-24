import { Skeleton } from '@/components/ui/skeleton';

function CardShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-2xl border border-border/50 bg-card ${className}`}>{children}</div>;
}

export default function PaymentsLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 pb-6 md:px-8" role="status" aria-label="Loading payments">
      <span className="sr-only">Loading payments</span>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6"><div className="flex items-center gap-4"><Skeleton className="size-14 rounded-2xl" /><div className="flex-1 space-y-2"><Skeleton className="h-5 w-32" /><Skeleton className="h-3 w-64" /><Skeleton className="h-2.5 w-80" /></div><div className="flex gap-2"><Skeleton className="h-8 w-20 rounded-lg" /><Skeleton className="h-8 w-20 rounded-lg" /></div></div><div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/50 pt-5 sm:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-4 w-12" /></div></div>)}</div></div>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" aria-label="Loading balance overview">
        <CardShell className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2"><Skeleton className="size-6 rounded-md" /><Skeleton className="h-4 w-24" /></div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3"><Skeleton className="h-11 w-52" /><Skeleton className="h-5 w-16 rounded-full" /></div>
          <div className="mt-6 flex flex-wrap gap-3"><Skeleton className="h-10 w-28 rounded-xl" /><Skeleton className="h-10 w-28 rounded-xl" /></div>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/25 pt-5 sm:grid-cols-4">
            {['w-20', 'w-20', 'w-20', 'w-20'].map((width, index) => <div key={index} className="space-y-2"><Skeleton className={`h-4 ${width}`} /><Skeleton className="h-3 w-14" /></div>)}
          </div>
        </CardShell>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[0, 1, 2].map((item) => (
            <CardShell key={item} className="flex min-h-[104px] items-center gap-4 p-4 sm:p-5">
              <Skeleton className="size-11 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 space-y-2"><Skeleton className="h-3 w-28" /><Skeleton className="h-5 w-36" /></div>
            </CardShell>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" aria-label="Loading payment analytics">
        <CardShell className="min-h-[360px]">
          <div className="flex items-center justify-between gap-3 px-4 pt-5 sm:px-6 sm:pt-6"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-20 rounded-lg" /></div>
          <div className="flex h-[300px] items-end gap-2 px-5 pb-6 pt-8 sm:px-8">{['h-1/3', 'h-2/5', 'h-1/2', 'h-3/5', 'h-2/5', 'h-4/5', 'h-3/5', 'h-2/3', 'h-4/5', 'h-3/5'].map((height, index) => <Skeleton key={index} className={`flex-1 rounded-t-md ${height}`} />)}</div>
        </CardShell>
        <CardShell className="min-h-[360px] p-5 sm:p-6">
          <div className="flex items-center justify-between"><Skeleton className="h-4 w-28" /><Skeleton className="size-4 rounded-full" /></div>
          <div className="flex items-center justify-center py-7"><Skeleton className="size-40 rounded-full border-[22px] border-accent/70 bg-transparent" /></div>
          <div className="space-y-3">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2"><Skeleton className="size-2 rounded-full" /><Skeleton className="h-3 w-24" /><Skeleton className="ml-auto h-3 w-8" /></div>)}</div>
        </CardShell>
      </section>

      <CardShell>
        <div className="flex items-center justify-between border-b border-border/25 px-4 py-5 sm:px-6"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-20 rounded-lg" /></div>
        <div className="space-y-0 px-4 sm:px-6">{[0, 1, 2].map((item) => <div key={item} className="flex min-w-[640px] items-center gap-5 border-b border-border/20 py-4 last:border-0"><Skeleton className="size-9 rounded-full" /><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-24" /><Skeleton className="ml-auto h-4 w-24" /><Skeleton className="h-5 w-14 rounded-full" /></div>)}</div>
      </CardShell>
    </div>
  );
}
