'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, Bell, Check, CheckCircle2, Clipboard, CloudDownload, Code2, Copy, CreditCard, KeyRound, Laptop, Lock, LogOut, Mail, Monitor, Palette, Pencil, Plus, RefreshCw, Save, Send, ShieldCheck, Smartphone, Trash2, UserRound, Users, X, Zap } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
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
  return <div className={`settings-row ${className}`}><div className="settings-row-copy"><strong>{title}</strong><span>{description}</span></div>{children}</div>;
}

function SectionTitle({ icon: Icon, title, description }: { icon: typeof UserRound; title: string; description: string }) {
  return <CardHeader className="compact-card-header settings-section-header"><div className="settings-section-icon"><Icon /></div><div><CardTitle className="compact-panel-title">{title}</CardTitle><CardDescription className="compact-panel-description">{description}</CardDescription></div></CardHeader>;
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
    <div className="settings-page page-stack compact-route-page">
      <PageHeader title="Settings" description="Control your FinPay workspace, security, preferences, and connected services" />

      <div className="settings-layout">
        <aside className="dashboard-card settings-nav-card" aria-label="Settings sections">
          <div className="settings-nav-label">Workspace settings</div>
          <a href="#profile"><UserRound />Profile</a><a href="#security"><ShieldCheck />Security</a><a href="#notifications"><Bell />Notifications</a><a href="#appearance"><Palette />Appearance</a><a href="#payments"><CreditCard />Payment preferences</a><a href="#integrations"><Code2 />Integrations</a><a href="#team"><Users />Team & billing</a><a href="#privacy"><Lock />Privacy & data</a>
          <div className="settings-nav-status"><CheckCircle2 /><span>Workspace protected<small>Last checked just now</small></span></div>
        </aside>

        <div className="settings-content">
          {feedback && <div className="settings-feedback" role="status"><CheckCircle2 /><span>{feedback}</span><button type="button" aria-label="Dismiss notification" onClick={() => setFeedback('')}><X /></button></div>}

          <Card id="profile" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={UserRound} title="Profile & account" description="Keep your identity and workspace details up to date" /><CardContent className="compact-card-content">
            <div className="settings-profile-banner"><span className="settings-avatar">{profile.firstName[0]}{profile.lastName[0]}</span><span><strong>{profile.firstName} {profile.lastName}</strong><small>{profile.email}</small></span><Badge variant="outline">Owner</Badge></div>
            <div className="settings-form-grid"><div><Label htmlFor="settings-first-name">First name</Label><Input id="settings-first-name" value={profile.firstName} onChange={(event) => updateProfile('firstName', event.target.value)} className="compact-input" /></div><div><Label htmlFor="settings-last-name">Last name</Label><Input id="settings-last-name" value={profile.lastName} onChange={(event) => updateProfile('lastName', event.target.value)} className="compact-input" /></div><div><Label htmlFor="settings-email">Email address</Label><Input id="settings-email" type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} className="compact-input" /></div><div><Label htmlFor="settings-phone">Phone number</Label><Input id="settings-phone" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} className="compact-input" /></div><div><Label htmlFor="settings-company">Company</Label><Input id="settings-company" value={profile.company} onChange={(event) => updateProfile('company', event.target.value)} className="compact-input" /></div><div><Label htmlFor="settings-role">Role</Label><Input id="settings-role" value={profile.role} onChange={(event) => updateProfile('role', event.target.value)} className="compact-input" /></div></div>
            <div className="settings-card-actions"><span>{profileDirty ? 'You have unsaved changes' : 'Your profile is up to date'}</span><div><Button variant="outline" className="compact-secondary-button" onClick={cancelProfile} disabled={!profileDirty}>Cancel</Button><Button className="compact-primary-button gap-2" onClick={saveProfile} disabled={!profileDirty}><Save />Save changes</Button></div></div>
          </CardContent></Card>

          <div className="settings-two-column">
            <Card id="security" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={ShieldCheck} title="Security" description="Protect access to your workspace" /><CardContent className="compact-card-content"><div className="settings-security-status"><span className="settings-status-icon"><ShieldCheck /></span><span><strong>Strong security posture</strong><small>Two-factor authentication is enabled</small></span><Badge className="settings-success-badge">Protected</Badge></div><div className="settings-form-stack"><div><Label htmlFor="current-password">Current password</Label><Input id="current-password" type="password" placeholder="••••••••••" className="compact-input" /></div><div><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" placeholder="Use 8 or more characters" className="compact-input" /></div></div><Button variant="outline" className="compact-secondary-button">Update password</Button><div className="settings-divider" /><SettingRow title="Two-factor authentication" description="Require a verification code at sign in"><Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} aria-label="Toggle two-factor authentication" /></SettingRow></CardContent></Card>

            <Card className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Laptop} title="Active sessions" description="Devices currently signed in to your account" /><CardContent className="compact-card-content"><div className="settings-session-list">{sessions.length ? sessions.map((session) => { const Icon = session.icon; return <div className="settings-session" key={session.device}><span className="settings-session-icon"><Icon /></span><span><strong>{session.device} {session.current && <Badge variant="outline">This device</Badge>}</strong><small>{session.location} · {session.lastActive}</small></span></div>; }) : <div className="settings-no-sessions"><CheckCircle2 />No other active sessions</div>}</div><Button variant="outline" className="compact-secondary-button gap-2" onClick={() => setConfirmAction('logout')} disabled={sessions.length === 0}><LogOut />Log out all other devices</Button></CardContent></Card>
          </div>

          <div className="settings-two-column">
            <Card id="notifications" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Bell} title="Notifications" description="Choose what reaches your inbox and devices" /><CardContent className="compact-card-content settings-row-list"><SettingRow title="Payment activity" description="Successful payment and batch updates"><Switch checked={notifications.payments} onCheckedChange={(checked) => updateNotification('payments', checked)} /></SettingRow><SettingRow title="Settlement updates" description="Know when funds are available"><Switch checked={notifications.settlements} onCheckedChange={(checked) => updateNotification('settlements', checked)} /></SettingRow><SettingRow title="Failed transactions" description="Get notified when a payment needs review"><Switch checked={notifications.failed} onCheckedChange={(checked) => updateNotification('failed', checked)} /></SettingRow><SettingRow title="Security alerts" description="Sign-ins, password, and access changes"><Switch checked={notifications.security} onCheckedChange={(checked) => updateNotification('security', checked)} /></SettingRow><SettingRow title="Product updates" description="Tips and news from FinPay"><Switch checked={notifications.marketing} onCheckedChange={(checked) => updateNotification('marketing', checked)} /></SettingRow></CardContent></Card>

            <Card id="appearance" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Palette} title="Appearance" description="Tune how FinPay feels for your team" /><CardContent className="compact-card-content settings-form-stack"><div><Label>Theme</Label><Select value={theme} onValueChange={setTheme}><SelectTrigger className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="system">Use system setting</SelectItem></SelectContent></Select></div><div><Label>Interface density</Label><Select value={density} onValueChange={setDensity}><SelectTrigger className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="comfortable">Comfortable</SelectItem><SelectItem value="compact">Compact</SelectItem></SelectContent></Select></div><div className="settings-preview"><Monitor /><span><strong>{theme === 'dark' ? 'Dark workspace' : theme === 'light' ? 'Light workspace' : 'System workspace'}</strong><small>{density === 'compact' ? 'More information, less space' : 'Balanced spacing and readability'}</small></span></div></CardContent></Card>
          </div>

          <Card id="payments" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={CreditCard} title="Payment preferences" description="Set safe defaults for payment creation and settlement" /><CardContent className="compact-card-content"><div className="settings-preference-grid"><div><Label>Default payment rail</Label><Select value={paymentPreferences.paymentType} onValueChange={(value) => updatePaymentPreference('paymentType', value)}><SelectTrigger className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ACH">ACH</SelectItem><SelectItem value="RTGS">RTGS</SelectItem><SelectItem value="WPS">WPS</SelectItem></SelectContent></Select></div><div><Label>Settlement timing</Label><Select value={paymentPreferences.settlement} onValueChange={(value) => updatePaymentPreference('settlement', value)}><SelectTrigger className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="same-day">Same day</SelectItem><SelectItem value="next-day">Next business day</SelectItem><SelectItem value="scheduled">Scheduled date</SelectItem></SelectContent></Select></div><div><Label>Confirmation behavior</Label><Select value={paymentPreferences.confirmation} onValueChange={(value) => updatePaymentPreference('confirmation', value)}><SelectTrigger className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="before-submit">Confirm before submit</SelectItem><SelectItem value="never">Skip confirmation</SelectItem></SelectContent></Select></div></div><div className="settings-divider" /><SettingRow title="Automatic retry" description="Retry recoverable payment failures once"><Switch checked={paymentPreferences.autoRetry} onCheckedChange={(checked) => updatePaymentPreference('autoRetry', checked)} /></SettingRow></CardContent></Card>

          <Card id="integrations" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Code2} title="Connected accounts & API" description="Manage services and credentials connected to this workspace" /><CardContent className="compact-card-content"><div className="settings-integration-list"><div className="settings-integration"><span className="settings-integration-logo settings-integration-logo-stripe">S</span><span><strong>Stripe</strong><small>Payment processing and payouts</small></span><Badge className="settings-success-badge">Connected</Badge><Button variant="outline" className="compact-secondary-button" onClick={() => { setConnectedStripe(!connectedStripe); setFeedback(connectedStripe ? 'Stripe connection revoked.' : 'Stripe connection restored.'); }}>{connectedStripe ? 'Revoke' : 'Reconnect'}</Button></div><div className="settings-integration"><span className="settings-integration-logo settings-integration-logo-slack">#</span><span><strong>Slack</strong><small>Operational alerts in #payments</small></span><Badge className={connectedSlack ? 'settings-success-badge' : ''} variant={connectedSlack ? 'default' : 'outline'}>{connectedSlack ? 'Connected' : 'Disconnected'}</Badge><Button variant="outline" className="compact-secondary-button" onClick={() => { setConnectedSlack(!connectedSlack); setFeedback(connectedSlack ? 'Slack connection revoked.' : 'Slack connection restored.'); }}>{connectedSlack ? 'Revoke' : 'Connect'}</Button></div></div><div className="settings-divider" /><div className="settings-api-row"><span className="settings-api-icon"><KeyRound /></span><span><strong>Production API key</strong><small>Use this key for server-side requests</small></span><div className="settings-api-actions"><code>{apiKey}</code><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label="Copy API key" onClick={copyApiKey}><Copy /></Button><Button variant="outline" className="compact-secondary-button gap-2" onClick={regenerateApiKey}><RefreshCw />Regenerate</Button></div></div></CardContent></Card>

          <div className="settings-two-column">
            <Card id="team" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Users} title="Team members" description="Manage access across your workspace" /><CardContent className="compact-card-content"><div className="settings-member-list">{members.map((member) => <div className="settings-member" key={member.email}><span className="settings-member-avatar">{member.initials}</span><span><strong>{member.name}</strong><small>{member.email}</small></span><Badge variant={member.status === 'Active' ? 'outline' : 'secondary'}>{member.role}</Badge><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`Edit ${member.name}`}><Pencil /></Button></div>)}</div><div className="settings-invite"><Input aria-label="Invite team member email" type="email" placeholder="teammate@company.com" value={inviteEmail} onChange={(event) => { setInviteEmail(event.target.value); setInviteSent(false); }} className="compact-input" /><Button className="compact-primary-button gap-2" onClick={sendInvite}><Send />Invite</Button></div>{inviteSent && <p className="settings-inline-success"><Check />Invitation queued successfully</p>}</CardContent></Card>

            <Card className="dashboard-card compact-settings-card settings-section-card settings-billing-card"><SectionTitle icon={Zap} title="Plan & billing" description="Unlock more capacity for your workspace" /><CardContent className="compact-card-content"><div className="settings-plan-badge"><span className="settings-plan-icon"><Zap /></span><span><strong>{planActivated ? 'Super plan' : 'Free plan'}</strong><small>{planActivated ? 'Active until next renewal' : 'Good for getting started'}</small></span><Badge variant="outline">{planActivated ? 'Active' : 'Current'}</Badge></div><ul><li>Unlimited payment workflows</li><li>Advanced approval controls</li><li>Priority support and reporting</li></ul><Button className="settings-upgrade-button gap-2" onClick={() => { setPlanActivated(true); setFeedback('Super plan activated for your workspace.'); }} disabled={planActivated}><Zap />{planActivated ? 'Super plan active' : 'Activate Super'}</Button></CardContent></Card>
          </div>

          <Card id="privacy" className="dashboard-card compact-settings-card settings-section-card"><SectionTitle icon={Lock} title="Privacy, data & danger zone" description="Control your data and irreversible account actions" /><CardContent className="compact-card-content"><div className="settings-data-actions"><SettingRow title="Export account data" description="Download your profile and preference data as JSON"><Button variant="outline" className="compact-secondary-button gap-2" onClick={exportData}><CloudDownload />Export data</Button></SettingRow><SettingRow title="Clear local preferences" description="Reset this browser's local display choices"><Button variant="outline" className="compact-secondary-button" onClick={() => { setTheme('dark'); setDensity('comfortable'); setFeedback('Local display preferences reset.'); }}>Reset</Button></SettingRow></div><div className="settings-danger-zone"><div><strong>Danger zone</strong><span>These actions affect account access and cannot be easily undone.</span></div><div className="settings-danger-actions"><Button variant="outline" className="compact-secondary-button gap-2 settings-danger-button" onClick={() => setConfirmAction('logout')}><LogOut />Log out all devices</Button><Button variant="destructive" className="compact-secondary-button gap-2" onClick={() => setConfirmAction('delete')}><Trash2 />Delete account</Button></div></div></CardContent></Card>
        </div>
      </div>

      <AlertDialog open={confirmAction !== null} onOpenChange={(open) => !open && setConfirmAction(null)}><AlertDialogContent className="settings-confirm-dialog"><AlertDialogHeader><AlertDialogTitle>{confirmAction === 'delete' ? 'Delete your account?' : 'Log out all other devices?'}</AlertDialogTitle><AlertDialogDescription>{confirmAction === 'delete' ? 'This submits a deletion request and removes access to your FinPay workspace. This action cannot be easily undone.' : 'All other active sessions will be signed out. Your current device will remain connected.'}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel className="compact-secondary-button">Cancel</AlertDialogCancel><AlertDialogAction className={confirmAction === 'delete' ? 'bg-destructive hover:bg-destructive/90' : ''} onClick={confirmDestructiveAction}>{confirmAction === 'delete' ? 'Delete account' : 'Log out devices'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
