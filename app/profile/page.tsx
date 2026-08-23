'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Activity, Bell, Check, CheckCircle2, Clock3, KeyRound, Lock, LogOut, Pencil, Save, ShieldCheck, UserRound, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const initialProfile = { firstName: 'John', lastName: 'Administrator', email: 'admin@finpay.com', phone: '+1 (555) 123-4567', company: 'FinPay Corp', title: 'Payment Administrator' };
const initialNotifications = { paymentUpdates: true, batchAlerts: true, securityAlerts: true, weeklyDigest: false };
const recentActivity = [
  { icon: CheckCircle2, title: 'Completed a batch payment', description: '8 transactions processed successfully', time: 'Today, 2:32 PM', tone: 'success' },
  { icon: KeyRound, title: 'Security settings updated', description: 'Two-factor authentication was enabled', time: 'Yesterday, 9:14 AM', tone: 'primary' },
  { icon: Users, title: 'Joined FinPay workspace', description: 'Your administrator account was created', time: 'Jan 15, 2024', tone: 'muted' },
];

type Profile = typeof initialProfile;
type Notifications = typeof initialNotifications;

function ProfileSectionHeader({ icon: Icon, title, description, action }: { icon: typeof UserRound; title: string; description: string; action?: ReactNode }) {
  return <CardHeader className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border/60"><div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0 [&_svg]:w-4 [&_svg]:h-4"><Icon /></div><div className="flex flex-col gap-0.5 flex-1"><CardTitle className="text-sm font-semibold text-foreground">{title}</CardTitle><CardDescription className="text-xs text-muted-foreground">{description}</CardDescription></div>{action}</CardHeader>;
}

