'use client';

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  CreditCard,
  History,
  LayoutDashboard,
  LogOut,
  Search,
  Send,
  Settings,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/sidebar-context';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/payments', icon: Send, label: 'Payments' },
  { href: '/cards', icon: CreditCard, label: 'Cards' },
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
  const { isMobileOpen, setIsMobileOpen } = useSidebar();

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
        data-mobile-open={isMobileOpen}
        className={cn(
          'mobile-sidebar sidebar-shell fixed left-3 top-3 z-40 flex h-[calc(100vh-1.5rem)] w-64 flex-col overflow-y-auto rounded-2xl border border-sidebar-border/80 text-sidebar-foreground shadow-2xl transition-all duration-300 md:left-4 md:top-4 md:h-[calc(100vh-2rem)]',
          isMobileOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'
        )}
      >
        <div className="sidebar-glow" aria-hidden="true" />
        <div className="sidebar-header">
          <Link href="/" onClick={closeMobileSidebar} className="sidebar-brand" aria-label="FinPay dashboard">
            <span className="sidebar-brand-mark">F</span>
            <span className="sidebar-brand-copy">
              <span className="sidebar-brand-name">FinPay</span>
              <span className="sidebar-brand-subtitle">Simulator</span>
            </span>
          </Link>
        </div>

        <button type="button" className="sidebar-search" aria-label="Search navigation">
          <Search />
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>

        <nav aria-label="Primary navigation" className="sidebar-navigation">
          <p className="sidebar-section-label">Main menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = hydratedPathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={closeMobileSidebar}
                className={cn('sidebar-navigation-link', isActive && 'sidebar-navigation-link-active')}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-upgrade-card">
            <div className="sidebar-upgrade-icon"><Sparkles /></div>
            <div className="sidebar-upgrade-copy">
              <p>Activate Super</p>
              <span>Unlock more features</span>
            </div>
            <ArrowUpRight className="sidebar-upgrade-arrow" />
          </div>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = hydratedPathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={closeMobileSidebar}
                className={cn('sidebar-navigation-link', isActive && 'sidebar-navigation-link-active')}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            title="Logout"
            aria-label="Log out"
            onClick={() => console.log('Logout clicked')}
            className="sidebar-navigation-link sidebar-logout"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
