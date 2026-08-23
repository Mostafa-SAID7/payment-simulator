'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock3, Download, Eye, FileText, Search, X } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  { id: 'TXN-2024-001', date: '2024-03-05', time: '14:32:15', recipient: 'Acme Corporation', amount: 25000, type: 'ACH', status: 'completed', reference: 'INV-2024-001', description: 'Invoice payment' },
  { id: 'TXN-2024-002', date: '2024-03-05', time: '13:15:42', recipient: 'Tech Solutions Inc', amount: 50000, type: 'RTGS', status: 'completed', reference: 'INV-2024-002', description: 'Service delivery' },
  { id: 'TXN-2024-003', date: '2024-03-05', time: '11:20:08', recipient: 'Global Enterprises', amount: 75000, type: 'WPS', status: 'completed', reference: 'INV-2024-003', description: 'Monthly settlement' },
  { id: 'TXN-2024-004', date: '2024-03-04', time: '16:45:33', recipient: 'Local Business LLC', amount: 15000, type: 'ACH', status: 'failed', reference: 'INV-2024-004', description: 'Payment failed - invalid account' },
  { id: 'TXN-2024-005', date: '2024-03-04', time: '15:10:22', recipient: 'Startup Ventures', amount: 30000, type: 'RTGS', status: 'pending', reference: 'INV-2024-005', description: 'Processing' },
  { id: 'TXN-2024-006', date: '2024-03-04', time: '10:55:47', recipient: 'Enterprise Solutions', amount: 100000, type: 'WPS', status: 'completed', reference: 'INV-2024-006', description: 'Invoice payment' },
  { id: 'TXN-2024-007', date: '2024-03-03', time: '14:20:11', recipient: 'Business Partners Co', amount: 45000, type: 'ACH', status: 'completed', reference: 'INV-2024-007', description: 'Vendor payment' },
  { id: 'TXN-2024-008', date: '2024-03-03', time: '09:30:55', recipient: 'Corporate Services', amount: 60000, type: 'RTGS', status: 'completed', reference: 'INV-2024-008', description: 'Service delivery' },
];

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

function getStatusBadge(status: Transaction['status']) {
  const labels = { completed: 'Completed', pending: 'Pending', failed: 'Failed' };
  const variants: Record<Transaction['status'], 'default' | 'secondary' | 'destructive'> = { completed: 'default', pending: 'secondary', failed: 'destructive' };
  return <Badge variant={variants[status]} className={`transactions-status transactions-status-${status}`}>{labels[status]}</Badge>;
}

