'use client';

import { User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from '@/components/notification-center';
import { useNotifications } from '@/hooks/use-notifications';
import { useSidebar } from '@/contexts/sidebar-context';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isCollapsed } = useSidebar();
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
      className="fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-6 transition-all duration-300"
      style={{ width: isCollapsed ? 'calc(100% - 5rem)' : 'calc(100% - 16rem)' }}
    >
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search transactions, accounts, batches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 border-0 bg-muted/50 placeholder:text-muted-foreground focus-visible:ring-1"
        />
      </div>

      <div className="flex items-center gap-4">
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
