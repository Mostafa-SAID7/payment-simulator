'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, Bell, Check, CheckCircle2, Clipboard, CloudDownload, Code2, Copy, CreditCard, KeyRound, Laptop, Lock, LogOut, Mail, Monitor, Palette, Pencil, Plus, RefreshCw, Save, Send, ShieldCheck, Smartphone, Trash2, UserRound, Users, X, Zap } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

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

function SettingRow({ title, description, children, className = '' }: { title: string; description: string; children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-between gap-4 py-2 ${className}`}><div className="flex items-center justify-between gap-4 py-2-copy"><strong>{title}</strong><span>{description}</span></div>{children}</div>;
}

function SectionTitle({ icon: Icon, title, description }: { icon: typeof UserRound; title: string; description: string }) {
  return <CardHeader className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border/60"><div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0 [&_svg]:w-4 [&_svg]:h-4"><Icon /></div><div><CardTitle className="text-sm font-semibold text-foreground">{title}</CardTitle><CardDescription className="text-xs text-muted-foreground">{description}</CardDescription></div></CardHeader>;
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
    setApiKey('pk_live_••••••••••••••••' + Math.random().toString(16).slice(2, 6));
    setFeedback('A new API key has been generated.');
  }

  function copyApiKey() {
    void navigator.clipboard?.writeText(apiKey);
    setFeedback('API key copied to clipboard.');
  }

  function exportData() {
    const exportPayload = JSON.stringify({ profile, notifications, paymentPreferences }, null, 2);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([exportPayload], { type: 'application/json' }));
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
    setInviteEmail('');
    setFeedback(`Invitation sent to ${inviteEmail}.`);
  }

  return (
    <div className="flex flex-col gap-3 pb-4">

      <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-3 items-start">
        <aside className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden sticky top-20 p-2" aria-label="Settings sections">
          <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Workspace settings</div>
          <a href="#profile"><UserRound />Profile</a><a href="#security"><ShieldCheck />Security</a><a href="#notifications"><Bell />Notifications</a><a href="#appearance"><Palette />Appearance</a><a href="#payments"><CreditCard />Payment preferences</a><a href="#integrations"><Code2 />Integrations</a><a href="#team"><Users />Team & billing</a><a href="#privacy"><Lock />Privacy & data</a>
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-success mt-2 border-t border-border/60 pt-2 [&_svg]:w-4 [&_svg]:h-4 [&_small]:text-[10px] [&_small]:text-muted-foreground [&_span]:flex [&_span]:flex-col"><CheckCircle2 /><span>Workspace protected<small>Last checked just now</small></span></div>
        </aside>

        <div className="flex flex-col gap-3">
          {feedback && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm [&_svg]:w-4 [&_svg]:h-4 [&_button]:ml-auto [&_button]:text-success/70 [&_button]:hover:text-success" role="status"><CheckCircle2 /><span>{feedback}</span><button type="button" aria-label="Dismiss notification" onClick={() => setFeedback('')}><X /></button></div>}

          <Card id="profile" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={UserRound} title="Profile & account" description="Keep your identity and workspace details up to date" /><CardContent className="p-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 mb-4"><span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold shrink-0">{profile.firstName[0]}{profile.lastName[0]}</span><span><strong>{profile.firstName} {profile.lastName}</strong><small>{profile.email}</small></span><Badge variant="outline">Owner</Badge></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"><div><Label htmlFor="settings-first-name">First name</Label><Input id="settings-first-name" value={profile.firstName} onChange={(event) => updateProfile('firstName', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="settings-last-name">Last name</Label><Input id="settings-last-name" value={profile.lastName} onChange={(event) => updateProfile('lastName', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="settings-email">Email address</Label><Input id="settings-email" type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="settings-phone">Phone number</Label><Input id="settings-phone" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="settings-company">Company</Label><Input id="settings-company" value={profile.company} onChange={(event) => updateProfile('company', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="settings-role">Role</Label><Input id="settings-role" value={profile.role} onChange={(event) => updateProfile('role', event.target.value)} className="h-8 text-xs" /></div></div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground"><span>{profileDirty ? 'You have unsaved changes' : 'Your profile is up to date'}</span><div><Button variant="outline" className="h-8 text-xs" onClick={cancelProfile} disabled={!profileDirty}>Cancel</Button><Button className="h-8 text-xs gap-2" onClick={saveProfile} disabled={!profileDirty}><Save />Save changes</Button></div></div>
          </CardContent></Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card id="security" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={ShieldCheck} title="Security" description="Protect access to your workspace" /><CardContent className="p-4"><div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30 mb-3"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/20 text-success shrink-0 [&_svg]:w-4 [&_svg]:h-4"><ShieldCheck /></span><span><strong>Strong security posture</strong><small>Two-factor authentication is enabled</small></span><Badge className="bg-success/10 text-success border-success/30 text-[10px]">Protected</Badge></div><div className="flex flex-col gap-3"><div><Label htmlFor="current-password">Current password</Label><Input id="current-password" type="password" placeholder="••••••••••" className="h-8 text-xs" /></div><div><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" placeholder="Use 8 or more characters" className="h-8 text-xs" /></div></div><Button variant="outline" className="h-8 text-xs">Update password</Button><div className="h-px bg-border/60 my-1" /><SettingRow title="Two-factor authentication" description="Require a verification code at sign in"><Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} aria-label="Toggle two-factor authentication" /></SettingRow></CardContent></Card>

            <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Laptop} title="Active sessions" description="Devices currently signed in to your account" /><CardContent className="p-4"><div className="flex flex-col gap-2 mb-3">{sessions.length ? sessions.map((session) => { const Icon = session.icon; return <div className="flex items-center gap-3" key={session.device}><span className="flex items-center gap-3-icon"><Icon /></span><span><strong>{session.device} {session.current && <Badge variant="outline">This device</Badge>}</strong><small>{session.location} · {session.lastActive}</small></span></div>; }) : <div className="flex items-center gap-2 text-sm text-success [&_svg]:w-4 [&_svg]:h-4"><CheckCircle2 />No other active sessions</div>}</div><Button variant="outline" className="h-8 text-xs gap-2" onClick={() => setConfirmAction('logout')} disabled={sessions.length === 0}><LogOut />Log out all other devices</Button></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card id="notifications" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Bell} title="Notifications" description="Choose what reaches your inbox and devices" /><CardContent className="p-4 flex items-center justify-between gap-4 py-2-list"><SettingRow title="Payment activity" description="Successful payment and batch updates"><Switch checked={notifications.payments} onCheckedChange={(checked) => updateNotification('payments', checked)} /></SettingRow><SettingRow title="Settlement updates" description="Know when funds are available"><Switch checked={notifications.settlements} onCheckedChange={(checked) => updateNotification('settlements', checked)} /></SettingRow><SettingRow title="Failed transactions" description="Get notified when a payment needs review"><Switch checked={notifications.failed} onCheckedChange={(checked) => updateNotification('failed', checked)} /></SettingRow><SettingRow title="Security alerts" description="Sign-ins, password, and access changes"><Switch checked={notifications.security} onCheckedChange={(checked) => updateNotification('security', checked)} /></SettingRow><SettingRow title="Product updates" description="Tips and news from FinPay"><Switch checked={notifications.marketing} onCheckedChange={(checked) => updateNotification('marketing', checked)} /></SettingRow></CardContent></Card>

            <Card id="appearance" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Palette} title="Appearance" description="Tune how FinPay feels for your team" /><CardContent className="p-4 flex flex-col gap-3"><div><Label>Theme</Label><Select value={theme} onValueChange={setTheme}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="system">Use system setting</SelectItem></SelectContent></Select></div><div><Label>Interface density</Label><Select value={density} onValueChange={setDensity}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="comfortable">Comfortable</SelectItem><SelectItem value="compact">Compact</SelectItem></SelectContent></Select></div><div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 text-sm [&_svg]:w-5 [&_svg]:h-5 [&_svg]:text-muted-foreground [&_strong]:text-foreground [&_strong]:text-xs [&_small]:text-muted-foreground [&_small]:text-[10px]"><Monitor /><span><strong>{theme === 'dark' ? 'Dark workspace' : theme === 'light' ? 'Light workspace' : 'System workspace'}</strong><small>{density === 'compact' ? 'More information, less space' : 'Balanced spacing and readability'}</small></span></div></CardContent></Card>
          </div>

          <Card id="payments" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={CreditCard} title="Payment preferences" description="Set safe defaults for payment creation and settlement" /><CardContent className="p-4"><div className="grid grid-cols-1 sm:grid-cols-3 gap-3"><div><Label>Default payment rail</Label><Select value={paymentPreferences.paymentType} onValueChange={(value) => updatePaymentPreference('paymentType', value)}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ACH">ACH</SelectItem><SelectItem value="RTGS">RTGS</SelectItem><SelectItem value="WPS">WPS</SelectItem></SelectContent></Select></div><div><Label>Settlement timing</Label><Select value={paymentPreferences.settlement} onValueChange={(value) => updatePaymentPreference('settlement', value)}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="same-day">Same day</SelectItem><SelectItem value="next-day">Next business day</SelectItem><SelectItem value="scheduled">Scheduled date</SelectItem></SelectContent></Select></div><div><Label>Confirmation behavior</Label><Select value={paymentPreferences.confirmation} onValueChange={(value) => updatePaymentPreference('confirmation', value)}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="before-submit">Confirm before submit</SelectItem><SelectItem value="never">Skip confirmation</SelectItem></SelectContent></Select></div></div><div className="h-px bg-border/60 my-1" /><SettingRow title="Automatic retry" description="Retry recoverable payment failures once"><Switch checked={paymentPreferences.autoRetry} onCheckedChange={(checked) => updatePaymentPreference('autoRetry', checked)} /></SettingRow></CardContent></Card>

          <Card id="integrations" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Code2} title="Connected accounts & API" description="Manage services and credentials connected to this workspace" /><CardContent className="p-4"><div className="flex flex-col gap-2"><div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"><span className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50-logo flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50-logo-stripe">S</span><span><strong>Stripe</strong><small>Payment processing and payouts</small></span><Badge className="bg-success/10 text-success border-success/30 text-[10px]">Connected</Badge><Button variant="outline" className="h-8 text-xs" onClick={() => { setConnectedStripe(!connectedStripe); setFeedback(connectedStripe ? 'Stripe connection revoked.' : 'Stripe connection restored.'); }}>{connectedStripe ? 'Revoke' : 'Reconnect'}</Button></div><div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"><span className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50-logo flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50-logo-slack">#</span><span><strong>Slack</strong><small>Operational alerts in #payments</small></span><Badge className={connectedSlack ? 'bg-success/10 text-success border-success/30 text-[10px]' : ''} variant={connectedSlack ? 'default' : 'outline'}>{connectedSlack ? 'Connected' : 'Disconnected'}</Badge><Button variant="outline" className="h-8 text-xs" onClick={() => { setConnectedSlack(!connectedSlack); setFeedback(connectedSlack ? 'Slack connection revoked.' : 'Slack connection restored.'); }}>{connectedSlack ? 'Revoke' : 'Connect'}</Button></div></div><div className="h-px bg-border/60 my-1" /><div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50 mt-2"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-muted-foreground shrink-0 [&_svg]:w-4 [&_svg]:h-4"><KeyRound /></span><span><strong>Production API key</strong><small>Use this key for server-side requests</small></span><div className="flex items-center gap-2 ml-auto"><code>{apiKey}</code><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label="Copy API key" onClick={copyApiKey}><Copy /></Button><Button variant="outline" className="h-8 text-xs gap-2" onClick={regenerateApiKey}><RefreshCw />Regenerate</Button></div></div></CardContent></Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card id="team" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Users} title="Team members" description="Manage access across your workspace" /><CardContent className="p-4"><div className="flex flex-col gap-2 mb-3">{members.map((member) => <div className="flex items-center gap-3" key={member.email}><span className="flex items-center gap-3-avatar">{member.initials}</span><span><strong>{member.name}</strong><small>{member.email}</small></span><Badge variant={member.status === 'Active' ? 'outline' : 'secondary'}>{member.role}</Badge><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`Edit ${member.name}`}><Pencil /></Button></div>)}</div><div className="flex gap-2 mt-3"><Input aria-label="Invite team member email" type="email" placeholder="teammate@company.com" value={inviteEmail} onChange={(event) => { setInviteEmail(event.target.value); setInviteSent(false); }} className="h-8 text-xs" /><Button className="h-8 text-xs gap-2" onClick={sendInvite}><Send />Invite</Button></div>{inviteSent && <p className="flex items-center gap-1.5 text-xs text-success mt-1 [&_svg]:w-3.5 [&_svg]:h-3.5"><Check />Invitation queued successfully</p>}</CardContent></Card>

            <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden settings-billing-card"><SectionTitle icon={Zap} title="Plan & billing" description="Unlock more capacity for your workspace" /><CardContent className="p-4"><div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 mb-3"><span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent shrink-0 [&_svg]:w-4 [&_svg]:h-4"><Zap /></span><span><strong>{planActivated ? 'Super plan' : 'Free plan'}</strong><small>{planActivated ? 'Active until next renewal' : 'Good for getting started'}</small></span><Badge variant="outline">{planActivated ? 'Active' : 'Current'}</Badge></div><ul><li>Unlimited payment workflows</li><li>Advanced approval controls</li><li>Priority support and reporting</li></ul><Button className="w-full h-8 text-xs gap-2 bg-gradient-to-r from-accent/80 to-primary/80" onClick={() => { setPlanActivated(true); setFeedback('Super plan activated for your workspace.'); }} disabled={planActivated}><Zap />{planActivated ? 'Super plan active' : 'Activate Super'}</Button></CardContent></Card>
          </div>

          <Card id="privacy" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><SectionTitle icon={Lock} title="Privacy, data & danger zone" description="Control your data and irreversible account actions" /><CardContent className="p-4"><div className="flex flex-col gap-1 mb-3"><SettingRow title="Export account data" description="Download your profile and preference data as JSON"><Button variant="outline" className="h-8 text-xs gap-2" onClick={exportData}><CloudDownload />Export data</Button></SettingRow><SettingRow title="Clear local preferences" description="Reset this browser's local display choices"><Button variant="outline" className="h-8 text-xs" onClick={() => { setTheme('dark'); setDensity('comfortable'); setFeedback('Local display preferences reset.'); }}>Reset</Button></SettingRow></div><div className="flex flex-col gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20 mt-3"><div><strong>Danger zone</strong><span>These actions affect account access and cannot be easily undone.</span></div><div className="flex flex-wrap gap-2"><Button variant="outline" className="h-8 text-xs gap-2 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setConfirmAction('logout')}><LogOut />Log out all devices</Button><Button variant="destructive" className="h-8 text-xs gap-2" onClick={() => setConfirmAction('delete')}><Trash2 />Delete account</Button></div></div></CardContent></Card>
        </div>
      </div>

      <AlertDialog open={confirmAction !== null} onOpenChange={(open) => !open && setConfirmAction(null)}><AlertDialogContent className="max-w-md"><AlertDialogHeader><AlertDialogTitle>{confirmAction === 'delete' ? 'Delete your account?' : 'Log out all other devices?'}</AlertDialogTitle><AlertDialogDescription>{confirmAction === 'delete' ? 'This submits a deletion request and removes access to your FinPay workspace. This action cannot be easily undone.' : 'All other active sessions will be signed out. Your current device will remain connected.'}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel><AlertDialogAction className={confirmAction === 'delete' ? 'bg-destructive hover:bg-destructive/90' : ''} onClick={confirmDestructiveAction}>{confirmAction === 'delete' ? 'Delete account' : 'Log out devices'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
