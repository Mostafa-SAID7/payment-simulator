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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

interface Transaction {
  id: string;
  date: string;
  time: string;
  recipient: string;
  amount: number;
  type: 'ACH' | 'RTGS' | 'WPS';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  description?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2024-001',
    date: '2024-03-05',
    time: '14:32:15',
    recipient: 'Acme Corporation',
    amount: 25000,
    type: 'ACH',
    status: 'completed',
    reference: 'INV-2024-001',
    description: 'Invoice payment',
  },
  {
    id: 'TXN-2024-002',
    date: '2024-03-05',
    time: '13:15:42',
    recipient: 'Tech Solutions Inc',
    amount: 50000,
    type: 'RTGS',
    status: 'completed',
    reference: 'INV-2024-002',
    description: 'Service delivery',
  },
  {
    id: 'TXN-2024-003',
    date: '2024-03-05',
    time: '11:20:08',
    recipient: 'Global Enterprises',
    amount: 75000,
    type: 'WPS',
    status: 'completed',
    reference: 'INV-2024-003',
  },
  {
    id: 'TXN-2024-004',
    date: '2024-03-04',
    time: '16:45:33',
    recipient: 'Local Business LLC',
    amount: 15000,
    type: 'ACH',
    status: 'failed',
    reference: 'INV-2024-004',
    description: 'Payment failed - invalid account',
  },
  {
    id: 'TXN-2024-005',
    date: '2024-03-04',
    time: '15:10:22',
    recipient: 'Startup Ventures',
    amount: 30000,
    type: 'RTGS',
    status: 'pending',
    reference: 'INV-2024-005',
    description: 'Processing',
  },
  {
    id: 'TXN-2024-006',
    date: '2024-03-04',
    time: '10:55:47',
    recipient: 'Enterprise Solutions',
    amount: 100000,
    type: 'WPS',
    status: 'completed',
    reference: 'INV-2024-006',
  },
  {
    id: 'TXN-2024-007',
    date: '2024-03-03',
    time: '14:20:11',
    recipient: 'Business Partners Co',
    amount: 45000,
    type: 'ACH',
    status: 'completed',
    reference: 'INV-2024-007',
  },
  {
    id: 'TXN-2024-008',
    date: '2024-03-03',
    time: '09:30:55',
    recipient: 'Corporate Services',
    amount: 60000,
    type: 'RTGS',
    status: 'completed',
    reference: 'INV-2024-008',
  },
];

function getStatusBadge(status: Transaction['status']) {
  const variants: Record<Transaction['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    completed: 'default',
    pending: 'secondary',
    failed: 'destructive',
  };
  const labels: Record<Transaction['status'], string> = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
  };
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || txn.type === filterType;
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === 'completed').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    failed: transactions.filter((t) => t.status === 'failed').length,
  };

  return (
    <div className="transactions-page page-stack compact-route-page">
      {/* Header */}
      <PageHeader
        title="Transaction History"
        description="View and manage all payment transactions"
        actions={
          <Button variant="outline" size="sm" className="compact-secondary-button gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="transactions-stats-grid grid gap-3 md:grid-cols-4">
        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="text-2xl font-bold text-accent">{stats.completed}</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="text-2xl font-bold text-chart-3">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-card">
          <CardHeader className="compact-card-header pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent className="compact-card-content">
            <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="dashboard-card compact-card">
        <CardHeader className="compact-card-header">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">Search</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by recipient, ID, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="compact-input pl-10"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground">Payment Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="compact-filter-control mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ACH">ACH</SelectItem>
                  <SelectItem value="RTGS">RTGS</SelectItem>
                  <SelectItem value="WPS">WPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="compact-filter-control mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Transactions Table */}
      <Card className="dashboard-card compact-card">
        <CardContent className="compact-card-content p-0">
          <div className="overflow-x-auto">
            <Table className="compact-data-table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="w-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{transaction.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div>{transaction.date}</div>
                      <div className="text-xs">{transaction.time}</div>
                    </TableCell>
                    <TableCell className="text-foreground">{transaction.recipient}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ${(transaction.amount / 1000).toFixed(1)}K
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transaction.reference}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="compact-row-action h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
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
