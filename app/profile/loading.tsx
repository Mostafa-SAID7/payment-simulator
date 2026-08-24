import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-3 pb-4" role="status" aria-label="Loading profile">
      <span className="sr-only">Loading profile</span>
      <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><Skeleton className="size-14 shrink-0 rounded-2xl" /><div className="space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-3 w-48" /><Skeleton className="h-3 w-24" /></div></div><div className="flex flex-wrap gap-5"><div className="space-y-2"><Skeleton className="h-2.5 w-16" /><Skeleton className="h-3 w-20" /></div><div className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-3 w-24" /></div><div className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-3 w-16" /></div></div></div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_16rem]"><div className="rounded-xl border border-border/70 bg-card p-4"><div className="flex items-center gap-3 border-b border-border/60 pb-3"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-3 w-32" /><Skeleton className="h-2.5 w-48" /></div></div><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">{[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-8 w-full rounded-md" /></div>)}</div></div><div className="rounded-xl border border-border/70 bg-card p-4"><Skeleton className="h-4 w-28" /><Skeleton className="mt-5 h-20 w-full rounded-lg" /><Skeleton className="mt-4 h-8 w-full rounded-md" /></div></div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{[0, 1].map((item) => <div key={item} className="rounded-xl border border-border/70 bg-card p-4"><div className="flex items-center gap-3 border-b border-border/60 pb-3"><Skeleton className="size-8 rounded-lg" /><Skeleton className="h-4 w-36" /></div><div className="mt-5 space-y-4">{[0, 1, 2].map((row) => <div key={row} className="flex items-center justify-between"><Skeleton className="h-3 w-40" /><Skeleton className="h-8 w-16 rounded-md" /></div>)}</div></div>)}</div>
    </div>
  );
}
