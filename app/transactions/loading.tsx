import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col gap-4 pb-6" role="status" aria-label="Loading transactions">
      <span className="sr-only">Loading transactions</span>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
        <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><Skeleton className="size-12 rounded-2xl" /><div className="space-y-2"><Skeleton className="h-5 w-40" /><Skeleton className="h-3 w-56" /></div></div><div className="flex gap-2"><Skeleton className="h-8 w-24 rounded-lg" /><Skeleton className="h-8 w-24 rounded-lg" /></div></div>
        <Skeleton className="mt-5 h-3 w-72" />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-4 w-12" /></div></div>)}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2"><div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex gap-2"><Skeleton className="h-8 flex-1 rounded-lg" /><Skeleton className="h-8 w-24 rounded-lg" /><Skeleton className="h-8 w-24 rounded-lg" /></div></div><div className="overflow-hidden rounded-2xl border border-border/60 bg-card"><div className="flex items-center gap-3 border-b border-border/50 px-5 py-3"><Skeleton className="size-9 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-2.5 w-44" /></div></div><div className="overflow-x-auto px-5">{[0, 1, 2, 3, 4].map((item) => <div key={item} className="flex min-w-[700px] items-center gap-6 border-b border-border/30 py-4 last:border-0"><div className="w-32 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-2.5 w-16" /></div><div className="w-24 space-y-2"><Skeleton className="h-3 w-20" /><Skeleton className="h-2.5 w-14" /></div><Skeleton className="h-3 w-28" /><Skeleton className="h-5 w-14 rounded-md" /><Skeleton className="ml-auto h-4 w-24" /><Skeleton className="size-7 rounded-md" /></div>)}</div></div></div>
        <div className="flex flex-col gap-4"><div className="rounded-2xl border border-border/60 bg-card p-5"><Skeleton className="h-4 w-32" /><Skeleton className="mt-6 size-16 rounded-full" /><div className="mt-6 space-y-4 border-t border-border/40 pt-4">{[0, 1, 2].map((item) => <div key={item} className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-1.5 w-full rounded-full" /></div>)}</div></div><Skeleton className="h-52 rounded-2xl" /><Skeleton className="h-40 rounded-2xl" /></div>
      </div>
    </div>
  );
}
