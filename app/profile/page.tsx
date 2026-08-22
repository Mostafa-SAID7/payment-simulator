'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Administrator',
    email: 'admin@finpay.com',
    phone: '+1 (555) 123-4567',
    company: 'FinPay Corp',
    title: 'Payment Administrator',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved:', profile);
  };

  return (
    <div className="page-stack">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card className="finance-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </div>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => {
                    if (isEditing) {
                      handleSaveProfile();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <Input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={profile.title}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Summary */}
        <div className="space-y-4">
          <Card className="finance-card">
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Account Active
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Since Jan 15, 2024</p>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Member Since</p>
                  <p className="mt-1">January 15, 2024</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Role</p>
                  <p className="mt-1">Administrator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Settings */}
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security</p>
              </div>
              <Button
                variant={twoFactorEnabled ? 'default' : 'outline'}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                {twoFactorEnabled ? 'Enabled' : 'Enable'}
              </Button>
            </div>

            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground mt-1">Update your password regularly</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Active Sessions</p>
                <p className="text-sm text-muted-foreground mt-1">Manage your active sessions</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground mt-1">Receive payment updates via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-accent' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-muted-foreground mt-1">Critical alerts via SMS</p>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  smsNotifications ? 'bg-accent' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Batch Processing Alerts</p>
                <p className="text-sm text-muted-foreground mt-1">Notify when batch processing completes</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent transition-colors"
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform translate-x-6"
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API authentication keys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div>
                <p className="font-mono text-sm text-foreground">pk_live_5bJdX9aMp2kLqRsx***</p>
                <p className="text-xs text-muted-foreground mt-1">Created 30 days ago</p>
              </div>
              <Button variant="ghost" size="sm">Revoke</Button>
            </div>
            <Button variant="outline" className="w-full">Generate New Key</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div>
            <p className="font-medium text-foreground">Delete Account</p>
            <p className="text-sm text-muted-foreground mt-1">Permanently delete your account and all data</p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
