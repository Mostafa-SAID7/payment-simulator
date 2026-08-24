'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  Activity,
  Bell,
  CheckCircle2,
  Clock3,
  KeyRound,
  Lock,
  LogOut,
  Save,
  ShieldCheck,
  UserRound,
  Users,
  X,
  Zap,
  Globe,
  Mail,
  Phone,
  Building2,
  Briefcase,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const initialProfile = {
  firstName: 'John',
  lastName: 'Administrator',
  email: 'admin@finpay.com',
  phone: '+1 (555) 123-4567',
  company: 'FinPay Corp',
  title: 'Payment Administrator',
};

const initialNotifications = {
  paymentUpdates: true,
  batchAlerts: true,
  securityAlerts: true,
  weeklyDigest: false,
};

const recentActivity = [
  {
    icon: CheckCircle2,
    title: 'Completed a batch payment',
    description: '8 transactions processed successfully',
    time: 'Today, 2:32 PM',
    tone: 'success',
  },
  {
    icon: KeyRound,
    title: 'Security settings updated',
    description: 'Two-factor authentication was enabled',
    time: 'Yesterday, 9:14 AM',
    tone: 'primary',
  },
  {
    icon: Users,
    title: 'Joined FinPay workspace',
    description: 'Your administrator account was created',
    time: 'Jan 15, 2024',
    tone: 'muted',
  },
];

const statsData = [
  { label: 'Payments sent', value: '1,284', icon: Zap, color: 'text-primary' },
  { label: 'Batches run', value: '47', icon: Activity, color: 'text-success' },
  { label: 'Security score', value: '92%', icon: ShieldCheck, color: 'text-warning' },
  { label: 'Active sessions', value: '2', icon: Globe, color: 'text-info' },
];

type Profile = typeof initialProfile;
type Notifications = typeof initialNotifications;

