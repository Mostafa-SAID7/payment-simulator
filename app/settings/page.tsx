'use client';

import { useMemo, useState } from 'react';
import { Bell, Check, CheckCircle2, CloudDownload, Code2, Copy, CreditCard, KeyRound, Laptop, Lock, LogOut, Monitor, Palette, Pencil, RefreshCw, Save, Send, ShieldCheck, Smartphone, Trash2, UserRound, Users, X, Zap, Settings2, Globe, Mail, Phone, Building2, ToggleLeft } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const initialProfile = { firstName: 'John', lastName: 'Administrator', email: 'admin@finpay.com', phone: '+1 (555) 123-4567', company: 'FinPay Corp', role: 'Payment Administrator' };
const initialNotifications = { payments: true, settlements: true, failed: true, security: true, marketing: false };
const initialPaymentPreferences = { paymentType: 'ACH', confirmation: 'before-submit', autoRetry: true, settlement: 'same-day' };

type ConfirmAction = 'logout' | 'delete' | null;
type Profile = typeof initialProfile;
type Notifications = typeof initialNotifications;
type PaymentPreferences = typeof initialPaymentPreferences;

const members = [
  { initials: 'JA', name: 'John Administrator', email: 'admin@finpay.com', role: 'Owner', status: 'Active' },
  { initials: 'MC', name: 'Maria Chen', email: 'maria@finpay.com', role: 'Manager', status: 'Active' },
  { initials: 'DK', name: 'David Kim', email: 'david@finpay.com', role: 'Viewer', status: 'Invited' },
];

const initialSessions = [
  { device: 'MacBook Pro', location: 'New York, US', lastActive: 'Active now', icon: Laptop, current: true },
  { device: 'iPhone 15 Pro', location: 'New York, US', lastActive: '2 hours ago', icon: Smartphone, current: false },
];

const workspaceStats = [
  { label: 'Team members', value: '3', icon: Users, color: 'text-primary' },
  { label: 'Integrations', value: '2', icon: Code2, color: 'text-success' },
  { label: 'Security score', value: '94%', icon: ShieldCheck, color: 'text-warning' },
  { label: 'Active sessions', value: '2', icon: Globe, color: 'text-info' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
      {children}
    </p>
  );
}

