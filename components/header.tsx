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
  const [currentDate, setCurrentDate] = useState('');
  const pathname = usePathname();
  const { isCollapsed, setIsMobileOpen } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
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
        'fixed inset-x-2 top-2 z-30 isolate flex h-20 items-center justify-between overflow-hidden rounded-2xl border border-border/60 bg-background/55 px-2 shadow-[var(--shadow-lg)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:px-4 md:inset-x-auto md:right-3 md:top-3 md:px-6 lg:px-8 md:left-auto',
        isCollapsed ? 'md:left-[7rem] md:w-auto' : 'md:left-[19rem] md:w-auto'
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
      </div>

      <div className="relative flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden flex shrink-0 rounded-full border border-border/50 bg-secondary/60 shadow-sm hover:bg-secondary max-[380px]:h-7 max-[380px]:w-7"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl max-[380px]:text-base">
            {pageTitles[pathname] ?? 'FinPay'}
          </h1>
          <p className="text-[10px] text-muted-foreground hidden sm:block leading-none mt-0.5">
            {currentDate}
          </p>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-2 max-[380px]:gap-1">
        <div className="flex items-center gap-0.5 rounded-full border border-border/50 bg-secondary/70 p-1 shadow-[var(--shadow-xs)] backdrop-blur-sm max-[380px]:p-0.5">
          <button
            type="button"
            aria-label="Switch to dark mode"
            disabled={!isMounted}
            onClick={() => setTheme('dark')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 [&_svg]:h-3.5 [&_svg]:w-3.5 max-[380px]:h-7 max-[380px]:w-7',
              (isMounted && resolvedTheme === 'dark')
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
              'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 [&_svg]:h-3.5 [&_svg]:w-3.5 max-[380px]:h-7 max-[380px]:w-7',
              (isMounted && resolvedTheme === 'light')
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-secondary/70 text-muted-foreground shadow-[var(--shadow-xs)] transition-all duration-150 hover:border-border hover:bg-secondary hover:text-foreground [&_svg]:h-4 [&_svg]:w-4 max-[380px]:h-8 max-[380px]:w-8"
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
          className="ml-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-border/60 shadow-[var(--shadow-sm)] transition-all duration-200 hover:border-primary/60 hover:shadow-[var(--shadow-primary)] max-[380px]:h-8 max-[380px]:w-8"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/90 via-primary to-accent/80 flex items-center justify-center text-primary-foreground font-bold text-xs">
            JD
          </div>
        </Link>
      </div>
    </header>
  );
}