function SettingRow({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold text-foreground truncate">{title}</span>
        <span className="text-xs text-muted-foreground truncate">{description}</span>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [savedProfile, setSavedProfile] = useState<Profile>(initialProfile);
  const [notifications, setNotifications] = useState<Notifications>(initialNotifications);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState(2);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const profileDirty = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(savedProfile),
    [profile, savedProfile]
  );
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
    <div className="flex flex-col gap-4 pb-6">
      {feedback && (
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-success/10 border border-success/25 text-success text-xs font-medium shadow-sm"
          role="status"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="flex-1">{feedback}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setFeedback('')}
            className="text-success/60 hover:text-success transition-colors"
          >
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
                <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">{initials}</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-card shadow-sm" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  {profile.firstName} {profile.lastName}
                </h1>
                <Badge variant="secondary" className="text-[0.6rem] px-2 py-0.5 font-semibold bg-primary/10 text-primary border-primary/20">
                  Administrator
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {profile.title} · {profile.company}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-primary/60" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-primary/60" />
                  {profile.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-primary/60" />
                  {profile.company}
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-3 sm:gap-2 sm:items-end shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-[0.65rem] text-muted-foreground/60 uppercase tracking-wider font-medium">Member since</p>
                <p className="text-xs font-semibold text-foreground">Jan 15, 2024</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-success/10 border border-success/20">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[0.65rem] font-semibold text-success">Active account</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-border/50">
            {statsData.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">{stat.value}</p>
                    <p className="text-[0.65rem] text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm h-full py-0 gap-0">
            <CardHeader className="px-5 pt-3 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <UserRound className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Personal information</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Update the details associated with your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'profile-first-name', label: 'First name', field: 'firstName' as keyof Profile, icon: UserRound },
                  { id: 'profile-last-name', label: 'Last name', field: 'lastName' as keyof Profile, icon: UserRound },
                  { id: 'profile-email', label: 'Email address', field: 'email' as keyof Profile, icon: Mail, type: 'email' },
                  { id: 'profile-phone', label: 'Phone number', field: 'phone' as keyof Profile, icon: Phone },
                  { id: 'profile-company', label: 'Company', field: 'company' as keyof Profile, icon: Building2 },
                  { id: 'profile-title', label: 'Job title', field: 'title' as keyof Profile, icon: Briefcase },
                ].map(({ id, label, field, icon: Icon, type }) => (
                  <div key={id} className="flex flex-col gap-1.5">
                    <Label htmlFor={id} className="text-xs font-medium text-foreground/80 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-muted-foreground" />
                      {label}
                    </Label>
                    <Input
                      id={id}
                      type={type ?? 'text'}
                      value={profile[field]}
                      onChange={(event) => updateProfile(field, event.target.value)}
                      className="h-9 text-xs bg-muted/30 border-border/60 focus:border-primary/50 focus:bg-card transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {profileDirty ? (
                    <span className="flex items-center gap-1.5 text-warning">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                      Unsaved changes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-success">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Profile is up to date
                    </span>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={cancelProfile} disabled={!profileDirty}>
                    Cancel
                  </Button>
                  <Button size="sm" className="h-8 text-xs gap-1.5" onClick={saveProfile} disabled={!profileDirty}>
                    <Save className="w-3.5 h-3.5" />
                    Save changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm py-0 gap-0">
            <CardHeader className="px-5 pt-3 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-success" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Account status</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Secure &amp; ready for payments</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-success/8 border border-success/20 mb-4">
                <div className="relative w-12 h-12 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success/15" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="92 100" strokeLinecap="round" className="text-success" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-bold text-success">92</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Strong security</p>
                  <p className="text-[0.65rem] text-muted-foreground mt-0.5">2FA is active</p>
                </div>
              </div>

              <div className="flex flex-col gap-0">
                {[
                  { label: 'Verification', value: 'Complete', color: 'text-success' },
                  { label: 'Plan', value: 'Super plan', color: 'text-primary' },
                  { label: 'Workspace', value: 'FinPay Corp', color: 'text-foreground' },
                  { label: 'Last sign in', value: 'Today, 2:30 PM', color: 'text-foreground' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className={`text-xs font-semibold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs mt-4 gap-1.5"
                onClick={() => document.getElementById('security-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Review security
                <ChevronRight className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/8 p-4 shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center mb-2.5">
                <Star className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground mb-0.5">Super plan active</p>
              <p className="text-[0.65rem] text-muted-foreground mb-3">All features unlocked on your workspace</p>
              <Button size="sm" className="h-7 text-[0.65rem] px-3 gap-1 bg-primary/90 hover:bg-primary">
                <Zap className="w-3 h-3" />
                Manage plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div id="security-section" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl border border-border/60 bg-card shadow-sm py-0 gap-0">
          <CardHeader className="px-5 pt-3 pb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Security preferences</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">Keep your account and payments protected</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <SettingRow title="Two-factor authentication" description="Require a code when signing in">
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => {
                  setTwoFactorEnabled(checked);
                  setFeedback(checked ? 'Two-factor authentication enabled.' : 'Two-factor authentication disabled.');
                }}
                aria-label="Toggle two-factor authentication"
              />
            </SettingRow>
            <SettingRow title="Password" description="Last changed 30 days ago">
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setPasswordDialogOpen(true)}>
                Change
              </Button>
            </SettingRow>
            <SettingRow title="Active sessions" description={`${sessions} device${sessions !== 1 ? 's' : ''} currently signed in`}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5"
                onClick={() => {
                  setSessions(1);
                  setFeedback('All other sessions have been signed out.');
                }}
                disabled={sessions < 2}
              >
                <LogOut className="w-3 h-3" />
                Sign out others
              </Button>
            </SettingRow>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/60 bg-card shadow-sm py-0 gap-0">
          <CardHeader className="px-5 pt-3 pb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-warning" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Notification preferences</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">Choose which updates you receive</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <SettingRow title="Payment updates" description="Successful payments and transfers">
              <Switch checked={notifications.paymentUpdates} onCheckedChange={(value) => updateNotification('paymentUpdates', value)} aria-label="Toggle payment updates" />
            </SettingRow>
            <SettingRow title="Batch alerts" description="When a batch finishes processing">
              <Switch checked={notifications.batchAlerts} onCheckedChange={(value) => updateNotification('batchAlerts', value)} aria-label="Toggle batch alerts" />
            </SettingRow>
            <SettingRow title="Security alerts" description="Sign-ins and access changes">
              <Switch checked={notifications.securityAlerts} onCheckedChange={(value) => updateNotification('securityAlerts', value)} aria-label="Toggle security alerts" />
            </SettingRow>
            <SettingRow title="Weekly digest" description="A summary of workspace activity">
              <Switch checked={notifications.weeklyDigest} onCheckedChange={(value) => updateNotification('weeklyDigest', value)} aria-label="Toggle weekly digest" />
            </SettingRow>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border border-border/60 bg-card shadow-sm py-0 gap-0">
        <CardHeader className="px-5 pt-3 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-info" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-sm font-semibold text-foreground">Recent account activity</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">A timeline of important events from your workspace</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
              <Clock3 className="w-3.5 h-3.5" />
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex flex-col gap-0">
            {recentActivity.map((item, index) => {
              const Icon = item.icon;
              const toneClasses: Record<string, string> = {
                success: 'bg-success/10 text-success border-success/20',
                primary: 'bg-primary/10 text-primary border-primary/20',
                muted: 'bg-muted text-muted-foreground border-border/40',
              };
              const isLast = index === recentActivity.length - 1;
              return (
                <div key={item.title} className={`flex items-start gap-4 py-3.5 ${!isLast ? 'border-b border-border/40' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${toneClasses[item.tone] ?? toneClasses.muted}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <time className="text-[0.65rem] text-muted-foreground/70 whitespace-nowrap shrink-0 mt-0.5">{item.time}</time>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Change password</DialogTitle>
            <DialogDescription className="text-xs">Choose a strong password you do not use anywhere else.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 my-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-current-password" className="text-xs">Current password</Label>
              <Input id="profile-current-password" type="password" placeholder="••••••••••" className="h-9 text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-new-password" className="text-xs">New password</Label>
              <Input id="profile-new-password" type="password" placeholder="At least 8 characters" className="h-9 text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-confirm-password" className="text-xs">Confirm new password</Label>
              <Input id="profile-confirm-password" type="password" placeholder="Repeat your new password" className="h-9 text-xs" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">Cancel</Button>
            </DialogClose>
            <Button size="sm" className="h-8 text-xs" onClick={changePassword}>Update password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
