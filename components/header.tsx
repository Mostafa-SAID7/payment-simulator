'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationCenter } from '@/components/notification-center';
import { useNotifications } from '@/hooks/use-notifications';
import { useEffect } from 'react';

export function Header() {
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
    <header className="fixed right-0 top-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-border bg-background px-6">
      <div className="text-sm text-muted-foreground">
        Welcome back, Administrator
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

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
