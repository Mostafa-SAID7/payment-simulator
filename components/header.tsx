'use client';

import { Menu, Moon, Sun, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationCenter } from '@/components/notification-center';
import { useNotifications } from '@/hooks/use-notifications';
import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/payments': 'Payments',
  '/cards': 'Cards',
  '/transactions': 'Transactions',
  '/taxes': 'Taxes',
  '/users': 'Users',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { isCollapsed, setIsMobileOpen } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    addNotification,
  } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'success',
        'Payment Processed',
        'Payment to Acme Corporation has been successfully completed.'
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <header
      className={cn(
        'fixed z-30 flex h-20 items-center justify-between px-4 transition-all duration-300 md:px-6 lg:px-8 md:top-0 left-0 right-0 top-0 md:left-auto',
        isCollapsed ? 'md:w-[calc(100%-6rem)]' : 'md:w-[calc(100%-18.5rem)]'
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background/75 backdrop-blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
      </div>

      <div className="relative flex items-center min-w-0 gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden flex border border-border/50 rounded-full shrink-0 bg-secondary/60 hover:bg-secondary shadow-sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight">
            {pageTitles[pathname] ?? 'FinPay'}
          </h1>
          <p className="text-[10px] text-muted-foreground hidden sm:block leading-none mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="relative flex items-center shrink-0 gap-2">
        <div className="flex items-center gap-0.5 bg-secondary/70 rounded-full p-1 border border-border/50 shadow-[var(--shadow-xs)] backdrop-blur-sm">
          <button
            type="button"
            aria-label="Switch to dark mode"
            disabled={!isMounted}
            onClick={() => setTheme('dark')}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 [&_svg]:w-3.5 [&_svg]:h-3.5',
              resolvedTheme === 'dark'
                ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
            )}
          >
            <Moon />
          </button>
          <button
            type="button"
            aria-label="Switch to light mode"
            disabled={!isMounted}
            onClick={() => setTheme('light')}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 [&_svg]:w-3.5 [&_svg]:h-3.5',
              resolvedTheme === 'light'
                ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
            )}
          >
            <Sun />
          </button>
        </div>

        <Link
          href="/settings"
          aria-label="Open settings"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary/70 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border transition-all duration-150 [&_svg]:w-4 [&_svg]:h-4 shadow-[var(--shadow-xs)]"
        >
          <Settings />
        </Link>

        <div className="relative">
          <NotificationCenter
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onClear={clearNotification}
            onClearAll={clearAll}
          />
        </div>

        <Link
          href="/profile"
          aria-label="Open profile"
          className="ml-0.5 w-9 h-9 rounded-full overflow-hidden border-2 border-border/60 hover:border-primary/60 transition-all duration-200 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-primary)]"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/90 via-primary to-accent/80 flex items-center justify-center text-primary-foreground font-bold text-xs">
            JD
          </div>
        </Link>
      </div>
    </header>
  );
}
