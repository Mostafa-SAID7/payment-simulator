'use client';

import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        'mt-16 transition-all duration-300 bg-background p-6',
        isCollapsed ? 'ml-20' : 'ml-64'
      )}
    >
      {children}
    </main>
  );
}
