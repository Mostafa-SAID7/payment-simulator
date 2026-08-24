'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Activity,
  Ban,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Crown,
  Download,
  Eye,
  Filter,
  Globe,
  KeyRound,
  Lock,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type UserRole = 'Admin' | 'Manager' | 'Editor' | 'Viewer';
type UserStatus = 'Active' | 'Offline' | 'Pending' | 'Suspended';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  lastActive: string;
  joined: string;
  payments: number;
  twoFA: boolean;
};

const usersList: User[] = [
  { id: 1, name: 'William Hirsch', email: 'william@finpay.com', phone: '+1 (555) 201-4400', role: 'Admin', department: 'Engineering', status: 'Active', lastActive: 'Just now', joined: 'Jan 12, 2024', payments: 312, twoFA: true },
  { id: 2, name: 'Sarah Connor', email: 'sarah@finpay.com', phone: '+1 (555) 302-5510', role: 'Manager', department: 'Finance', status: 'Active', lastActive: '2h ago', joined: 'Feb 3, 2024', payments: 198, twoFA: true },
  { id: 3, name: 'John Doe', email: 'john@finpay.com', phone: '+1 (555) 403-6620', role: 'Viewer', department: 'Operations', status: 'Offline', lastActive: '1d ago', joined: 'Mar 18, 2024', payments: 54, twoFA: false },
  { id: 4, name: 'Jane Smith', email: 'jane@finpay.com', phone: '+1 (555) 504-7730', role: 'Editor', department: 'Marketing', status: 'Pending', lastActive: '—', joined: 'Apr 22, 2024', payments: 0, twoFA: false },
  { id: 5, name: 'Marcus Lee', email: 'marcus@finpay.com', phone: '+1 (555) 605-8840', role: 'Editor', department: 'Finance', status: 'Active', lastActive: '30m ago', joined: 'May 5, 2024', payments: 87, twoFA: true },
  { id: 6, name: 'Priya Nair', email: 'priya@finpay.com', phone: '+1 (555) 706-9950', role: 'Viewer', department: 'Support', status: 'Suspended', lastActive: '5d ago', joined: 'Jun 10, 2024', payments: 12, twoFA: false },
];

const roles: UserRole[] = ['Admin', 'Manager', 'Editor', 'Viewer'];
const statuses: UserStatus[] = ['Active', 'Offline', 'Pending', 'Suspended'];

const roleColors: Record<UserRole, string> = {
  Admin: 'bg-primary/15 text-primary border-primary/30',
  Manager: 'bg-info/15 text-info border-info/30',
  Editor: 'bg-success/15 text-success border-success/30',
  Viewer: 'bg-muted/60 text-muted-foreground border-border/40',
};

const statusConfig: Record<UserStatus, { color: string; dot: string; icon: LucideIcon }> = {
  Active: { color: 'bg-success/10 text-success border-success/30', dot: 'bg-success', icon: CheckCircle2 },
  Offline: { color: 'bg-muted/10 text-muted-foreground border-border/30', dot: 'bg-muted-foreground/50', icon: Clock },
  Pending: { color: 'bg-warning/10 text-warning border-warning/30', dot: 'bg-warning', icon: Clock },
  Suspended: { color: 'bg-destructive/10 text-destructive border-destructive/30', dot: 'bg-destructive', icon: XCircle },
};

const recentActivity: { icon: LucideIcon; text: string; time: string; tone: string }[] = [
  { icon: UserPlus, text: 'Priya Nair was suspended', time: '5m ago', tone: 'destructive' },
  { icon: KeyRound, text: 'Marcus Lee enabled 2FA', time: '1h ago', tone: 'success' },
  { icon: Send, text: 'Invite sent to jane@finpay.com', time: '3h ago', tone: 'warning' },
  { icon: ShieldCheck, text: 'Admin role assigned to William', time: '1d ago', tone: 'primary' },
];

const toneMap: Record<string, string> = {
  destructive: 'bg-destructive/10 text-destructive',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  primary: 'bg-primary/10 text-primary',
};

function UserAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  const sizeClass = size === 'sm' ? 'size-7 text-[9px]' : size === 'lg' ? 'size-11 text-sm' : 'size-9 text-[11px]';
  return <div aria-hidden="true" className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-primary/15 font-bold text-primary', sizeClass)}>{initials}</div>;
}

