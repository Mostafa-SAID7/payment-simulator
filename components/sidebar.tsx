'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Send,
  Upload,
  Users,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/sidebar-context';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/payments', icon: Send, label: 'Payments' },
  { href: '/batch', icon: Upload, label: 'Batch Processing' },
  { href: '/accounts', icon: Users, label: 'Accounts' },
  { href: '/transactions', icon: History, label: 'Transactions' },
];

const bottomItems = [
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hydratedPathname, setHydratedPathname] = useState<string | null>(null);
  const {
    isCollapsed,
    setIsCollapsed,
    isMobileOpen,
    setIsMobileOpen,
  } = useSidebar();

  useEffect(() => {
    setHydratedPathname(pathname);
  }, [pathname]);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileSidebar}
          className="mobile-sidebar-overlay"
        />
      )}
      <aside
        data-collapsed={isCollapsed}
        data-mobile-open={isMobileOpen}
        className={cn(
          'mobile-sidebar fixed left-0 top-0 z-40 flex h-screen flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <span className="text-lg font-bold text-sidebar-primary-foreground">F</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold">FinPay</h1>
              <p className="text-xs text-sidebar-foreground/60">Simulator</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="text-lg font-bold text-sidebar-primary-foreground">F</span>
          </div>
        )}
        <button
          type="button"
          aria-label={isMobileOpen ? 'Close navigation menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => {
            if (isMobileOpen) {
              closeMobileSidebar();
              return;
            }
            setIsCollapsed(!isCollapsed);
          }}
          aria-expanded={isMobileOpen || !isCollapsed}
          className="rounded-lg p-1.5 hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Primary navigation" className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = hydratedPathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={closeMobileSidebar}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-primary/40 hover:text-primary-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-sidebar-border px-2 py-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = hydratedPathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={closeMobileSidebar}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-primary/40 hover:text-primary-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          type="button"
          title="Logout"
          aria-label="Log out"
          onClick={() => {
            // Handle logout
            console.log('Logout clicked');
          }}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
            'text-sidebar-foreground hover:bg-primary/40 hover:text-primary-foreground'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
