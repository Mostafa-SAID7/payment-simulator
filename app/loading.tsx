import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-w-0 flex-col gap-4 pb-6" role="status" aria-label="Loading page">
      <span className="sr-only">Loading page</span>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6"><div className="flex items-center gap-4"><Skeleton className="size-16 rounded-2xl" /><div className="space-y-2"><Skeleton className="h-5 w-44" /><Skeleton className="h-3 w-64" /></div></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/50 pt-5 sm:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2.5"><Skeleton className="size-8 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-12" /><Skeleton className="h-2.5 w-20" /></div></div>)}</div></div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3"><Skeleton className="h-80 rounded-2xl lg:col-span-2" /><Skeleton className="h-80 rounded-2xl" /></section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2"><Skeleton className="h-64 rounded-2xl" /><Skeleton className="h-64 rounded-2xl" /></section>
      <Skeleton className="h-56 rounded-2xl" />
    </div>
  );
}
