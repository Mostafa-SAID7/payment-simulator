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
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Send,
  Settings,
  Sparkles,
  Upload,
  Users,
  type LucideIcon,
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

type SidebarNavigationLinkProps = {
  item: { href: string; icon: LucideIcon; label: string };
  isActive: boolean;
  isCollapsed: boolean;
  onNavigate: () => void;
};

function SidebarNavigationLink({ item, isActive, isCollapsed, onNavigate }: SidebarNavigationLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.label : undefined}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      className={cn('sidebar-navigation-link', isActive && 'sidebar-navigation-link-active')}
    >
      <Icon />
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [hydratedPathname, setHydratedPathname] = useState<string | null>(null);
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();

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
          'mobile-sidebar sidebar-shell fixed left-3 top-3 z-40 flex h-[calc(100vh-1.5rem)] flex-col overflow-y-auto rounded-2xl border border-sidebar-border/80 text-sidebar-foreground shadow-2xl transition-all duration-300 md:left-4 md:top-4 md:h-[calc(100vh-2rem)]',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'
        )}
      >
        <div className="sidebar-glow" aria-hidden="true" />
        <div className="sidebar-header">
          <Link href="/" onClick={closeMobileSidebar} className="sidebar-brand" aria-label="FinPay dashboard">
            <span className="sidebar-brand-mark">F</span>
            {!isCollapsed && (
              <span className="sidebar-brand-copy">
                <span className="sidebar-brand-name">FinPay</span>
                <span className="sidebar-brand-subtitle">Simulator</span>
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={isMobileOpen ? 'Close navigation menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={isMobileOpen || !isCollapsed}
            onClick={() => {
              if (isMobileOpen) {
                closeMobileSidebar();
                return;
              }
              setIsCollapsed(!isCollapsed);
            }}
            className="sidebar-toggle"
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>

        {!isCollapsed && (
          <button type="button" className="sidebar-search" aria-label="Search navigation">
            <Search />
            <span>Search</span>
            <kbd>⌘ K</kbd>
          </button>
        )}

        <nav aria-label="Primary navigation" className="sidebar-navigation">
          <p className="sidebar-section-label">Main menu</p>
          {navItems.map((item) => (
            <SidebarNavigationLink
              key={item.href}
              item={item}
              isActive={hydratedPathname === item.href}
              isCollapsed={isCollapsed}
              onNavigate={closeMobileSidebar}
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          {!isCollapsed && <div className="sidebar-upgrade-card">
            <div className="sidebar-upgrade-icon"><Sparkles /></div>
            <div className="sidebar-upgrade-copy">
              <p>Activate Super</p>
              <span>Unlock more features</span>
            </div>
            <ArrowUpRight className="sidebar-upgrade-arrow" />
          </div>}
          {bottomItems.map((item) => (
            <SidebarNavigationLink
              key={item.href}
              item={item}
              isActive={hydratedPathname === item.href}
              isCollapsed={isCollapsed}
              onNavigate={closeMobileSidebar}
            />
          ))}
          <button
            type="button"
            title="Logout"
            aria-label="Log out"
            onClick={() => console.log('Logout clicked')}
            className="sidebar-navigation-link sidebar-logout"
          >
            <LogOut />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
