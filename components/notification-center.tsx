'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  Trash2,
  Check,
} from 'lucide-react';
import { Notification } from '@/hooks/use-notifications';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface NotificationCenterProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-success" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-info" />;
  }
}

export function NotificationCenter({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClearAll,
}: NotificationCenterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayNotifications = notifications.slice(0, 10);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="header-notification-button"
      >
        <Bell />
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="header-notification-wrapper">
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            className="header-notification-button"
          >
            <Bell />
          </Button>
        </PopoverTrigger>
        {unreadCount > 0 && (
          <span className="header-notification-count">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {displayNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="divide-y divide-border pr-4">
              {displayNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'flex gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer',
                    !notification.read && 'bg-secondary/30'
                  )}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex-shrink-0 pt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {format(notification.timestamp, 'HH:mm')}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 h-2 w-2 bg-primary rounded-full mt-1" />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClear(notification.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {displayNotifications.length > 0 && (
          <div className="border-t border-border px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={onClearAll}
            >
              Clear all
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
