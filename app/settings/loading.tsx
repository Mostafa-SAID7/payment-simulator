import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-4 pb-6" role="status" aria-label="Loading settings">
      <span className="sr-only">Loading settings</span>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6"><div className="flex items-center gap-5"><Skeleton className="size-16 rounded-2xl" /><div className="flex-1 space-y-2"><Skeleton className="h-5 w-48" /><Skeleton className="h-3 w-64" /><Skeleton className="h-3 w-80" /></div><Skeleton className="h-8 w-28 rounded-lg" /></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/50 pt-5 sm:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2.5"><Skeleton className="size-8 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-12" /><Skeleton className="h-2.5 w-20" /></div></div>)}</div></div>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card"><div className="flex items-center gap-3 border-b border-border/50 px-5 py-5"><Skeleton className="size-9 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-36" /><Skeleton className="h-2.5 w-56" /></div></div><Skeleton className="mx-5 mt-5 h-16 rounded-xl" /><div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-9 w-full rounded-lg" /></div>)}</div></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{[0, 1].map((card) => <div key={card} className="rounded-2xl border border-border/60 bg-card p-5"><div className="flex items-center gap-3 border-b border-border/50 pb-4"><Skeleton className="size-9 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-2.5 w-44" /></div></div><div className="mt-5 space-y-4">{[0, 1, 2].map((row) => <div key={row} className="flex items-center justify-between"><div className="space-y-2"><Skeleton className="h-3 w-36" /><Skeleton className="h-2.5 w-44" /></div><Skeleton className="h-7 w-16 rounded-lg" /></div>)}</div></div>)}</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Skeleton className="h-72 rounded-2xl" /><Skeleton className="h-72 rounded-2xl" /></div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}
