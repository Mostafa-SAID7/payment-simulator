'use client';

import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        'relative isolate mt-20 min-h-screen bg-background bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--color-primary)_8%,transparent),transparent_36%),radial-gradient(circle_at_bottom_left,color-mix(in_oklch,var(--color-accent)_5%,transparent),transparent_30%)] p-3 transition-[margin,padding] duration-300 sm:p-5 lg:p-6 lg:pr-8 max-md:ml-0 max-md:pt-20',
        isCollapsed ? 'md:ml-24' : 'md:ml-[18.5rem]'
      )}
    >
      {children}
    </main>
  );
}
