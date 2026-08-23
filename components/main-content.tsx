'use client';

import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        'ambient-glow-primary relative isolate mt-20 min-h-screen bg-background p-3 transition-[margin,padding] duration-300 sm:p-5 lg:p-6 lg:pr-8 max-md:ml-0 max-md:pt-20',
        isCollapsed ? 'md:ml-24' : 'md:ml-[18.5rem]'
      )}
    >
      {children}
    </main>
  );
}