function SettingRow({ title, description, children, className = '' }: { title: string; description: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0', className)}>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold text-foreground truncate">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function CardSectionHeader({ icon: Icon, title, description, accent = false }: { icon: typeof UserRound; title: string; description: string; accent?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 px-5 pt-3 pb-4 border-b border-border/50', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}>
      <div className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">{description}</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [savedProfile, setSavedProfile] = useState<Profile>(initialProfile);
  const [notifications, setNotifications] = useState<Notifications>(initialNotifications);
  const [paymentPreferences, setPaymentPreferences] = useState<PaymentPreferences>(initialPaymentPreferences);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [density, setDensity] = useState('comfortable');
  const [sessions, setSessions] = useState(initialSessions);
  const [apiKey, setApiKey] = useState('pk_live_••••••••••••••••8af2');
  const [connectedStripe, setConnectedStripe] = useState(true);
  const [connectedSlack, setConnectedSlack] = useState(true);
  const [planActivated, setPlanActivated] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const profileDirty = useMemo(() => JSON.stringify(profile) !== JSON.stringify(savedProfile), [profile, savedProfile]);
  const initials = `${profile.firstName[0] ?? ''}${profile.lastName[0] ?? ''}`;

  function updateProfile(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setFeedback('');
  }

  function saveProfile() {
    setSavedProfile(profile);
    setFeedback('Profile changes saved successfully.');
  }

  function cancelProfile() {
    setProfile(savedProfile);
    setFeedback('');
  }

  function updateNotification(field: keyof Notifications, checked: boolean) {
    setNotifications((current) => ({ ...current, [field]: checked }));
    setFeedback('Notification preferences updated.');
  }

  function updatePaymentPreference(field: keyof PaymentPreferences, value: string | boolean) {
    setPaymentPreferences((current) => ({ ...current, [field]: value } as PaymentPreferences));
    setFeedback('Payment preferences updated.');
  }

  function regenerateApiKey() {
    setApiKey(`pk_live_••••••••••••••••${Math.random().toString(16).slice(2, 6)}`);
    setFeedback('A new API key has been generated.');
  }

  function copyApiKey() {
    void navigator.clipboard?.writeText(apiKey);
    setFeedback('API key copied to clipboard.');
  }

  function exportData() {
    const payload = JSON.stringify({ profile, notifications, paymentPreferences }, null, 2);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
    link.download = 'finpay-account-data.json';
    link.click();
    setFeedback('Your account data export is ready.');
  }

  function confirmDestructiveAction() {
    if (confirmAction === 'logout') {
      setSessions([]);
      setFeedback('All other sessions have been signed out.');
    }
    if (confirmAction === 'delete') setFeedback('Account deletion request submitted for review.');
    setConfirmAction(null);
  }

  function sendInvite() {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setFeedback(`Invitation sent to ${inviteEmail}.`);
    setInviteEmail('');
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      {feedback && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-success/10 border border-success/25 text-success text-xs font-medium shadow-sm" role="status">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="flex-1">{feedback}</span>
          <button type="button" aria-label="Dismiss" onClick={() => setFeedback('')} className="text-success/60 hover:text-success transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/15 to-accent/20 border border-primary/20 flex items-center justify-center shadow-lg">
                <Settings2 className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-card shadow-sm" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Workspace Settings</h1>
                <Badge variant="secondary" className="text-[0.6rem] px-2 py-0.5 font-semibold bg-primary/10 text-primary border-primary/20">
                  Administrator
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {profile.role} · {profile.company}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-primary/60" />{profile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-primary/60" />{profile.phone}</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3 text-primary/60" />{profile.company}</span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-3 sm:gap-2 sm:items-end shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-[0.65rem] text-muted-foreground/60 uppercase tracking-wider font-medium">Last updated</p>
                <p className="text-xs font-semibold text-foreground">Just now</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-success/10 border border-success/20">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[0.65rem] font-semibold text-success">Workspace protected</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-border/50">
            {workspaceStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0"><Icon className={`w-3.5 h-3.5 ${stat.color}`} /></div>
                  <div><p className="text-sm font-bold text-foreground leading-none">{stat.value}</p><p className="text-[0.65rem] text-muted-foreground mt-0.5">{stat.label}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Card id="profile" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
        <CardSectionHeader icon={UserRound} title="Profile & account" description="Keep your identity and workspace details up to date" accent />
        <CardContent className="p-5">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-border/50 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/15 to-accent/20 border border-primary/20 flex items-center justify-center shadow-md shrink-0">
              <span className="text-base font-bold text-primary tracking-tight">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{profile.firstName} {profile.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
            </div>
            <Badge variant="outline" className="text-[0.6rem] px-2 py-0.5 font-semibold shrink-0">Owner</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'first-name', label: 'First name', field: 'firstName' as keyof Profile, value: profile.firstName },
              { id: 'last-name', label: 'Last name', field: 'lastName' as keyof Profile, value: profile.lastName },
              { id: 'email', label: 'Email address', field: 'email' as keyof Profile, value: profile.email, type: 'email' },
              { id: 'phone', label: 'Phone number', field: 'phone' as keyof Profile, value: profile.phone },
              { id: 'company', label: 'Company', field: 'company' as keyof Profile, value: profile.company },
              { id: 'role', label: 'Role', field: 'role' as keyof Profile, value: profile.role },
            ].map(({ id, label, field, value, type }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <Label htmlFor={`settings-${id}`} className="text-xs font-medium text-muted-foreground">{label}</Label>
                <Input id={`settings-${id}`} type={type ?? 'text'} value={value} onChange={(event) => updateProfile(field, event.target.value)} className="h-9 text-xs bg-muted/30 border-border/60 focus:bg-background transition-colors" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
            <span className={cn('text-xs', profileDirty ? 'text-warning font-medium' : 'text-muted-foreground')}>
              {profileDirty ? '● Unsaved changes' : '✓ Profile is up to date'}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={cancelProfile} disabled={!profileDirty}>Cancel</Button>
              <Button size="sm" className="h-8 text-xs gap-1.5" onClick={saveProfile} disabled={!profileDirty}><Save className="w-3.5 h-3.5" />Save changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card id="security" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={ShieldCheck} title="Security" description="Protect access to your workspace" accent />
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/8 border border-success/25">
              <div className="w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-success" /></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground">Strong security posture</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">Two-factor authentication is enabled</p></div>
              <Badge className="bg-success/10 text-success border-success/30 text-[0.6rem] shrink-0">Protected</Badge>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-medium text-muted-foreground">Current password</Label><Input type="password" placeholder="••••••••••" className="h-9 text-xs bg-muted/30 border-border/60" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-medium text-muted-foreground">New password</Label><Input type="password" placeholder="Use 8 or more characters" className="h-9 text-xs bg-muted/30 border-border/60" /></div>
            </div>

            <Button variant="outline" size="sm" className="h-8 text-xs self-start">Update password</Button>

            <div className="border-t border-border/50 pt-3">
              <SettingRow title="Two-factor authentication" description="Require a verification code at sign in"><Switch checked={twoFactorEnabled} onCheckedChange={(checked) => { setTwoFactorEnabled(checked); setFeedback(checked ? 'Two-factor authentication enabled.' : 'Two-factor authentication disabled.'); }} aria-label="Toggle two-factor authentication" /></SettingRow>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={Laptop} title="Active sessions" description="Devices currently signed in to your account" />
          <CardContent className="p-5 flex flex-col gap-3">
            {sessions.length ? sessions.map((session) => {
              const Icon = session.icon;
              return (
                <div key={session.device} className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-muted-foreground" /></div>
                  <div className="flex-1 min-w-0"><div className="flex items-center gap-1.5 flex-wrap"><p className="text-xs font-semibold text-foreground">{session.device}</p>{session.current && <Badge variant="outline" className="text-[0.55rem] px-1.5 py-0">This device</Badge>}</div><p className="text-[0.7rem] text-muted-foreground mt-0.5">{session.location} · {session.lastActive}</p></div>
                  {session.current && <span className="w-2 h-2 rounded-full bg-success shrink-0" />}
                </div>
              );
            }) : (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-success/8 border border-success/20 text-success text-xs font-medium"><CheckCircle2 className="w-4 h-4 shrink-0" />No other active sessions</div>
            )}
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 mt-1 self-start" onClick={() => setConfirmAction('logout')} disabled={sessions.length === 0}><LogOut className="w-3.5 h-3.5" />Log out all other devices</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card id="notifications" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={Bell} title="Notifications" description="Choose what reaches your inbox and devices" accent />
          <CardContent className="p-5">
            <SectionLabel>Alert channels</SectionLabel>
            <div className="flex flex-col">
              {[
                { key: 'payments' as keyof Notifications, title: 'Payment activity', desc: 'Successful payments and batch updates' },
                { key: 'settlements' as keyof Notifications, title: 'Settlement updates', desc: 'Know when funds are available' },
                { key: 'failed' as keyof Notifications, title: 'Failed transactions', desc: 'Get notified when a payment needs review' },
                { key: 'security' as keyof Notifications, title: 'Security alerts', desc: 'Sign-ins, password, and access changes' },
                { key: 'marketing' as keyof Notifications, title: 'Product updates', desc: 'Tips and news from FinPay' },
              ].map(({ key, title, desc }) => (
                <SettingRow key={key} title={title} description={desc}><Switch checked={notifications[key]} onCheckedChange={(value) => updateNotification(key, value)} /></SettingRow>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card id="appearance" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={Palette} title="Appearance" description="Tune how FinPay feels for your team" />
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-medium text-muted-foreground">Theme</Label><Select value={theme} onValueChange={setTheme}><SelectTrigger className="h-9 text-xs bg-muted/30 border-border/60"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="system">System setting</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs font-medium text-muted-foreground">Interface density</Label><Select value={density} onValueChange={setDensity}><SelectTrigger className="h-9 text-xs bg-muted/30 border-border/60"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="comfortable">Comfortable</SelectItem><SelectItem value="compact">Compact</SelectItem></SelectContent></Select></div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-border/50">
              <div className="w-9 h-9 rounded-xl bg-muted/80 flex items-center justify-center shrink-0"><Monitor className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground">{theme === 'dark' ? 'Dark workspace' : theme === 'light' ? 'Light workspace' : 'System workspace'}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">{density === 'compact' ? 'More information, less space' : 'Balanced spacing and readability'}</p></div>
              <Badge variant="outline" className="text-[0.6rem] shrink-0 capitalize">{theme}</Badge>
            </div>

            <div className="flex items-center gap-2">
              {['dark', 'light', 'system'].map((value) => (
                <button key={value} type="button" onClick={() => setTheme(value)} className={cn('flex-1 py-2.5 rounded-lg border text-[0.65rem] font-semibold capitalize transition-all', theme === value ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted/60')}>{value}</button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card id="payments" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
        <CardSectionHeader icon={CreditCard} title="Payment preferences" description="Set safe defaults for payment creation and settlement" accent />
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Default payment rail', value: paymentPreferences.paymentType, field: 'paymentType' as keyof PaymentPreferences, options: [{ value: 'ACH', label: 'ACH' }, { value: 'RTGS', label: 'RTGS' }, { value: 'WPS', label: 'WPS' }] },
              { label: 'Settlement timing', value: paymentPreferences.settlement, field: 'settlement' as keyof PaymentPreferences, options: [{ value: 'same-day', label: 'Same day' }, { value: 'next-day', label: 'Next business day' }, { value: 'scheduled', label: 'Scheduled date' }] },
              { label: 'Confirmation behavior', value: paymentPreferences.confirmation, field: 'confirmation' as keyof PaymentPreferences, options: [{ value: 'before-submit', label: 'Confirm before submit' }, { value: 'never', label: 'Skip confirmation' }] },
            ].map(({ label, value, field, options }) => (
              <div key={field} className="flex flex-col gap-1.5"><Label className="text-xs font-medium text-muted-foreground">{label}</Label><Select value={value as string} onValueChange={(nextValue) => updatePaymentPreference(field, nextValue)}><SelectTrigger className="h-9 text-xs bg-muted/30 border-border/60"><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>
            ))}
          </div>
          <div className="border-t border-border/50 pt-3"><SettingRow title="Automatic retry" description="Retry recoverable payment failures once"><Switch checked={paymentPreferences.autoRetry} onCheckedChange={(value) => updatePaymentPreference('autoRetry', value)} /></SettingRow></div>
        </CardContent>
      </Card>

      <Card id="integrations" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
        <CardSectionHeader icon={Code2} title="Connected accounts & API" description="Manage services and credentials connected to this workspace" accent />
        <CardContent className="p-5 flex flex-col gap-4">
          <SectionLabel>Connected services</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'stripe', label: 'Stripe', desc: 'Payment processing and payouts', abbr: 'S', connected: connectedStripe, toggle: () => { setConnectedStripe(!connectedStripe); setFeedback(connectedStripe ? 'Stripe connection revoked.' : 'Stripe connection restored.'); } },
              { key: 'slack', label: 'Slack', desc: 'Operational alerts in #payments', abbr: '#', connected: connectedSlack, toggle: () => { setConnectedSlack(!connectedSlack); setFeedback(connectedSlack ? 'Slack connection revoked.' : 'Slack connection restored.'); } },
            ].map(({ key, label, desc, abbr, connected, toggle }) => (
              <div key={key} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">{abbr}</div>
                <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground">{label}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">{desc}</p></div>
                <div className="flex items-center gap-2 shrink-0"><Badge className={cn('text-[0.6rem]', connected ? 'bg-success/10 text-success border-success/30' : 'bg-muted text-muted-foreground')} variant={connected ? 'default' : 'outline'}>{connected ? 'Connected' : 'Off'}</Badge><Button variant="outline" size="sm" className="h-7 text-[0.7rem] px-2.5" onClick={toggle}>{connected ? 'Revoke' : 'Connect'}</Button></div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-4">
            <SectionLabel>Production API key</SectionLabel>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0"><KeyRound className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground mb-1">Production API key</p><code className="text-[0.7rem] font-mono text-muted-foreground bg-muted/60 px-2 py-1 rounded-md">{apiKey}</code></div>
              <div className="flex items-center gap-2 shrink-0"><Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Copy API key" onClick={copyApiKey}><Copy className="w-3.5 h-3.5" /></Button><Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={regenerateApiKey}><RefreshCw className="w-3 h-3" />Regenerate</Button></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card id="team" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={Users} title="Team members" description="Manage access across your workspace" accent />
          <CardContent className="p-5 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              {members.map((member) => (
                <div key={member.email} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><span className="text-[0.65rem] font-bold text-primary">{member.initials}</span></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground truncate">{member.name}</p><p className="text-[0.65rem] text-muted-foreground truncate">{member.email}</p></div>
                  <Badge variant={member.status === 'Active' ? 'outline' : 'secondary'} className="text-[0.6rem] shrink-0">{member.role}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground shrink-0" aria-label={`Edit ${member.name}`}><Pencil className="w-3 h-3" /></Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Invite teammate</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="teammate@company.com" value={inviteEmail} onChange={(event) => { setInviteEmail(event.target.value); setInviteSent(false); }} className="h-9 text-xs bg-muted/30 border-border/60 flex-1" />
                <Button size="sm" className="h-9 text-xs gap-1.5 shrink-0" onClick={sendInvite}><Send className="w-3.5 h-3.5" />Invite</Button>
              </div>
              {inviteSent && <p className="flex items-center gap-1.5 text-xs text-success mt-2"><Check className="w-3.5 h-3.5" />Invitation queued successfully</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
          <CardSectionHeader icon={Zap} title="Plan & billing" description="Unlock more capacity for your workspace" />
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent/8 to-primary/5 border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/15 flex items-center justify-center shrink-0"><Zap className="w-5 h-5 text-accent" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold text-foreground">{planActivated ? 'Super plan' : 'Free plan'}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">{planActivated ? 'Active until next renewal' : 'Good for getting started'}</p></div>
              <Badge variant="outline" className="text-[0.6rem] shrink-0">{planActivated ? 'Active' : 'Current'}</Badge>
            </div>

            <div className="flex flex-col gap-2">
              {['Unlimited payment workflows', 'Advanced approval controls', 'Priority support and reporting'].map((feature) => <div key={feature} className="flex items-center gap-2.5 text-xs text-muted-foreground"><div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 text-primary" /></div>{feature}</div>)}
            </div>

            <Button className="w-full h-9 text-xs gap-2 bg-gradient-to-r from-accent/80 to-primary/80 hover:from-accent hover:to-primary transition-all shadow-sm" onClick={() => { setPlanActivated(true); setFeedback('Super plan activated for your workspace.'); }} disabled={planActivated}><Zap className="w-3.5 h-3.5" />{planActivated ? 'Super plan active' : 'Activate Super plan'}</Button>
          </CardContent>
        </Card>
      </div>

      <Card id="privacy" className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden py-0 gap-0">
        <CardSectionHeader icon={Lock} title="Privacy, data & danger zone" description="Control your data and irreversible account actions" />
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0"><CloudDownload className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground">Export account data</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">Download profile and preferences as JSON</p></div>
              <Button variant="outline" size="sm" className="h-8 text-xs shrink-0" onClick={exportData}>Export</Button>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0"><ToggleLeft className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground">Clear local preferences</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">Reset this browser&apos;s display choices</p></div>
              <Button variant="outline" size="sm" className="h-8 text-xs shrink-0" onClick={() => { setTheme('dark'); setDensity('comfortable'); setFeedback('Local display preferences reset.'); }}>Reset</Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <div><p className="text-xs font-semibold text-foreground">Danger zone</p><p className="text-[0.7rem] text-muted-foreground mt-0.5">These actions affect account access and cannot be easily undone.</p></div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setConfirmAction('logout')}><LogOut className="w-3.5 h-3.5" />Log out all devices</Button>
              <Button variant="destructive" size="sm" className="h-8 text-xs gap-1.5" onClick={() => setConfirmAction('delete')}><Trash2 className="w-3.5 h-3.5" />Delete account</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={confirmAction !== null} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent className="max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction === 'delete' ? 'Delete your account?' : 'Log out all other devices?'}</AlertDialogTitle>
            <AlertDialogDescription>{confirmAction === 'delete' ? 'This submits a deletion request and removes access to your FinPay workspace. This action cannot be easily undone.' : 'All other active sessions will be signed out. Your current device will remain connected.'}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction className={cn('h-8 text-xs', confirmAction === 'delete' && 'bg-destructive hover:bg-destructive/90')} onClick={confirmDestructiveAction}>{confirmAction === 'delete' ? 'Delete account' : 'Log out devices'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
