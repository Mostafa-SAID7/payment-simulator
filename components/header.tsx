'use client';

'use client';

import { Menu, Moon, Sun, User } from 'lucide-react';
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
  '/batch': 'Batch Processing',
  '/accounts': 'Accounts',
  '/transactions': 'Transactions',
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

  // Simulate incoming notifications
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
        'app-header header-shell fixed right-3 top-3 z-30 flex h-16 items-center justify-between rounded-2xl border border-border/70 bg-background/90 px-4 shadow-sm backdrop-blur transition-all duration-300 sm:right-4 sm:top-4 sm:px-5',
        isCollapsed ? 'header-with-collapsed-sidebar' : 'header-with-expanded-sidebar'
      )}
    >
      <div className="header-title-group">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          onClick={() => setIsMobileOpen(true)}
          className="mobile-menu-trigger shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <p className="header-page-title">{pageTitles[pathname] ?? 'FinPay'}</p>
      </div>

      <div className="header-actions">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            !isMounted || resolvedTheme !== 'dark'
              ? 'Switch to dark mode'
              : 'Switch to light mode'
          }
          title={
            !isMounted || resolvedTheme !== 'dark'
              ? 'Switch to dark mode'
              : 'Switch to light mode'
          }
          disabled={!isMounted}
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="theme-toggle"
        >
          {!isMounted || resolvedTheme !== 'dark' ? <Moon /> : <Sun />}
        </Button>
        <NotificationCenter
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClear={clearNotification}
          onClearAll={clearAll}
        />

        <Link href="/profile" aria-label="Open profile" className="header-profile-link">
          <Button variant="ghost" size="icon" className="header-profile-button">
            <User />
          </Button>
        </Link>
      </div>
    </header>
  );
}
