import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-4 pb-6" role="status" aria-label="Loading profile">
      <span className="sr-only">Loading profile</span>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4"><div className="flex items-start gap-5"><Skeleton className="size-20 rounded-2xl" /><div className="flex-1 space-y-2"><Skeleton className="h-5 w-48" /><Skeleton className="h-3 w-56" /><Skeleton className="mt-2 h-3 w-80" /></div><div className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-6 w-28 rounded-lg" /></div></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/50 pt-5 sm:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2.5"><Skeleton className="size-8 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-12" /><Skeleton className="h-2.5 w-20" /></div></div>)}</div></div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3"><div className="rounded-2xl border border-border/60 bg-card p-5 lg:col-span-2"><div className="flex items-center gap-3 border-b border-border/50 pb-4"><Skeleton className="size-8 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-36" /><Skeleton className="h-2.5 w-56" /></div></div><div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-9 w-full rounded-lg" /></div>)}</div></div><div className="rounded-2xl border border-border/60 bg-card p-5"><div className="flex items-center gap-3"><Skeleton className="size-8 rounded-xl" /><Skeleton className="h-4 w-28" /></div><Skeleton className="mt-6 h-28 w-full rounded-xl" /><Skeleton className="mt-5 h-8 w-full rounded-lg" /></div></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Skeleton className="h-64 rounded-2xl" /><Skeleton className="h-64 rounded-2xl" /></div>
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}
