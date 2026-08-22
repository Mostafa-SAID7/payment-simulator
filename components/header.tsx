'use client';

import { Menu, Moon, Search, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from '@/components/notification-center';
import { useNotifications } from '@/hooks/use-notifications';
import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
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
        'fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur transition-all duration-300 sm:px-6',
        isCollapsed ? 'header-with-collapsed-sidebar' : 'header-with-expanded-sidebar'
      )}
    >
      <div className="header-search flex items-center gap-4">
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
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search transactions, accounts, batches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 min-w-0 flex-1 border-0 bg-muted/50 placeholder:text-muted-foreground focus-visible:ring-1"
        />
      </div>

      <div className="header-actions flex items-center gap-2 sm:gap-4">
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
          {!isMounted || resolvedTheme !== 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        <NotificationCenter
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClear={clearNotification}
          onClearAll={clearAll}
        />

        <Link href="/profile">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
