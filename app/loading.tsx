import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-w-0 flex-col gap-5 pb-6" role="status" aria-label="Loading page">
      <span className="sr-only">Loading page</span>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Skeleton className="h-56 min-w-0 rounded-[1.25rem]" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <Skeleton className="h-28 rounded-[1.25rem]" />
          <Skeleton className="h-28 rounded-[1.25rem]" />
          <Skeleton className="h-28 rounded-[1.25rem]" />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        <Skeleton className="h-[360px] rounded-[1.25rem]" />
        <Skeleton className="h-[360px] rounded-[1.25rem]" />
      </section>
      <Skeleton className="h-64 min-w-0 rounded-[1.25rem]" />
    </div>
  );
}
