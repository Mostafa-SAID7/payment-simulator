'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    type: Notification['type'],
    title: string,
    message: string
  ) => {
    const id = `notif-${Date.now()}`;
    const notification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [notification, ...prev]);

    // Show toast
    const toastType = type === 'success' ? 'success' : type === 'error' ? 'error' : 'info';
    toast[toastType](title, { description: message });

    return id;
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    unreadCount,
  };
}
