'use client';

import {
  MoreHorizontal,
  UserPlus,
  Users,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const usersList = [
  { name: 'William Hirsch', email: 'william@example.com', role: 'Admin', status: 'Active', lastActive: 'Just now' },
  { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastActive: '2h ago' },
  { name: 'John Doe', email: 'john@example.com', role: 'Viewer', status: 'Offline', lastActive: '1d ago' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending', lastActive: '-' },
];

const statusStyles: Record<string, string> = {
  Active: 'bg-success/10 text-success border-success/30',
  Offline: 'bg-muted/10 text-muted-foreground border-border/30',
  Pending: 'bg-warning/10 text-warning border-warning/30',
};

const metrics = [
  { label: 'Total Users', value: '1,284', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Active Users', value: '842', icon: UserCheck, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Pending', value: '42', icon: ShieldAlert, color: 'text-warning', bg: 'bg-warning/10' },
];

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-3 pb-4">

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3" aria-label="User metrics">
        {metrics.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
            <CardContent className="flex items-center gap-4 py-4 px-5">
              <span className={cn("inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0", bg, color)}>
                <Icon className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
                <strong className="text-2xl font-bold text-foreground">{value}</strong>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-xs font-semibold text-foreground/80">
            Team Members
          </CardTitle>
          <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
            <UserPlus className="w-3.5 h-3.5 mr-1" /> Add User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/60 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground">
                  <th>User</th><th>Role</th><th>Status</th><th>Last Active</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, index) => (
                  <tr key={`${user.email}-${index}`} className="border-b border-border/40 hover:bg-secondary/30 transition-colors [&_td]:px-4 [&_td]:py-3">
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary text-[10px] font-bold shrink-0">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <strong className="font-semibold text-foreground truncate">{user.name}</strong>
                          <span className="text-muted-foreground/70 text-[10px]">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="outline" className="text-[10px] bg-secondary/50">{user.role}</Badge>
                    </td>
                    <td>
                      <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold', statusStyles[user.status])}>
                        {user.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground">{user.lastActive}</td>
                    <td>
                      <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
