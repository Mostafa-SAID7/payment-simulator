import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-3 pb-4" role="status" aria-label="Loading settings">
      <span className="sr-only">Loading settings</span>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[4.5rem_minmax(0,1fr)]"><div className="hidden rounded-xl border border-border/70 bg-card p-3 lg:block"><Skeleton className="mx-auto size-7 rounded-lg" /><div className="mt-6 space-y-3">{[0, 1, 2, 3, 4, 5, 6].map((item) => <Skeleton key={item} className="mx-auto size-7 rounded-lg" />)}</div></div><div className="flex flex-col gap-3"><div className="rounded-xl border border-border/70 bg-card p-4"><div className="flex items-center gap-3 border-b border-border/60 pb-3"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-2.5 w-52" /></div></div><Skeleton className="mt-5 h-12 w-full rounded-lg" /><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="space-y-2"><Skeleton className="h-2.5 w-20" /><Skeleton className="h-8 w-full rounded-md" /></div>)}</div></div>{[0, 1, 2, 3].map((section) => <div key={section} className="rounded-xl border border-border/70 bg-card p-4"><div className="flex items-center gap-3 border-b border-border/60 pb-3"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-2.5 w-48" /></div></div><div className="mt-5 space-y-4">{[0, 1, 2].map((row) => <div key={row} className="flex items-center justify-between"><div className="space-y-2"><Skeleton className="h-3 w-36" /><Skeleton className="h-2.5 w-48" /></div><Skeleton className="h-8 w-20 rounded-md" /></div>)}</div></div>)}</div></div>
    </div>
  );
}
