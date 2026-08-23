'use client';

import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        'relative isolate mt-20 min-h-screen bg-background bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent_34%),radial-gradient(circle_at_0%_100%,color-mix(in_oklch,var(--color-accent)_8%,transparent),transparent_28%),linear-gradient(135deg,var(--color-background),color-mix(in_oklch,var(--color-background)_94%,var(--color-primary)))] p-3 transition-[margin,padding] duration-300 sm:p-5 lg:p-6 lg:pr-8 max-md:ml-0 max-md:pt-20',
        isCollapsed ? 'md:ml-24' : 'md:ml-[18.5rem]'
      )}
    >
      {children}
    </main>
  );
}