function ProfileSettingRow({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="flex items-center justify-between gap-4 py-2 [&>span]:flex [&>span]:flex-col [&>span]:gap-0.5 [&_strong]:text-xs [&_strong]:font-semibold [&_small]:text-xs [&_small]:text-muted-foreground"><span><strong>{title}</strong><small>{description}</small></span>{children}</div>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [savedProfile, setSavedProfile] = useState<Profile>(initialProfile);
  const [notifications, setNotifications] = useState<Notifications>(initialNotifications);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState(2);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  function updateNotification(field: keyof Notifications, value: boolean) {
    setNotifications((current) => ({ ...current, [field]: value }));
    setFeedback('Notification preferences updated.');
  }

  function changePassword() {
    setPasswordDialogOpen(false);
    setFeedback('Password updated successfully.');
  }

  return (
    <div className="flex flex-col gap-3 pb-4">

      {feedback && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm [&_svg]:w-4 [&_svg]:h-4 [&_button]:ml-auto [&_button]:text-success/70 [&_button]:hover:text-success" role="status"><CheckCircle2 /><span>{feedback}</span><button type="button" aria-label="Dismiss notification" onClick={() => setFeedback('')}><X /></button></div>}

      <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"><div className="flex items-center gap-4"><span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary font-bold text-xl shrink-0">{initials}</span><span><strong>{profile.firstName} {profile.lastName}</strong><small>{profile.title} · {profile.company}</small><em><span className="inline-block w-2 h-2 rounded-full bg-success mr-1.5" />Active account</em></span></div><div className="flex flex-wrap gap-4 sm:gap-6 [&>span]:flex [&>span]:flex-col [&>span]:gap-0.5 [&_small]:text-muted-foreground [&_small]:text-xs [&_strong]:text-sm [&_strong]:font-semibold [&_strong]:text-foreground"><span><small>Member since</small><strong>Jan 15, 2024</strong></span><span><small>Workspace role</small><strong>Administrator</strong></span><span><small>Security score</small><strong className="text-success">92 / 100</strong></span></div></CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16rem] gap-3">
        <Card id="profile-information" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><ProfileSectionHeader icon={UserRound} title="Personal information" description="Update the details associated with your account" /><CardContent className="p-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><Label htmlFor="profile-first-name">First name</Label><Input id="profile-first-name" value={profile.firstName} onChange={(event) => updateProfile('firstName', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="profile-last-name">Last name</Label><Input id="profile-last-name" value={profile.lastName} onChange={(event) => updateProfile('lastName', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="profile-email">Email address</Label><Input id="profile-email" type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="profile-phone">Phone number</Label><Input id="profile-phone" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="profile-company">Company</Label><Input id="profile-company" value={profile.company} onChange={(event) => updateProfile('company', event.target.value)} className="h-8 text-xs" /></div><div><Label htmlFor="profile-title">Job title</Label><Input id="profile-title" value={profile.title} onChange={(event) => updateProfile('title', event.target.value)} className="h-8 text-xs" /></div></div><div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground"><span>{profileDirty ? 'Unsaved profile changes' : 'Profile information is current'}</span><div><Button variant="outline" className="h-8 text-xs" onClick={cancelProfile} disabled={!profileDirty}>Cancel</Button><Button className="h-8 text-xs gap-2" onClick={saveProfile} disabled={!profileDirty}><Save />Save changes</Button></div></div></CardContent></Card>

        <Card className="dashboard-card compact-settings-card profile-status-card"><ProfileSectionHeader icon={ShieldCheck} title="Account status" description="Your account is ready for secure payments" /><CardContent className="p-4"><div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30 mb-3"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/20 text-success shrink-0 [&_svg]:w-4 [&_svg]:h-4"><CheckCircle2 /></span><span><strong>Account active</strong><small>All payment features are available</small></span></div><div className="flex flex-col gap-2 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:text-xs [&_span]:text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold"><div><span>Verification</span><strong>Complete</strong></div><div><span>Plan</span><strong>Super plan</strong></div><div><span>Workspace</span><strong>FinPay Corp</strong></div><div><span>Last sign in</span><strong>Today, 2:30 PM</strong></div></div><Button variant="outline" className="h-8 text-xs w-full mt-3" onClick={() => document.getElementById('security-preferences')?.scrollIntoView({ behavior: 'smooth' })}>Review security</Button></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card id="security-preferences" className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><ProfileSectionHeader icon={Lock} title="Security preferences" description="Keep your account and payments protected" /><CardContent className="p-4"><div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30 mb-3"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/20 text-success shrink-0 [&_svg]:w-4 [&_svg]:h-4"><ShieldCheck /></span><span><strong>Strong security posture</strong><small>Two-factor authentication is active</small></span><span className="ml-auto text-sm font-bold text-success">92%</span></div><div className="flex flex-col divide-y divide-border/40"><ProfileSettingRow title="Two-factor authentication" description="Require a code when signing in"><Switch checked={twoFactorEnabled} onCheckedChange={(checked) => { setTwoFactorEnabled(checked); setFeedback(checked ? 'Two-factor authentication enabled.' : 'Two-factor authentication disabled.'); }} aria-label="Toggle two-factor authentication" /></ProfileSettingRow><ProfileSettingRow title="Password" description="Last changed 30 days ago"><Button variant="outline" className="h-8 text-xs" onClick={() => setPasswordDialogOpen(true)}>Change</Button></ProfileSettingRow><ProfileSettingRow title="Active sessions" description={`${sessions} devices currently signed in`}><Button variant="outline" className="h-8 text-xs gap-2" onClick={() => { setSessions(1); setFeedback('All other sessions have been signed out.'); }} disabled={sessions < 2}><LogOut />Sign out others</Button></ProfileSettingRow></div></CardContent></Card>

        <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><ProfileSectionHeader icon={Bell} title="Notification preferences" description="Choose which updates you receive" /><CardContent className="p-4 flex flex-col divide-y divide-border/40"><ProfileSettingRow title="Payment updates" description="Successful payments and transfers"><Switch checked={notifications.paymentUpdates} onCheckedChange={(checked) => updateNotification('paymentUpdates', checked)} aria-label="Toggle payment updates" /></ProfileSettingRow><ProfileSettingRow title="Batch alerts" description="When a batch finishes processing"><Switch checked={notifications.batchAlerts} onCheckedChange={(checked) => updateNotification('batchAlerts', checked)} aria-label="Toggle batch alerts" /></ProfileSettingRow><ProfileSettingRow title="Security alerts" description="Sign-ins and access changes"><Switch checked={notifications.securityAlerts} onCheckedChange={(checked) => updateNotification('securityAlerts', checked)} aria-label="Toggle security alerts" /></ProfileSettingRow><ProfileSettingRow title="Weekly digest" description="A summary of workspace activity"><Switch checked={notifications.weeklyDigest} onCheckedChange={(checked) => updateNotification('weeklyDigest', checked)} aria-label="Toggle weekly digest" /></ProfileSettingRow></CardContent></Card>
      </div>

      <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden"><ProfileSectionHeader icon={Activity} title="Recent account activity" description="A timeline of important events from your workspace" action={<Button variant="ghost" className="h-8 text-xs profile-activity-action"><Clock3 />View all</Button>} /><CardContent className="p-4"><div className="flex flex-col gap-3">{recentActivity.map((item) => { const Icon = item.icon; return <div className="flex items-start gap-3" key={item.title}><span className={`profile-activity-icon profile-activity-icon-${item.tone}`}><Icon /></span><span><strong>{item.title}</strong><small>{item.description}</small></span><time>{item.time}</time></div>; })}</div></CardContent></Card>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}><DialogContent className="max-w-sm"><DialogHeader><DialogTitle>Change password</DialogTitle><DialogDescription>Choose a strong password you do not use anywhere else.</DialogDescription></DialogHeader><div className="flex flex-col gap-3 my-2"><div><Label htmlFor="profile-current-password">Current password</Label><Input id="profile-current-password" type="password" placeholder="••••••••••" className="h-8 text-xs" /></div><div><Label htmlFor="profile-new-password">New password</Label><Input id="profile-new-password" type="password" placeholder="At least 8 characters" className="h-8 text-xs" /></div><div><Label htmlFor="profile-confirm-password">Confirm new password</Label><Input id="profile-confirm-password" type="password" placeholder="Repeat your new password" className="h-8 text-xs" /></div></div><DialogFooter><DialogClose asChild><Button variant="outline" className="h-8 text-xs">Cancel</Button></DialogClose><Button className="h-8 text-xs" onClick={changePassword}>Update password</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
