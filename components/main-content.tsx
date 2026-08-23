'use client';

import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        'app-main-content mt-20 min-h-screen bg-background p-3 transition-all duration-300 sm:p-5 lg:p-6 lg:pr-8',
        isCollapsed ? 'ml-20' : 'ml-64'
      )}
    >
      {children}
    </main>
  );
}