function getTypeBadge(type: Transaction['type']) {
  return <span className={`transactions-type transactions-type-${type.toLowerCase()}`}>{type}</span>;
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return mockTransactions.filter((transaction) => {
      const matchesSearch = !query || [transaction.recipient, transaction.id, transaction.reference, transaction.description ?? ''].some((value) => value.toLowerCase().includes(query));
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [filterStatus, filterType, searchTerm]);

  const stats = {
    total: mockTransactions.length,
    completed: mockTransactions.filter((transaction) => transaction.status === 'completed').length,
    pending: mockTransactions.filter((transaction) => transaction.status === 'pending').length,
    failed: mockTransactions.filter((transaction) => transaction.status === 'failed').length,
  };
  const totalVolume = mockTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const filteredVolume = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const completedVolume = mockTransactions.filter((transaction) => transaction.status === 'completed').reduce((sum, transaction) => sum + transaction.amount, 0);
  const hasFilters = Boolean(searchTerm || filterType !== 'all' || filterStatus !== 'all');

  function clearFilters() {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
  }

  function exportTransactions() {
    const rows = filteredTransactions.map((transaction) => [transaction.id, transaction.date, transaction.time, transaction.recipient, transaction.type, transaction.amount, transaction.status, transaction.reference, transaction.description ?? '']);
    const csv = [['Transaction ID', 'Date', 'Time', 'Recipient', 'Type', 'Amount', 'Status', 'Reference', 'Description'], ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finpay-transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="transactions-page page-stack compact-route-page">
      <PageHeader title="Transaction History" description="Review payment activity, settlement status, and transaction details in one place" actions={<Button variant="outline" size="sm" className="compact-secondary-button gap-2" onClick={exportTransactions}><Download />Export CSV</Button>} />

      <section className="transactions-summary-grid" aria-label="Transaction overview">
        <Card className="dashboard-card transactions-summary-card"><CardContent className="transactions-summary-content"><span className="transactions-summary-icon transactions-summary-icon-primary"><FileText /></span><span><small>Total transactions</small><strong>{stats.total}</strong><em>{formatCurrency(totalVolume)} total volume</em></span></CardContent></Card>
        <Card className="dashboard-card transactions-summary-card"><CardContent className="transactions-summary-content"><span className="transactions-summary-icon transactions-summary-icon-success"><CheckCircle2 /></span><span><small>Completed</small><strong>{stats.completed}</strong><em>{formatCurrency(completedVolume)} settled</em></span></CardContent></Card>
        <Card className="dashboard-card transactions-summary-card"><CardContent className="transactions-summary-content"><span className="transactions-summary-icon transactions-summary-icon-warning"><Clock3 /></span><span><small>Pending review</small><strong>{stats.pending}</strong><em>Awaiting settlement</em></span></CardContent></Card>
        <Card className="dashboard-card transactions-summary-card"><CardContent className="transactions-summary-content"><span className="transactions-summary-icon transactions-summary-icon-danger"><AlertCircle /></span><span><small>Failed</small><strong>{stats.failed}</strong><em>Requires attention</em></span></CardContent></Card>
      </section>

      <section className="transactions-content-grid" aria-label="Transaction operations">
        <Card className="dashboard-card compact-table-card transactions-table-card">
          <CardHeader className="compact-card-header transactions-table-header">
            <div className="transactions-table-heading"><div><CardTitle className="compact-panel-title">All transactions</CardTitle><CardDescription className="compact-panel-description">Search, filter, and inspect every payment record</CardDescription></div><Badge variant="outline" className="transactions-count-badge">{filteredTransactions.length} shown</Badge></div>
            <div className="transactions-filter-bar">
              <div className="transactions-search-field"><Search /><Input aria-label="Search transactions" placeholder="Search recipient, ID, or reference..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="compact-input" /></div>
              <Select value={filterType} onValueChange={setFilterType}><SelectTrigger className="compact-filter-control transactions-filter-control"><SelectValue placeholder="Payment type" /></SelectTrigger><SelectContent><SelectItem value="all">All types</SelectItem><SelectItem value="ACH">ACH</SelectItem><SelectItem value="RTGS">RTGS</SelectItem><SelectItem value="WPS">WPS</SelectItem></SelectContent></Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="compact-filter-control transactions-filter-control"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent></Select>
              {hasFilters && <Button variant="ghost" size="sm" className="transactions-clear-button" onClick={clearFilters}><X />Clear</Button>}
            </div>
          </CardHeader>
          <CardContent className="compact-card-content p-0">
            <div className="transactions-table-meta"><span>{hasFilters ? `Showing ${filteredTransactions.length} of ${mockTransactions.length} transactions` : 'Latest payment activity'}</span><strong>{formatCurrency(filteredVolume)} visible volume</strong></div>
            <div className="overflow-x-auto">
              <Table className="compact-data-table transactions-data-table">
                <TableHeader><TableRow className="border-border hover:bg-transparent"><TableHead>Transaction</TableHead><TableHead>Date & time</TableHead><TableHead>Recipient</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead><TableHead className="w-12 text-right">View</TableHead></TableRow></TableHeader>
                <TableBody>{filteredTransactions.map((transaction) => <TableRow key={transaction.id} className="border-border">
                  <TableCell><div className="transactions-primary-cell"><strong>{transaction.id}</strong><small>{transaction.reference}</small></div></TableCell>
                  <TableCell><div className="transactions-date-cell"><strong>{transaction.date}</strong><small>{transaction.time}</small></div></TableCell>
                  <TableCell><div className="transactions-recipient-cell"><strong>{transaction.recipient}</strong><small>{transaction.description}</small></div></TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="text-right"><strong className="transactions-amount">{formatCurrency(transaction.amount)}</strong></TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`View ${transaction.id}`} onClick={() => setSelectedTransaction(transaction)}><Eye /></Button></TableCell>
                </TableRow>)}</TableBody>
              </Table>
              {filteredTransactions.length === 0 && <div className="transactions-empty-state"><Search /><strong>No transactions match your filters</strong><span>Try another search or clear the active filters.</span>{hasFilters && <Button variant="outline" size="sm" className="compact-secondary-button" onClick={clearFilters}>Clear filters</Button>}</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-settings-card transactions-health-card">
          <CardHeader className="compact-card-header"><CardTitle className="compact-panel-title">Settlement health</CardTitle><CardDescription className="compact-panel-description">A quick view of payment reliability</CardDescription></CardHeader>
          <CardContent className="compact-card-content transactions-health-content">
            <div className="transactions-health-score"><span className="transactions-health-ring">{Math.round((stats.completed / stats.total) * 100)}%</span><span><strong>Healthy throughput</strong><small>Completion rate across all payments</small></span></div>
            <div className="transactions-health-list"><div><span><strong>Completed</strong><small>{stats.completed} transactions</small></span><strong className="transactions-health-value-success">{Math.round((stats.completed / stats.total) * 100)}%</strong></div><div><span><strong>Pending</strong><small>Awaiting settlement</small></span><strong className="transactions-health-value-warning">{stats.pending}</strong></div><div><span><strong>Failed</strong><small>Requires review</small></span><strong className="transactions-health-value-danger">{stats.failed}</strong></div></div>
            <div className="transactions-health-link"><span>Review failed payments</span><ArrowUpRight /></div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={Boolean(selectedTransaction)} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="transactions-dialog-content">
          {selectedTransaction && <><DialogHeader><div className="transactions-detail-heading"><span className="transactions-detail-icon"><FileText /></span><span><DialogTitle>{selectedTransaction.id}</DialogTitle><DialogDescription>{selectedTransaction.description ?? 'Payment transaction details'}</DialogDescription></span></div></DialogHeader><div className="transactions-detail-status"><span><small>Transaction status</small>{getStatusBadge(selectedTransaction.status)}</span><strong>{formatCurrency(selectedTransaction.amount)}</strong></div><div className="transactions-detail-grid"><div><small>Recipient</small><strong>{selectedTransaction.recipient}</strong></div><div><small>Reference</small><strong>{selectedTransaction.reference}</strong></div><div><small>Payment type</small><strong>{selectedTransaction.type}</strong></div><div><small>Processed at</small><strong>{selectedTransaction.date} · {selectedTransaction.time}</strong></div></div><DialogFooter><DialogClose asChild><Button className="compact-primary-button">Done</Button></DialogClose></DialogFooter></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
