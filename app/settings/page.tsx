'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Lock, Bell, Users, LogOut } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

export default function SettingsPage() {
  return (
    <div className="settings-page page-stack max-w-2xl compact-route-page">
      {/* Header */}
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      {/* Profile Settings */}
      <Card className="dashboard-card compact-settings-card">
        <CardHeader className="compact-card-header">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="compact-card-content space-y-3">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="John" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Doe" defaultValue="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              defaultValue="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="dashboard-card compact-settings-card">
        <CardHeader className="compact-card-header">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="compact-card-content space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-foreground">Payment Alerts</p>
              <p className="text-xs text-muted-foreground">
                Receive alerts when payments are processed
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-foreground">Batch Processing</p>
              <p className="text-xs text-muted-foreground">
                Notifications for batch job completion
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-foreground">Failed Transactions</p>
              <p className="text-xs text-muted-foreground">
                Alert on transaction failures
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-foreground">Email Digest</p>
              <p className="text-xs text-muted-foreground">
                Daily summary email
              </p>
            </div>
            <Switch />
          </div>

          <Button className="bg-primary hover:bg-primary/90">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="dashboard-card compact-settings-card">
        <CardHeader className="compact-card-header">
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="compact-card-content space-y-3">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>

          <Button className="bg-primary hover:bg-primary/90">Update Password</Button>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3 bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card className="dashboard-card compact-settings-card">
        <CardHeader className="compact-card-header">
          <CardTitle>API Settings</CardTitle>
          <CardDescription>Manage API keys and integrations</CardDescription>
        </CardHeader>
        <CardContent className="compact-card-content space-y-3">
          <div className="rounded-lg border border-border p-3 bg-secondary/30">
            <p className="font-medium text-foreground mb-2">API Key</p>
            <div className="flex gap-2">
              <Input
                value="pk_live_51234567890abcdefgh"
                readOnly
                className="font-mono text-xs"
              />
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </div>

          <Button variant="outline">Regenerate API Key</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="dashboard-card compact-settings-card border-destructive/50">
        <CardHeader className="compact-card-header">
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Logout from All Devices
          </Button>

          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
