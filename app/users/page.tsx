'use client';

import { useMemo, useState } from 'react';
import { Users, UserCheck, UserPlus, MoreHorizontal, Search, Filter, Download, Mail, Phone, Building2, Globe, Lock, Trash2, Pencil, CheckCircle2, Clock, XCircle, ChevronDown, RefreshCw, ShieldCheck, Activity, Zap, Crown, Eye, Ban, Send, KeyRound } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const usersList = [
  { id: 1, name: 'William Hirsch', email: 'william@finpay.com', phone: '+1 (555) 201-4400', role: 'Admin', department: 'Engineering', status: 'Active', lastActive: 'Just now', joined: 'Jan 12, 2024', payments: 312, twoFA: true },
  { id: 2, name: 'Sarah Connor', email: 'sarah@finpay.com', phone: '+1 (555) 302-5510', role: 'Manager', department: 'Finance', status: 'Active', lastActive: '2h ago', joined: 'Feb 3, 2024', payments: 198, twoFA: true },
  { id: 3, name: 'John Doe', email: 'john@finpay.com', phone: '+1 (555) 403-6620', role: 'Viewer', department: 'Operations', status: 'Offline', lastActive: '1d ago', joined: 'Mar 18, 2024', payments: 54, twoFA: false },
  { id: 4, name: 'Jane Smith', email: 'jane@finpay.com', phone: '+1 (555) 504-7730', role: 'Editor', department: 'Marketing', status: 'Pending', lastActive: '—', joined: 'Apr 22, 2024', payments: 0, twoFA: false },
  { id: 5, name: 'Marcus Lee', email: 'marcus@finpay.com', phone: '+1 (555) 605-8840', role: 'Editor', department: 'Finance', status: 'Active', lastActive: '30m ago', joined: 'May 5, 2024', payments: 87, twoFA: true },
  { id: 6, name: 'Priya Nair', email: 'priya@finpay.com', phone: '+1 (555) 706-9950', role: 'Viewer', department: 'Support', status: 'Suspended', lastActive: '5d ago', joined: 'Jun 10, 2024', payments: 12, twoFA: false },
];

const roleColors: Record<string, string> = {
  Admin: 'bg-primary/15 text-primary border-primary/30',
  Manager: 'bg-info/15 text-info border-info/30',
  Editor: 'bg-success/15 text-success border-success/30',
  Viewer: 'bg-muted/60 text-muted-foreground border-border/40',
};

const statusConfig: Record<string, { color: string; dot: string; icon: typeof CheckCircle2 }> = {
  Active: { color: 'bg-success/10 text-success border-success/30', dot: 'bg-success', icon: CheckCircle2 },
  Offline: { color: 'bg-muted/10 text-muted-foreground border-border/30', dot: 'bg-muted-foreground/50', icon: Clock },
  Pending: { color: 'bg-warning/10 text-warning border-warning/30', dot: 'bg-warning', icon: Clock },
  Suspended: { color: 'bg-destructive/10 text-destructive border-destructive/30', dot: 'bg-destructive', icon: XCircle },
};

const heroStats: { label: string; value: string; icon: React.ElementType; color: string; bg: string }[] = [
  { label: 'Total Users', value: '1,284', icon: Users, color: 'text-primary', bg: 'bg-primary/15' },
  { label: 'Active Now', value: '842', icon: UserCheck, color: 'text-success', bg: 'bg-success/15' },
  { label: 'Pending Invites', value: '42', icon: Send, color: 'text-warning', bg: 'bg-warning/15' },
  { label: 'Suspended', value: '6', icon: Ban, color: 'text-destructive', bg: 'bg-destructive/15' },
];

const roleDistribution: { role: string; count: number; pct: number; color: string }[] = [
  { role: 'Admin', count: 3, pct: 12, color: 'bg-primary' },
  { role: 'Manager', count: 8, pct: 28, color: 'bg-info' },
  { role: 'Editor', count: 11, pct: 38, color: 'bg-success' },
  { role: 'Viewer', count: 6, pct: 22, color: 'bg-muted-foreground/50' },
];

