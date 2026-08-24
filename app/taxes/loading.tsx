import { Skeleton } from '@/components/ui/skeleton';

export default function TaxesLoading() {
  return (
    <div className="flex min-w-0 flex-col gap-5 pb-6" role="status" aria-label="Loading tax documents">
      <span className="sr-only">Loading tax documents</span>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading tax metrics">{[0, 1, 2].map((item) => <div key={item} className="flex items-center gap-4 rounded-xl border border-border/70 bg-card px-5 py-4"><Skeleton className="size-10 shrink-0 rounded-xl" /><div className="space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-6 w-32" /></div></div>)}</section>
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card"><div className="flex items-center justify-between gap-3 px-6 pb-3 pt-6"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-24 rounded-md" /></div><div className="overflow-hidden px-4"><div className="flex min-w-[640px] items-center gap-8 border-b border-border/60 py-3"><Skeleton className="h-3 w-24" /><Skeleton className="h-3 w-16" /><Skeleton className="h-3 w-16" /><Skeleton className="h-3 w-12" /><Skeleton className="h-3 w-16" /><Skeleton className="h-3 w-16" /></div>{[0, 1, 2, 3].map((item) => <div key={item} className="flex min-w-[640px] items-center gap-8 border-b border-border/40 py-4 last:border-0"><div className="flex w-32 items-center gap-3"><Skeleton className="size-8 shrink-0 rounded-lg" /><Skeleton className="h-3 w-24" /></div><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-12" /><Skeleton className="h-5 w-16 rounded-full" /><div className="ml-auto flex gap-2"><Skeleton className="size-7 rounded-md" /><Skeleton className="size-7 rounded-md" /></div></div>)}</div></div>
    </div>
  );
}
