'use client';

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

interface Account {
  id: string;
  name: string;
  accountNumber: string;
  bankCode: string;
  type: 'business' | 'savings' | 'checking';
  balance: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
}

const mockAccounts: Account[] = [
  {
    id: 'ACC-001',
    name: 'Main Operating Account',
    accountNumber: '1234567890',
    bankCode: 'BANK001',
    type: 'business',
    balance: 500000,
    status: 'active',
    lastActivity: '2024-03-05 14:32',
  },
  {
    id: 'ACC-002',
    name: 'Payroll Account',
    accountNumber: '0987654321',
    bankCode: 'BANK001',
    type: 'checking',
    balance: 250000,
    status: 'active',
    lastActivity: '2024-03-05 10:15',
  },
  {
    id: 'ACC-003',
    name: 'Contingency Fund',
    accountNumber: '5555555555',
    bankCode: 'BANK002',
    type: 'savings',
    balance: 1000000,
    status: 'active',
    lastActivity: '2024-03-04 09:00',
  },
  {
    id: 'ACC-004',
    name: 'Vendor Payments',
    accountNumber: '3333333333',
    bankCode: 'BANK002',
    type: 'business',
    balance: 150000,
    status: 'inactive',
    lastActivity: '2024-02-28 16:45',
  },
];

function getStatusBadge(status: Account['status']) {
  const variants: Record<Account['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    inactive: 'secondary',
    suspended: 'destructive',
  };
  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function getTypeBadge(type: Account['type']) {
  const colors: Record<Account['type'], string> = {
    business: 'bg-secondary text-secondary-foreground',
    savings: 'bg-accent/15 text-accent',
    checking: 'bg-primary/15 text-primary',
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${colors[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts] = useState<Account[]>(mockAccounts);

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm) ||
      account.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeAccounts = accounts.filter((acc) => acc.status === 'active').length;

  return (
    <div className="accounts-page page-stack compact-route-page">
      {/* Header */}
      <PageHeader
        title="Accounts"
        description="Manage payment and settlement accounts"
        actions={
          <Button size="sm" className="compact-primary-button gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Account
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="accounts-summary-grid grid gap-3 md:grid-cols-3">
        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="compact-metric-label text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="compact-metric-value text-2xl font-bold text-foreground">
              ${(totalBalance / 1000000).toFixed(1)}M
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="compact-metric-label text-sm font-medium text-muted-foreground">
              Active Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="compact-metric-value text-2xl font-bold text-foreground">{activeAccounts}</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="compact-metric-label text-sm font-medium text-muted-foreground">
              Total Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="compact-metric-value text-2xl font-bold text-foreground">{accounts.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Table */}
      <Card className="dashboard-card compact-table-card">
        <CardHeader className="compact-card-header">
          <div className="compact-table-header flex items-center justify-between">
            <div>
              <CardTitle className="compact-panel-title">Accounts List</CardTitle>
              <CardDescription className="compact-panel-description">
                All your payment and settlement accounts
              </CardDescription>
            </div>
            <div className="compact-search-field relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="compact-card-content p-0">
          <div className="overflow-x-auto">
            <Table className="compact-data-table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Bank Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{account.accountNumber}</TableCell>
                    <TableCell className="text-foreground">{account.bankCode}</TableCell>
                    <TableCell>{getTypeBadge(account.type)}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ${(account.balance / 1000).toFixed(1)}K
                    </TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {account.lastActivity}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="compact-row-action h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="compact-row-action h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
