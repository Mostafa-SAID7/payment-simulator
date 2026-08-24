import { Skeleton } from '@/components/ui/skeleton';

export default function UsersLoading() {
  return (
    <div className="flex flex-col gap-3 pb-4" role="status" aria-label="Loading users">
      <span className="sr-only">Loading users</span>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading user metrics">{[0, 1, 2].map((item) => <div key={item} className="flex items-center gap-4 rounded-xl border border-border/70 bg-card px-5 py-4"><Skeleton className="size-10 shrink-0 rounded-xl" /><div className="space-y-2"><Skeleton className="h-3 w-20" /><Skeleton className="h-6 w-16" /></div></div>)}</section>
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card"><div className="flex items-center justify-between px-6 pb-3 pt-6"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-24 rounded-md" /></div><div className="space-y-0 px-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex min-w-[560px] items-center gap-6 border-b border-border/40 py-4 last:border-0"><div className="flex w-52 items-center gap-2"><Skeleton className="size-8 rounded-full" /><div className="space-y-2"><Skeleton className="h-3 w-28" /><Skeleton className="h-2.5 w-36" /></div></div><Skeleton className="h-5 w-14 rounded-full" /><Skeleton className="h-5 w-16 rounded-full" /><Skeleton className="h-3 w-16" /><Skeleton className="ml-auto size-7 rounded-md" /></div>)}</div></div>
    </div>
  );
}
