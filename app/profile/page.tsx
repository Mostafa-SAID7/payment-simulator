'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Activity, Bell, Check, CheckCircle2, Clock3, KeyRound, Lock, LogOut, Pencil, Save, ShieldCheck, UserRound, Users, X } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
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
  return <CardHeader className="compact-card-header profile-section-header"><div className="profile-section-icon"><Icon /></div><div className="profile-section-heading"><CardTitle className="compact-panel-title">{title}</CardTitle><CardDescription className="compact-panel-description">{description}</CardDescription></div>{action}</CardHeader>;
}

function ProfileSettingRow({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="profile-setting-row"><span><strong>{title}</strong><small>{description}</small></span>{children}</div>;
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
    <div className="profile-page page-stack compact-route-page">
      <PageHeader title="My Profile" description="Manage your identity, security, and personal workspace preferences" actions={<Button variant="outline" size="sm" className="compact-secondary-button gap-2" onClick={() => document.getElementById('profile-information')?.scrollIntoView({ behavior: 'smooth' })}><Pencil />Edit profile</Button>} />

      {feedback && <div className="profile-feedback" role="status"><CheckCircle2 /><span>{feedback}</span><button type="button" aria-label="Dismiss notification" onClick={() => setFeedback('')}><X /></button></div>}

      <Card className="dashboard-card profile-hero-card">
        <CardContent className="profile-hero-content"><div className="profile-hero-identity"><span className="profile-hero-avatar">{initials}</span><span><strong>{profile.firstName} {profile.lastName}</strong><small>{profile.title} · {profile.company}</small><em><span className="profile-online-dot" />Active account</em></span></div><div className="profile-hero-stats"><span><small>Member since</small><strong>Jan 15, 2024</strong></span><span><small>Workspace role</small><strong>Administrator</strong></span><span><small>Security score</small><strong className="profile-success-text">92 / 100</strong></span></div></CardContent>
      </Card>

      <div className="profile-main-grid">
        <Card id="profile-information" className="dashboard-card compact-settings-card profile-section-card"><ProfileSectionHeader icon={UserRound} title="Personal information" description="Update the details associated with your account" /><CardContent className="compact-card-content"><div className="profile-form-grid"><div><Label htmlFor="profile-first-name">First name</Label><Input id="profile-first-name" value={profile.firstName} onChange={(event) => updateProfile('firstName', event.target.value)} className="compact-input" /></div><div><Label htmlFor="profile-last-name">Last name</Label><Input id="profile-last-name" value={profile.lastName} onChange={(event) => updateProfile('lastName', event.target.value)} className="compact-input" /></div><div><Label htmlFor="profile-email">Email address</Label><Input id="profile-email" type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} className="compact-input" /></div><div><Label htmlFor="profile-phone">Phone number</Label><Input id="profile-phone" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} className="compact-input" /></div><div><Label htmlFor="profile-company">Company</Label><Input id="profile-company" value={profile.company} onChange={(event) => updateProfile('company', event.target.value)} className="compact-input" /></div><div><Label htmlFor="profile-title">Job title</Label><Input id="profile-title" value={profile.title} onChange={(event) => updateProfile('title', event.target.value)} className="compact-input" /></div></div><div className="profile-card-actions"><span>{profileDirty ? 'Unsaved profile changes' : 'Profile information is current'}</span><div><Button variant="outline" className="compact-secondary-button" onClick={cancelProfile} disabled={!profileDirty}>Cancel</Button><Button className="compact-primary-button gap-2" onClick={saveProfile} disabled={!profileDirty}><Save />Save changes</Button></div></div></CardContent></Card>

        <Card className="dashboard-card compact-settings-card profile-status-card"><ProfileSectionHeader icon={ShieldCheck} title="Account status" description="Your account is ready for secure payments" /><CardContent className="compact-card-content"><div className="profile-status-banner"><span className="profile-status-icon"><CheckCircle2 /></span><span><strong>Account active</strong><small>All payment features are available</small></span></div><div className="profile-status-list"><div><span>Verification</span><strong>Complete</strong></div><div><span>Plan</span><strong>Super plan</strong></div><div><span>Workspace</span><strong>FinPay Corp</strong></div><div><span>Last sign in</span><strong>Today, 2:30 PM</strong></div></div><Button variant="outline" className="compact-secondary-button profile-full-button" onClick={() => document.getElementById('security-preferences')?.scrollIntoView({ behavior: 'smooth' })}>Review security</Button></CardContent></Card>
      </div>

      <div className="profile-two-column">
        <Card id="security-preferences" className="dashboard-card compact-settings-card profile-section-card"><ProfileSectionHeader icon={Lock} title="Security preferences" description="Keep your account and payments protected" /><CardContent className="compact-card-content"><div className="profile-security-banner"><span className="profile-security-icon"><ShieldCheck /></span><span><strong>Strong security posture</strong><small>Two-factor authentication is active</small></span><span className="profile-security-score">92%</span></div><div className="profile-setting-list"><ProfileSettingRow title="Two-factor authentication" description="Require a code when signing in"><Switch checked={twoFactorEnabled} onCheckedChange={(checked) => { setTwoFactorEnabled(checked); setFeedback(checked ? 'Two-factor authentication enabled.' : 'Two-factor authentication disabled.'); }} aria-label="Toggle two-factor authentication" /></ProfileSettingRow><ProfileSettingRow title="Password" description="Last changed 30 days ago"><Button variant="outline" className="compact-secondary-button" onClick={() => setPasswordDialogOpen(true)}>Change</Button></ProfileSettingRow><ProfileSettingRow title="Active sessions" description={`${sessions} devices currently signed in`}><Button variant="outline" className="compact-secondary-button gap-2" onClick={() => { setSessions(1); setFeedback('All other sessions have been signed out.'); }} disabled={sessions < 2}><LogOut />Sign out others</Button></ProfileSettingRow></div></CardContent></Card>

        <Card className="dashboard-card compact-settings-card profile-section-card"><ProfileSectionHeader icon={Bell} title="Notification preferences" description="Choose which updates you receive" /><CardContent className="compact-card-content profile-setting-list"><ProfileSettingRow title="Payment updates" description="Successful payments and transfers"><Switch checked={notifications.paymentUpdates} onCheckedChange={(checked) => updateNotification('paymentUpdates', checked)} aria-label="Toggle payment updates" /></ProfileSettingRow><ProfileSettingRow title="Batch alerts" description="When a batch finishes processing"><Switch checked={notifications.batchAlerts} onCheckedChange={(checked) => updateNotification('batchAlerts', checked)} aria-label="Toggle batch alerts" /></ProfileSettingRow><ProfileSettingRow title="Security alerts" description="Sign-ins and access changes"><Switch checked={notifications.securityAlerts} onCheckedChange={(checked) => updateNotification('securityAlerts', checked)} aria-label="Toggle security alerts" /></ProfileSettingRow><ProfileSettingRow title="Weekly digest" description="A summary of workspace activity"><Switch checked={notifications.weeklyDigest} onCheckedChange={(checked) => updateNotification('weeklyDigest', checked)} aria-label="Toggle weekly digest" /></ProfileSettingRow></CardContent></Card>
      </div>

      <Card className="dashboard-card compact-settings-card profile-activity-card"><ProfileSectionHeader icon={Activity} title="Recent account activity" description="A timeline of important events from your workspace" action={<Button variant="ghost" className="compact-secondary-button profile-activity-action"><Clock3 />View all</Button>} /><CardContent className="compact-card-content"><div className="profile-activity-list">{recentActivity.map((item) => { const Icon = item.icon; return <div className="profile-activity-item" key={item.title}><span className={`profile-activity-icon profile-activity-icon-${item.tone}`}><Icon /></span><span><strong>{item.title}</strong><small>{item.description}</small></span><time>{item.time}</time></div>; })}</div></CardContent></Card>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}><DialogContent className="profile-dialog-content"><DialogHeader><DialogTitle>Change password</DialogTitle><DialogDescription>Choose a strong password you do not use anywhere else.</DialogDescription></DialogHeader><div className="profile-password-form"><div><Label htmlFor="profile-current-password">Current password</Label><Input id="profile-current-password" type="password" placeholder="••••••••••" className="compact-input" /></div><div><Label htmlFor="profile-new-password">New password</Label><Input id="profile-new-password" type="password" placeholder="At least 8 characters" className="compact-input" /></div><div><Label htmlFor="profile-confirm-password">Confirm new password</Label><Input id="profile-confirm-password" type="password" placeholder="Repeat your new password" className="compact-input" /></div></div><DialogFooter><DialogClose asChild><Button variant="outline" className="compact-secondary-button">Cancel</Button></DialogClose><Button className="compact-primary-button" onClick={changePassword}>Update password</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
