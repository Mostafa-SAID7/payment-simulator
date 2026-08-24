import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionsLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 pb-6 md:px-8" role="status" aria-label="Loading transactions">
      <span className="sr-only">Loading transactions</span>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Loading transaction overview">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-4 rounded-[1.25rem] border border-border/70 bg-card p-5"><Skeleton className="size-10 shrink-0 rounded-xl" /><div className="space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-5 w-20" /></div></div>)}</section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]" aria-label="Loading transaction operations">
        <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-card"><div className="space-y-4 border-b border-border/60 px-6 pb-4 pt-6"><div className="flex items-center justify-between"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-24 rounded-lg" /></div><div className="flex flex-wrap gap-3"><Skeleton className="h-9 min-w-[200px] flex-1 rounded-lg" /><Skeleton className="h-9 w-28 rounded-lg" /><Skeleton className="h-9 w-28 rounded-lg" /></div></div><div className="space-y-0 px-6">{[0, 1, 2, 3, 4].map((item) => <div key={item} className="flex min-w-[700px] items-center gap-6 border-b border-border/25 py-5 last:border-0"><div className="w-32 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-2.5 w-16" /></div><div className="w-24 space-y-2"><Skeleton className="h-3 w-20" /><Skeleton className="h-2.5 w-14" /></div><Skeleton className="h-3 w-28" /><Skeleton className="h-5 w-14 rounded-md" /><Skeleton className="ml-auto h-4 w-24" /><Skeleton className="size-7 rounded-md" /></div>)}</div></div>
        <div className="h-fit rounded-[1.25rem] border border-border/70 bg-card p-6"><Skeleton className="h-4 w-32" /><Skeleton className="mt-2 h-3 w-48" /><div className="mt-7 flex items-center gap-4"><Skeleton className="size-14 rounded-2xl" /><div className="space-y-2"><Skeleton className="h-3 w-32" /><Skeleton className="h-3 w-24" /></div></div><div className="mt-6 space-y-5 border-t border-border/60 pt-5">{[0, 1, 2].map((item) => <div key={item} className="flex justify-between"><div className="space-y-2"><Skeleton className="h-3 w-20" /><Skeleton className="h-2.5 w-28" /></div><Skeleton className="h-3 w-8" /></div>)}</div></div>
      </section>
    </div>
  );
}
