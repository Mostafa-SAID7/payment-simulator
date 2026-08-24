import { Skeleton } from '@/components/ui/skeleton';

export default function CardsLoading() {
  return (
    <div className="flex flex-col gap-6 pb-6" role="status" aria-label="Loading cards">
      <span className="sr-only">Loading cards</span>
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading saved cards">
        {[0, 1, 2, 3].map((item) => <Skeleton key={item} className="h-[180px] w-full rounded-2xl" />)}
      </section>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]" aria-label="Loading card insights">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card"><div className="flex items-center justify-between px-6 pb-3 pt-6"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-20 rounded-lg" /></div><Skeleton className="mx-4 mb-5 h-[220px] rounded-xl" /></div>
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card p-6"><div className="flex items-center justify-between"><Skeleton className="h-4 w-32" /><Skeleton className="size-8 rounded-lg" /></div><Skeleton className="mt-6 h-3 w-12" />{[0, 1, 2, 3].map((item) => <div key={item} className="mt-5 flex items-center gap-3"><Skeleton className="size-9 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-2.5 w-1/3" /></div></div>)}</div>
      </section>
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card"><div className="flex items-center justify-between border-b border-border/25 px-6 py-5"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-20 rounded-lg" /></div><div className="space-y-0 px-6">{[0, 1, 2].map((item) => <div key={item} className="flex min-w-[640px] items-center gap-6 border-b border-border/20 py-4 last:border-0"><Skeleton className="size-4 rounded" /><Skeleton className="h-3 w-8" /><Skeleton className="h-3 w-24" /><Skeleton className="h-3 w-24" /><Skeleton className="ml-auto h-4 w-24" /><Skeleton className="h-5 w-14 rounded-full" /></div>)}</div></div>
    </div>
  );
}