const roleWidthClasses: Record<number, string> = {
  12: 'w-[12%]',
  28: 'w-[28%]',
  38: 'w-[38%]',
  22: 'w-[22%]',
};

const recentActivity: { icon: React.ElementType; text: string; time: string; tone: string }[] = [
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
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-[9px]' : size === 'lg' ? 'w-11 h-11 text-sm' : 'w-9 h-9 text-[11px]';
  return <div className={cn('inline-flex items-center justify-center rounded-full bg-primary/15 text-primary font-bold shrink-0', sizeClass)}>{initials}</div>;
}

function SectionHeader({ icon: Icon, title, description, accent = false }: { icon: typeof Users; title: string; description: string; accent?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border/50', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}>
      <div className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}><Icon className="w-4 h-4" /></div>
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground leading-tight">{title}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">{description}</p></div>
    </div>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = useMemo(() => usersList.filter((user) => {
    const normalizedSearch = search.toLowerCase();
    const matchSearch = user.name.toLowerCase().includes(normalizedSearch) || user.email.toLowerCase().includes(normalizedSearch) || user.department.toLowerCase().includes(normalizedSearch);
    const matchRole = filterRole === 'All' || user.role === filterRole;
    const matchStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  }), [search, filterRole, filterStatus]);

  const toggleSelect = (id: number) => setSelectedIds((previous) => previous.includes(id) ? previous.filter((selectedId) => selectedId !== id) : [...previous, id]);
  const allSelected = filtered.length > 0 && filtered.every((user) => selectedIds.includes(user.id));
  const toggleAll = () => setSelectedIds(allSelected ? [] : filtered.map((user) => user.id));

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-info/6 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative px-5 pt-5 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative"><div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shadow-sm"><Users className="w-6 h-6 text-primary" /></div><span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" /></div>
              <div><h1 className="text-lg font-bold text-foreground leading-tight">User Management</h1><p className="text-xs text-muted-foreground mt-0.5">Manage team members, roles &amp; permissions</p></div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60"><Download className="w-3.5 h-3.5" /> Export</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60"><RefreshCw className="w-3.5 h-3.5" /> Sync</Button>
              <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"><UserPlus className="w-3.5 h-3.5" /> Invite User</Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
            {[{ icon: Building2, text: 'FinPay Corp' }, { icon: Globe, text: 'finpay.com' }, { icon: Mail, text: 'admin@finpay.com' }, { icon: Phone, text: '+1 (555) 123-4567' }].map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Icon className="w-3 h-3 shrink-0" />{text}</span>)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {heroStats.map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><span className={cn('inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0', bg, color)}><Icon className="w-4 h-4" /></span><div className="min-w-0"><p className="text-[0.65rem] text-muted-foreground font-medium leading-none">{label}</p><p className="text-base font-bold text-foreground mt-0.5 leading-none">{value}</p></div></div>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Search by name, email or department…" value={search} onChange={(event) => setSearch(event.target.value)} className="pl-8 h-8 text-xs bg-background/60 border-border/50" /></div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative"><select value={filterRole} onChange={(event) => setFilterRole(event.target.value)} className="h-8 pl-3 pr-7 text-xs rounded-md border border-border/50 bg-background/60 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40">{['All', 'Admin', 'Manager', 'Editor', 'Viewer'].map((role) => <option key={role}>{role}</option>)}</select><ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" /></div>
                <div className="relative"><select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="h-8 pl-3 pr-7 text-xs rounded-md border border-border/50 bg-background/60 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40">{['All', 'Active', 'Offline', 'Pending', 'Suspended'].map((status) => <option key={status}>{status}</option>)}</select><ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" /></div>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/50"><Filter className="w-3.5 h-3.5" /> Filter</Button>
              </div>
            </div>

            {selectedIds.length > 0 && <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl bg-primary/8 border border-primary/20 px-3 py-2"><span className="text-xs font-semibold text-primary">{selectedIds.length} selected</span><div className="flex-1" /><Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"><Mail className="w-3 h-3" /> Email</Button><Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"><Lock className="w-3 h-3" /> Suspend</Button><Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-destructive hover:text-destructive/80"><Trash2 className="w-3 h-3" /> Remove</Button></div>}

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-y border-border/50 bg-muted/30 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:whitespace-nowrap"><th className="w-8"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-3.5 h-3.5 rounded border-border/60 accent-primary" /></th><th>User</th><th className="hidden sm:table-cell">Department</th><th>Role</th><th>Status</th><th className="hidden md:table-cell">Last Active</th><th className="hidden lg:table-cell">2FA</th><th className="w-8" /></tr></thead>
                <tbody>
                  {filtered.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-muted-foreground text-xs">No users match your search.</td></tr> : filtered.map((user) => {
                    const status = statusConfig[user.status];
                    return <tr key={user.id} className={cn('border-b border-border/40 hover:bg-secondary/30 transition-colors [&_td]:px-4 [&_td]:py-3', selectedIds.includes(user.id) && 'bg-primary/4')}>
                      <td><input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelect(user.id)} className="w-3.5 h-3.5 rounded border-border/60 accent-primary" /></td>
                      <td><div className="flex items-center gap-2.5"><UserAvatar name={user.name} /><div className="flex flex-col min-w-0"><strong className="font-semibold text-foreground truncate">{user.name}</strong><span className="text-muted-foreground/70 text-[10px] truncate">{user.email}</span></div></div></td>
                      <td className="hidden sm:table-cell text-muted-foreground">{user.department}</td>
                      <td><span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold', roleColors[user.role])}>{user.role === 'Admin' && <Crown className="w-2.5 h-2.5 mr-1" />}{user.role}</span></td>
                      <td><span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold', status.color)}><span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />{user.status}</span></td>
                      <td className="hidden md:table-cell text-muted-foreground">{user.lastActive}</td>
                      <td className="hidden lg:table-cell"><span className={cn('inline-flex items-center gap-1 text-[10px] font-medium', user.twoFA ? 'text-success' : 'text-muted-foreground/60')}><ShieldCheck className="w-3 h-3" />{user.twoFA ? 'On' : 'Off'}</span></td>
                      <td><div className="flex items-center gap-0.5"><Button variant="ghost" size="icon" className="w-6 h-6 rounded-md text-muted-foreground hover:text-foreground" aria-label={`View ${user.name}`}><Eye className="w-3 h-3" /></Button><Button variant="ghost" size="icon" className="w-6 h-6 rounded-md text-muted-foreground hover:text-foreground" aria-label={`Edit ${user.name}`}><Pencil className="w-3 h-3" /></Button><Button variant="ghost" size="icon" className="w-6 h-6 rounded-md text-muted-foreground hover:text-foreground" aria-label={`More actions for ${user.name}`}><MoreHorizontal className="w-3 h-3" /></Button></div></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40"><span className="text-[0.7rem] text-muted-foreground">Showing {filtered.length} of {usersList.length} users</span><div className="flex items-center gap-1">{[1, 2, 3].map((page) => <button key={page} type="button" className={cn('w-6 h-6 rounded-md text-[10px] font-semibold transition-colors', page === 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary')}>{page}</button>)}<span className="text-[10px] text-muted-foreground px-1">…</span><button type="button" className="w-6 h-6 rounded-md text-[10px] font-semibold text-muted-foreground hover:bg-secondary">43</button></div></div>
          </Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <SectionHeader icon={Lock} title="Permissions Matrix" description="Role-based access control overview" accent />
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-border/50 bg-muted/20 [&_th]:px-4 [&_th]:py-2.5 [&_th]:font-semibold [&_th]:text-muted-foreground"><th className="text-left">Permission</th>{['Admin', 'Manager', 'Editor', 'Viewer'].map((role) => <th key={role} className="text-center">{role}</th>)}</tr></thead><tbody>{[{ perm: 'View Payments', admin: true, manager: true, editor: true, viewer: true }, { perm: 'Create Payments', admin: true, manager: true, editor: true, viewer: false }, { perm: 'Approve Batches', admin: true, manager: true, editor: false, viewer: false }, { perm: 'Manage Users', admin: true, manager: false, editor: false, viewer: false }, { perm: 'Export Reports', admin: true, manager: true, editor: false, viewer: false }, { perm: 'System Settings', admin: true, manager: false, editor: false, viewer: false }].map(({ perm, admin, manager, editor, viewer }) => <tr key={perm} className="border-b border-border/40 hover:bg-secondary/20 transition-colors [&_td]:px-4 [&_td]:py-2.5"><td className="font-medium text-foreground">{perm}</td>{[admin, manager, editor, viewer].map((allowed, index) => <td key={index} className="text-center">{allowed ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-success/15 text-success mx-auto"><CheckCircle2 className="w-3 h-3" /></span> : <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted/40 text-muted-foreground/40 mx-auto"><XCircle className="w-3 h-3" /></span>}</td>)}</tr>)}</tbody></table></div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Activity} title="Role Distribution" description="Breakdown of team roles" /><CardContent className="px-5 py-4 flex flex-col gap-3">{roleDistribution.map(({ role, count, pct, color }) => <div key={role} className="flex flex-col gap-1"><div className="flex items-center justify-between"><span className="text-xs font-medium text-foreground">{role}</span><span className="text-[10px] text-muted-foreground">{count} users · {pct}%</span></div><div className="h-1.5 rounded-full bg-muted/40 overflow-hidden"><div className={cn('h-full rounded-full transition-all', color, roleWidthClasses[pct])} /></div></div>)}</CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={ShieldCheck} title="Security Overview" description="Team security health" accent /><CardContent className="px-5 py-4 flex flex-col gap-3"><div className="flex items-center gap-4"><div className="relative w-16 h-16 shrink-0"><svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90"><circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" /><circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(4 / 6) * 88} 88`} strokeLinecap="round" className="text-success" /></svg><span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">67%</span></div><div><p className="text-xs font-semibold text-foreground">2FA Adoption</p><p className="text-[10px] text-muted-foreground mt-0.5">4 of 6 users have 2FA enabled</p><Button variant="outline" size="sm" className="h-6 text-[10px] mt-2 border-border/50 gap-1"><Send className="w-2.5 h-2.5" /> Remind others</Button></div></div><div className="border-t border-border/40 pt-3 flex flex-col gap-2">{[{ label: 'Strong passwords', value: '5/6', ok: true }, { label: 'Recent login anomalies', value: '0', ok: true }, { label: 'Suspended accounts', value: '1', ok: false }].map(({ label, value, ok }) => <div key={label} className="flex items-center justify-between"><span className="text-[10px] text-muted-foreground">{label}</span><span className={cn('text-[10px] font-semibold', ok ? 'text-success' : 'text-destructive')}>{value}</span></div>)}</div></CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Zap} title="Recent Activity" description="Latest user management events" /><CardContent className="px-5 py-4 flex flex-col gap-2.5">{recentActivity.map(({ icon: Icon, text, time, tone }) => <div key={text} className="flex items-start gap-2.5"><span className={cn('inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5', toneMap[tone])}><Icon className="w-3.5 h-3.5" /></span><div className="flex-1 min-w-0"><p className="text-xs text-foreground leading-snug">{text}</p><p className="text-[10px] text-muted-foreground mt-0.5">{time}</p></div></div>)}</CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={UserPlus} title="Quick Invite" description="Send a team invitation" /><CardContent className="px-5 py-4 flex flex-col gap-3"><Input placeholder="colleague@company.com" className="h-8 text-xs bg-background/60 border-border/50" /><div className="relative"><select className="w-full h-8 pl-3 pr-7 text-xs rounded-md border border-border/50 bg-background/60 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40">{['Viewer', 'Editor', 'Manager', 'Admin'].map((role) => <option key={role}>{role}</option>)}</select><ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" /></div><Button size="sm" className="h-8 text-xs w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"><Send className="w-3.5 h-3.5" /> Send Invitation</Button><div className="flex items-center justify-between pt-1 border-t border-border/40"><span className="text-[10px] text-muted-foreground">Allow self-registration</span><Switch className="scale-75" /></div></CardContent></Card>
        </div>
      </div>
    </div>
  );
}