function SectionHeader({ icon: Icon, title, description, accent = false }: { icon: LucideIcon; title: string; description: string; accent?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 border-b border-border/50 px-5 pb-4 pt-3', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}>
      <div className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-xl', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}><Icon className="size-4" /></div>
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-tight text-foreground">{title}</p><p className="mt-0.5 text-[0.7rem] leading-snug text-muted-foreground">{description}</p></div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersList);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<'All' | UserRole>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | UserStatus>('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Viewer');
  const [allowSelfRegistration, setAllowSelfRegistration] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notice, setNotice] = useState('');
  const inviteRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchSearch = !normalizedSearch || [user.name, user.email, user.department].some((value) => value.toLowerCase().includes(normalizedSearch));
      const matchRole = filterRole === 'All' || user.role === filterRole;
      const matchStatus = filterStatus === 'All' || user.status === filterStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  const userStats = useMemo(() => {
    const stats = { active: 0, pending: 0, suspended: 0, twoFA: 0 };
    const roleCounts = new Map<UserRole, number>();

    for (const user of users) {
      if (user.status === 'Active') stats.active += 1;
      if (user.status === 'Pending') stats.pending += 1;
      if (user.status === 'Suspended') stats.suspended += 1;
      if (user.twoFA) stats.twoFA += 1;
      roleCounts.set(user.role, (roleCounts.get(user.role) ?? 0) + 1);
    }

    return { stats, roleCounts };
  }, [users]);
  const { active: activeCount, pending: pendingCount, suspended: suspendedCount, twoFA: twoFACount } = userStats.stats;
  const twoFAPercent = users.length ? Math.round((twoFACount / users.length) * 100) : 0;
  const allSelected = filtered.length > 0 && filtered.every((user) => selectedIds.includes(user.id));
  const hasFilters = Boolean(search || filterRole !== 'All' || filterStatus !== 'All');

  const roleDistribution = useMemo(() => roles.map((role) => {
    const count = userStats.roleCounts.get(role) ?? 0;
    return { role, count, pct: users.length ? Math.round((count / users.length) * 100) : 0 };
  }), [userStats.roleCounts, users.length]);

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  };

  const toggleSelect = (id: number) => setSelectedIds((previous) => previous.includes(id) ? previous.filter((selectedId) => selectedId !== id) : [...previous, id]);

  const toggleAll = () => {
    const filteredIds = filtered.map((user) => user.id);
    setSelectedIds((previous) => allSelected ? previous.filter((id) => !filteredIds.includes(id)) : Array.from(new Set([...previous, ...filteredIds])));
  };

  const clearFilters = () => {
    setSearch('');
    setFilterRole('All');
    setFilterStatus('All');
  };

  const handleExport = () => {
    const csv = ['Name,Email,Department,Role,Status,Last Active,2FA', ...filtered.map((user) => [user.name, user.email, user.department, user.role, user.status, user.lastActive, user.twoFA ? 'On' : 'Off'].map((value) => `"${value.replaceAll('"', '""')}"`).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finpay-users.csv';
    link.click();
    URL.revokeObjectURL(url);
    announce(`${filtered.length} user${filtered.length === 1 ? '' : 's'} exported.`);
  };

  const handleSync = () => {
    setIsSyncing(true);
    window.setTimeout(() => {
      setIsSyncing(false);
      announce('User directory is up to date.');
    }, 700);
  };

  const handleBulkSuspend = () => {
    setUsers((previous) => previous.map((user) => selectedIds.includes(user.id) ? { ...user, status: 'Suspended', lastActive: '—' } : user));
    announce(`${selectedIds.length} user${selectedIds.length === 1 ? '' : 's'} suspended.`);
    setSelectedIds([]);
  };

  const handleBulkRemove = () => {
    setUsers((previous) => previous.filter((user) => !selectedIds.includes(user.id)));
    announce(`${selectedIds.length} user${selectedIds.length === 1 ? '' : 's'} removed.`);
    setSelectedIds([]);
  };

  const handleInvite = () => {
    const email = inviteEmail.trim();
    if (!email || !email.includes('@')) {
      announce('Enter a valid email address to send an invitation.');
      return;
    }
    const name = email.split('@')[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    setUsers((previous) => [...previous, { id: Date.now(), name, email, phone: '—', role: inviteRole, department: 'New team member', status: 'Pending', lastActive: '—', joined: 'Today', payments: 0, twoFA: false }]);
    setInviteEmail('');
    announce(`Invitation sent to ${email}.`);
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-info/6" />
        <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative px-4 pb-4 pt-3 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0"><div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 shadow-sm"><Users className="size-6 text-primary" /></div><span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card bg-success" /></div>
              <div className="min-w-0"><h1 className="text-lg font-bold leading-tight text-foreground">User Management</h1><p className="mt-0.5 truncate text-xs text-muted-foreground">Manage team members, roles &amp; permissions</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport} className="h-8 flex-1 border-border/60 text-xs sm:flex-none"><Download className="size-3.5" /> Export</Button>
              <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing} className="h-8 flex-1 border-border/60 text-xs sm:flex-none"><RefreshCw className={cn('size-3.5', isSyncing && 'animate-spin')} /> {isSyncing ? 'Syncing' : 'Sync'}</Button>
              <Button size="sm" onClick={() => inviteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="h-8 flex-1 bg-primary text-xs text-primary-foreground hover:bg-primary/90 sm:flex-none"><UserPlus className="size-3.5" /> Invite User</Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {[{ icon: Building2, text: 'FinPay Corp' }, { icon: Globe, text: 'finpay.com' }, { icon: Mail, text: 'admin@finpay.com' }, { icon: Phone, text: '+1 (555) 123-4567' }].map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Icon className="size-3 shrink-0" />{text}</span>)}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[{ label: 'Total Users', value: users.length, icon: Users, color: 'text-primary', bg: 'bg-primary/15' }, { label: 'Active Now', value: activeCount, icon: UserCheck, color: 'text-success', bg: 'bg-success/15' }, { label: 'Pending Invites', value: pendingCount, icon: Send, color: 'text-warning', bg: 'bg-warning/15' }, { label: 'Suspended', value: suspendedCount, icon: Ban, color: 'text-destructive', bg: 'bg-destructive/15' }].map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><span className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-lg', bg, color)}><Icon className="size-4" /></span><div className="min-w-0"><p className="text-[0.65rem] font-medium leading-none text-muted-foreground">{label}</p><p className="mt-0.5 text-base font-bold leading-none text-foreground">{value}</p></div></div>)}
          </div>
        </div>
      </div>

      {notice && <div role="status" aria-live="polite" className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-3 py-2 text-xs text-primary"><Check className="size-3.5 shrink-0" />{notice}</div>}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card py-0 shadow-sm gap-0">
            <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row">
              <div className="relative min-w-0 flex-1"><Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search users" placeholder="Search by name, email or department…" value={search} onChange={(event) => setSearch(event.target.value)} className="h-8 border-border/50 bg-background/60 pl-8 text-xs" /></div>
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1 sm:flex-none"><label htmlFor="role-filter" className="sr-only">Filter by role</label><select id="role-filter" value={filterRole} onChange={(event) => setFilterRole(event.target.value as 'All' | UserRole)} className="h-8 w-full appearance-none rounded-md border border-border/50 bg-background/60 pl-3 pr-7 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="All">All roles</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" /></div>
                <div className="relative min-w-0 flex-1 sm:flex-none"><label htmlFor="status-filter" className="sr-only">Filter by status</label><select id="status-filter" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value as 'All' | UserStatus)} className="h-8 w-full appearance-none rounded-md border border-border/50 bg-background/60 pl-3 pr-7 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="All">All status</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" /></div>
                <Button variant="outline" size="sm" onClick={clearFilters} disabled={!hasFilters} className="h-8 shrink-0 border-border/50 text-xs"><Filter className="size-3.5" /><span className="hidden sm:inline">{hasFilters ? 'Clear' : 'Filter'}</span></Button>
              </div>
            </div>

            {selectedIds.length > 0 && <div className="mx-4 mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-3 py-2"><span className="text-xs font-semibold text-primary">{selectedIds.length} selected</span><div className="hidden flex-1 sm:block" /><Button variant="ghost" size="sm" onClick={() => announce(`Email prepared for ${selectedIds.length} selected users.`)} className="h-7 text-xs text-muted-foreground hover:text-foreground"><Mail className="size-3" /> Email</Button><Button variant="ghost" size="sm" onClick={handleBulkSuspend} className="h-7 text-xs text-muted-foreground hover:text-foreground"><Lock className="size-3" /> Suspend</Button><Button variant="ghost" size="sm" onClick={handleBulkRemove} className="h-7 text-xs text-destructive hover:text-destructive/80"><Trash2 className="size-3" /> Remove</Button></div>}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[690px] text-xs">
                <caption className="sr-only">Team users and access status</caption>
                <thead><tr className="border-y border-border/50 bg-muted/30 [&_th]:whitespace-nowrap [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground"><th className="w-8"><input aria-label="Select all visible users" type="checkbox" checked={allSelected} onChange={toggleAll} className="size-3.5 rounded border-border/60 accent-primary" /></th><th>User</th><th className="hidden sm:table-cell">Department</th><th>Role</th><th>Status</th><th className="hidden md:table-cell">Last Active</th><th className="hidden lg:table-cell">2FA</th><th className="w-8"><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {filtered.length === 0 ? <tr><td colSpan={8} className="py-10 text-center text-xs text-muted-foreground">No users match your search. <button type="button" onClick={clearFilters} className="font-semibold text-primary hover:underline">Clear filters</button></td></tr> : filtered.map((user) => {
                    const status = statusConfig[user.status];
                    const StatusIcon = status.icon;
                    return <tr key={user.id} className={cn('border-b border-border/40 transition-colors hover:bg-secondary/30 [&_td]:px-4 [&_td]:py-3', selectedIds.includes(user.id) && 'bg-primary/4')}>
                      <td><input aria-label={`Select ${user.name}`} type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelect(user.id)} className="size-3.5 rounded border-border/60 accent-primary" /></td>
                      <td><div className="flex items-center gap-2.5"><UserAvatar name={user.name} /><div className="flex min-w-0 flex-col"><strong className="truncate font-semibold text-foreground">{user.name}</strong><span className="truncate text-[10px] text-muted-foreground/70">{user.email}</span></div></div></td>
                      <td className="hidden text-muted-foreground sm:table-cell">{user.department}</td>
                      <td><span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold', roleColors[user.role])}>{user.role === 'Admin' && <Crown className="mr-1 size-2.5" />}{user.role}</span></td>
                      <td><span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold', status.color)}><span className={cn('size-1.5 rounded-full', status.dot)} />{user.status}<StatusIcon className="hidden size-2.5 sm:block" /></span></td>
                      <td className="hidden text-muted-foreground md:table-cell">{user.lastActive}</td>
                      <td className="hidden lg:table-cell"><span className={cn('inline-flex items-center gap-1 text-[10px] font-medium', user.twoFA ? 'text-success' : 'text-muted-foreground/60')}><ShieldCheck className="size-3" />{user.twoFA ? 'On' : 'Off'}</span></td>
                      <td><div className="flex items-center gap-0.5"><Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-foreground" onClick={() => announce(`${user.name} joined ${user.department} and has ${user.role} access.`)} aria-label={`View ${user.name}`}><Eye className="size-3" /></Button><Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-foreground" onClick={() => announce(`Editing access for ${user.name}.`)} aria-label={`Edit ${user.name}`}><Pencil className="size-3" /></Button><Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-foreground" onClick={() => toggleSelect(user.id)} aria-label={`Select actions for ${user.name}`}><MoreHorizontal className="size-3" /></Button></div></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 px-4 py-3"><span className="text-[0.7rem] text-muted-foreground">Showing {filtered.length} of {users.length} users</span><span className="text-[0.7rem] text-muted-foreground">Page 1 of 1</span></div>
          </Card>

          <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card py-0 shadow-sm gap-0">
            <SectionHeader icon={Lock} title="Permissions Matrix" description="Role-based access control overview" accent />
            <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-xs"><caption className="sr-only">Permissions by team role</caption><thead><tr className="border-b border-border/50 bg-muted/20 [&_th]:px-4 [&_th]:py-2.5 [&_th]:font-semibold [&_th]:text-muted-foreground"><th className="text-left">Permission</th>{roles.map((role) => <th key={role} className="text-center">{role}</th>)}</tr></thead><tbody>{[{ perm: 'View Payments', admin: true, manager: true, editor: true, viewer: true }, { perm: 'Create Payments', admin: true, manager: true, editor: true, viewer: false }, { perm: 'Approve Batches', admin: true, manager: true, editor: false, viewer: false }, { perm: 'Manage Users', admin: true, manager: false, editor: false, viewer: false }, { perm: 'Export Reports', admin: true, manager: true, editor: false, viewer: false }, { perm: 'System Settings', admin: true, manager: false, editor: false, viewer: false }].map(({ perm, admin, manager, editor, viewer }) => <tr key={perm} className="border-b border-border/40 transition-colors hover:bg-secondary/20 [&_td]:px-4 [&_td]:py-2.5"><td className="font-medium text-foreground">{perm}</td>{[admin, manager, editor, viewer].map((allowed, index) => <td key={index} className="text-center">{allowed ? <span className="mx-auto inline-flex size-5 items-center justify-center rounded-full bg-success/15 text-success"><CheckCircle2 className="size-3" /></span> : <span className="mx-auto inline-flex size-5 items-center justify-center rounded-full bg-muted/40 text-muted-foreground/40">—</span>}</td>)}</tr>)}</tbody></table></div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card py-0 shadow-sm gap-0"><SectionHeader icon={Activity} title="Role Distribution" description="Breakdown of team roles" /><CardContent className="flex flex-col gap-3 px-5 py-4">{roleDistribution.map(({ role, count, pct }) => <div key={role} className="flex flex-col gap-1"><div className="flex items-center justify-between"><span className="text-xs font-medium text-foreground">{role}</span><span className="text-[10px] text-muted-foreground">{count} users · {pct}%</span></div><div className="grid h-1.5 grid-cols-12 gap-0.5 overflow-hidden rounded-full bg-muted/40">{Array.from({ length: 12 }, (_, index) => <span key={index} className={cn('rounded-full', index < Math.round((pct / 100) * 12) ? role === 'Admin' ? 'bg-primary' : role === 'Manager' ? 'bg-info' : role === 'Editor' ? 'bg-success' : 'bg-muted-foreground/50' : 'bg-transparent')} />)}</div></div>)}<div className="mt-1 flex items-center justify-between border-t border-border/40 pt-3 text-[10px] text-muted-foreground"><span>{users.length} team members</span><span>{roles.filter((role) => users.some((user) => user.role === role)).length} active roles</span></div></CardContent></Card>

          <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card py-0 shadow-sm gap-0"><SectionHeader icon={ShieldCheck} title="Security Overview" description="Team security health" accent /><CardContent className="flex flex-col gap-3 px-5 py-4"><div className="flex items-center gap-4"><div className="relative size-16 shrink-0"><svg viewBox="0 0 36 36" className="size-16 -rotate-90"><circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" /><circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${twoFAPercent * 0.88} 88`} strokeLinecap="round" className="text-success" /></svg><span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{twoFAPercent}%</span></div><div><p className="text-xs font-semibold text-foreground">2FA Adoption</p><p className="mt-0.5 text-[10px] text-muted-foreground">{twoFACount} of {users.length} users have 2FA enabled</p><Button variant="outline" size="sm" onClick={() => announce('2FA reminders queued for users without protection.')} className="mt-2 h-6 gap-1 border-border/50 text-[10px]"><Send className="size-2.5" /> Remind others</Button></div></div><div className="flex flex-col gap-2 border-t border-border/40 pt-3">{[{ label: 'Strong passwords', value: `${Math.max(users.length - 1, 0)}/${users.length}`, ok: users.length > 0 }, { label: 'Recent login anomalies', value: '0', ok: true }, { label: 'Suspended accounts', value: String(suspendedCount), ok: suspendedCount === 0 }].map(({ label, value, ok }) => <div key={label} className="flex items-center justify-between"><span className="text-[10px] text-muted-foreground">{label}</span><span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold', ok ? 'text-success' : 'text-warning')}>{ok ? <CheckCircle2 className="size-3" /> : <Ban className="size-3" />}{value}</span></div>)}</div></CardContent></Card>

          <Card ref={inviteRef} className="overflow-hidden rounded-2xl border border-border/60 bg-card py-0 shadow-sm gap-0"><SectionHeader icon={UserPlus} title="Quick Invite" description="Send a team invitation" /><CardContent className="flex flex-col gap-3 px-5 py-4"><label htmlFor="invite-email" className="sr-only">Email address</label><Input id="invite-email" type="email" placeholder="colleague@company.com" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') handleInvite(); }} className="h-8 border-border/50 bg-background/60 text-xs" /><div className="relative"><label htmlFor="invite-role" className="sr-only">Invitation role</label><select id="invite-role" value={inviteRole} onChange={(event) => setInviteRole(event.target.value as UserRole)} className="h-8 w-full appearance-none rounded-md border border-border/50 bg-background/60 pl-3 pr-7 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40">{roles.slice().reverse().map((role) => <option key={role} value={role}>{role}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" /></div><Button size="sm" onClick={handleInvite} className="h-8 w-full gap-1.5 bg-primary text-xs text-primary-foreground hover:bg-primary/90"><Send className="size-3.5" /> Send Invitation</Button><div className="flex items-center justify-between border-t border-border/40 pt-3"><label htmlFor="self-registration" className="text-[10px] text-muted-foreground">Allow self-registration</label><Switch id="self-registration" checked={allowSelfRegistration} onCheckedChange={setAllowSelfRegistration} aria-label="Allow self-registration" /></div></CardContent></Card>

          <div className="flex items-start gap-2 rounded-xl border border-info/20 bg-info/8 px-3 py-2.5 text-[10px] text-muted-foreground"><ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-info" /><p>Review suspended access and encourage 2FA enrollment regularly to keep your workspace protected.</p></div>
        </div>
      </div>
    </div>
  );
}
