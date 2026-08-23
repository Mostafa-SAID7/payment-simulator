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
  { href: '/payments', icon: Send, label: 'Payment' },
  { href: '/cards', icon: CreditCard, label: 'Cards' },
  { href: '/transactions', icon: History, label: 'Transactions' },
  { href: '/taxes', icon: Upload, label: 'Taxes' },
  { href: '/users', icon: Users, label: 'Users' },
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
      className={cn(
        'flex items-center min-h-10 gap-3 px-3 py-2 border border-transparent rounded-xl text-sidebar-foreground/50 text-xs font-medium transition-colors duration-150 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground [&_svg]:shrink-0 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:stroke-[1.5]',
        isActive && 'bg-sidebar-foreground/10 text-sidebar-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,var(--color-sidebar-foreground)_5%,transparent)]',
        isCollapsed && 'justify-center px-2'
      )}
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
          className="fixed inset-0 z-35 bg-sidebar/80 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        data-collapsed={isCollapsed}
        data-mobile-open={isMobileOpen}
        className={cn(
          'isolate fixed left-3 top-3 z-40 flex h-[calc(100vh-1.5rem)] flex-col overflow-y-auto rounded-3xl border border-sidebar-border/30 text-sidebar-foreground shadow-2xl transition-all duration-300 md:left-4 md:top-4 md:h-[calc(100vh-2rem)] bg-sidebar',
          isCollapsed ? 'w-20' : 'w-[17rem]',
          'max-md:left-0 max-md:top-0 max-md:h-[100dvh] max-md:rounded-none max-md:rounded-r-3xl max-md:w-[min(18rem,calc(100vw-3rem))] max-md:max-w-[calc(100vw-3rem)]',
          !isMobileOpen && 'max-md:invisible max-md:pointer-events-none max-md:-translate-x-full'
        )}
      >
        {/* Vorix Top Glow */}
        <div className="absolute inset-x-0 top-0 h-48 z-0 pointer-events-none bg-[radial-gradient(circle_at_80%_-20%,color-mix(in_oklch,var(--color-primary)_40%,transparent),transparent_70%)]" aria-hidden="true" />
        
        <div className={cn("relative z-10 flex items-center justify-between min-h-[5rem] p-5 pb-3 gap-2", isCollapsed && "justify-center px-2")}>
          <Link href="/" onClick={closeMobileSidebar} className={cn("inline-flex items-center min-w-0 gap-2 text-sidebar-foreground", isCollapsed && "hidden")} aria-label="Vorix dashboard">
            <span className="text-xl font-bold tracking-tight flex items-center gap-1.5">
              Vorix
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sidebar-foreground/80"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
            </span>
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
            className={cn("inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-sidebar-foreground/10 text-sidebar-foreground/70 transition-colors duration-150 hover:bg-sidebar-foreground/20 hover:text-sidebar-foreground [&_svg]:w-4 [&_svg]:h-4 backdrop-blur-md", isCollapsed && "bg-transparent hover:bg-sidebar-foreground/10")}
          >
            {isCollapsed ? <PanelLeftOpen /> : <ChevronRightIcon />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="relative z-10 px-5 mb-4 mt-2">
            <button type="button" className="relative flex items-center w-full h-11 px-3 gap-2 border border-sidebar-foreground/10 rounded-xl bg-sidebar-foreground/5 text-sidebar-foreground/50 text-xs text-left transition-colors duration-150 hover:border-sidebar-foreground/20 hover:bg-sidebar-foreground/10 backdrop-blur-md [&_svg]:w-4 [&_svg]:h-4" aria-label="Search navigation">
              <Search className="text-sidebar-foreground/40" />
              <span>Search</span>
              <kbd className="ml-auto text-sidebar-foreground/50 font-sans text-xs">⌘K</kbd>
            </button>
          </div>
        )}

        <nav aria-label="Primary navigation" className="relative z-10 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3">
          {!isCollapsed && <p className="mx-3 mt-2 mb-3 text-sidebar-foreground/40 text-[0.65rem] font-medium tracking-wide">Main Menu</p>}
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

        <div className="relative z-10 flex flex-col gap-1 p-4 pb-5">
          {!isCollapsed && (
            <div className="relative flex flex-col justify-end min-h-[7rem] mb-4 p-4 gap-1 overflow-hidden rounded-2xl bg-gradient-to-br from-sidebar-primary/20 to-sidebar-foreground/5 border border-sidebar-foreground/10 shadow-[inset_0_1px_0_color-mix(in_oklch,white_10%,transparent)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in_oklch,var(--color-primary)_30%,transparent),transparent_50%)]" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-6 h-6 mb-2 rounded-lg bg-sidebar-foreground text-sidebar [&_svg]:w-3 [&_svg]:h-3"><Sparkles /></div>
                <p className="text-sidebar-foreground text-sm font-semibold m-0">Activate Super</p>
                <span className="text-sidebar-foreground/60 text-xs mt-0.5 block">Unlock all features on Stakent</span>
              </div>
            </div>
          )}
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
            className={cn("flex items-center min-h-10 gap-3 px-3 py-2 border border-transparent rounded-xl text-sidebar-foreground/50 text-xs font-medium transition-colors duration-150 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground [&_svg]:shrink-0 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:stroke-[1.5]", isCollapsed && "justify-center px-2")}
          >
            <LogOut />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}
