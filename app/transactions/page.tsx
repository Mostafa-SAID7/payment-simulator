'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock3, Eye, FileText, Search, X, ChevronDown, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

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
  const styles: Record<Transaction['status'], string> = {
    completed: 'border-success/40 text-success',
    pending: 'border-warning/40 text-warning',
    failed: 'border-destructive/40 text-destructive',
  };
  
  const labels = { completed: 'Completed', pending: 'Pending', failed: 'Failed' };
  
  return (
    <Badge variant="outline" className={cn("rounded-full px-3 py-0.5 text-[9px] font-medium border bg-transparent uppercase tracking-wider", styles[status])}>
      {labels[status]}
    </Badge>
  );
}

function getTypeBadge(type: Transaction['type']) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary/30 text-secondary-foreground border border-border/40 text-[10px] font-medium tracking-wide">
      {type}
    </span>
  );
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
    <div className="flex flex-col gap-5 pb-6 mt-20 md:mt-24 px-4 md:px-8 max-w-[1600px] mx-auto w-full">

      {/* Top Stats Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Transaction overview">
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden flex flex-col justify-center">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border border-border/40 bg-foreground/5 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Total Transactions</span>
              <span className="text-[17px] font-bold text-foreground">
                {stats.total} <span className="text-muted-foreground text-[10px] font-medium tracking-wide normal-case ml-1">({formatCurrency(totalVolume)})</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden flex flex-col justify-center">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border border-success/20 bg-success/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Completed</span>
              <span className="text-[17px] font-bold text-foreground">
                {stats.completed} <span className="text-muted-foreground text-[10px] font-medium tracking-wide normal-case ml-1">({formatCurrency(completedVolume)})</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden flex flex-col justify-center">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border border-warning/20 bg-warning/10 flex items-center justify-center shrink-0">
              <Clock3 className="w-4 h-4 text-warning" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Pending</span>
              <span className="text-[17px] font-bold text-foreground">
                {stats.pending} <span className="text-muted-foreground text-[10px] font-medium tracking-wide normal-case ml-1">transactions</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden flex flex-col justify-center">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border border-destructive/20 bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Failed</span>
              <span className="text-[17px] font-bold text-foreground">
                {stats.failed} <span className="text-muted-foreground text-[10px] font-medium tracking-wide normal-case ml-1">requires review</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4" aria-label="Transaction operations">
        
        {/* Main Table Card */}
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden">
          <CardHeader className="flex flex-col gap-4 px-6 pt-6 pb-4 border-b border-border/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <CardTitle className="text-[13px] font-medium text-foreground">All Transactions</CardTitle>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help">i</span>
                <Badge variant="outline" className="ml-2 text-[9px] px-2 py-0.5 rounded-md border-border/40 text-muted-foreground">{filteredTransactions.length} results</Badge>
              </div>
              
              <Button variant="outline" size="sm" className="h-8 text-[11px] gap-2 rounded-lg bg-secondary border-border/40 text-muted-foreground hover:bg-foreground/5" onClick={exportTransactions}>
                <Download className="w-3.5 h-3.5" /> Export CSV
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[200px] relative [&_svg]:absolute [&_svg]:left-3 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-muted-foreground [&_input]:pl-9">
                <Search />
                <Input aria-label="Search transactions" placeholder="Search recipient, ID, or reference..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="h-9 text-[11px] bg-secondary border-border/40 rounded-lg placeholder:text-muted-foreground text-foreground" />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-9 text-[11px] w-auto min-w-[120px] bg-secondary border-border/40 rounded-lg">
                  <SelectValue placeholder="Payment type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/70 text-[11px]">
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="ACH">ACH</SelectItem>
                  <SelectItem value="RTGS">RTGS</SelectItem>
                  <SelectItem value="WPS">WPS</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-9 text-[11px] w-auto min-w-[120px] bg-secondary border-border/40 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/70 text-[11px]">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              {hasFilters && (
                <Button variant="ghost" size="sm" className="h-9 text-[11px] text-muted-foreground hover:text-foreground hover:bg-foreground/5 px-3" onClick={clearFilters}>
                  <X className="w-3.5 h-3.5 mr-1.5" /> Clear
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border/60 [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-muted-foreground">
                    <th className="w-48">Transaction</th>
                    <th>Date & Time</th>
                    <th>Recipient</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th className="w-24">Status</th>
                    <th className="text-right w-16">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id} className={`hover:bg-foreground/5 transition-colors [&_td]:px-6 [&_td]:py-4 ${index !== filteredTransactions.length - 1 ? 'border-b border-border/30' : ''}`}>
                      <td>
                        <div className="flex flex-col gap-0.5">
                          <strong className="font-semibold text-foreground">{transaction.id}</strong>
                          <span className="text-muted-foreground text-[9px]">{transaction.reference}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-0.5">
                          <strong className="text-foreground">{transaction.date}</strong>
                          <span className="text-muted-foreground text-[9px] flex items-center gap-1"><Clock3 className="w-2.5 h-2.5" /> {transaction.time}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-0.5">
                          <strong className="text-foreground">{transaction.recipient}</strong>
                          <span className="text-muted-foreground text-[9px]">{transaction.description}</span>
                        </div>
                      </td>
                      <td>{getTypeBadge(transaction.type)}</td>
                      <td><strong className="font-semibold text-foreground">{formatCurrency(transaction.amount)}</strong></td>
                      <td>{getStatusBadge(transaction.status)}</td>
                      <td className="text-right">
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/10 border border-border/40" aria-label={`View ${transaction.id}`} onClick={() => setSelectedTransaction(transaction)}>
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12">
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-2">
                            <Search className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <strong className="text-[13px] font-medium text-muted-foreground">No transactions found</strong>
                          <span className="text-muted-foreground text-xs">Try adjusting your filters or search term.</span>
                          {hasFilters && (
                            <Button variant="outline" size="sm" className="mt-2 h-8 text-[11px] bg-secondary border-border/40" onClick={clearFilters}>
                              Clear filters
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <Card className="rounded-[1.25rem] bg-card border border-border/70 shadow-none overflow-hidden h-fit">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-border/60">
            <CardTitle className="text-[13px] font-medium text-foreground flex items-center gap-1.5">
              Settlement Health
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground mt-1">A quick view of payment reliability</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-success/10 text-success font-bold text-lg border border-success/20 shrink-0">
                {Math.round((stats.completed / stats.total) * 100)}%
              </span>
              <div className="flex flex-col gap-0.5">
                <strong className="text-xs font-semibold text-foreground">Healthy throughput</strong>
                <span className="text-[10px] text-muted-foreground leading-tight">Completion rate across all payments</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 border-t border-border/60 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <strong className="text-[11px] font-medium text-foreground flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success/50"></div> Completed</strong>
                  <span className="text-[9px] text-muted-foreground">{stats.completed} transactions</span>
                </div>
                <strong className="text-xs text-success">{Math.round((stats.completed / stats.total) * 100)}%</strong>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <strong className="text-[11px] font-medium text-foreground flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-warning/50"></div> Pending</strong>
                  <span className="text-[9px] text-muted-foreground">Awaiting settlement</span>
                </div>
                <strong className="text-xs text-warning">{stats.pending}</strong>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <strong className="text-[11px] font-medium text-foreground flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive/50"></div> Failed</strong>
                  <span className="text-[9px] text-muted-foreground">Requires review</span>
                </div>
                <strong className="text-xs text-destructive">{stats.failed}</strong>
              </div>
            </div>
            
            <div className="mt-2 pt-5 border-t border-border/60">
              <div className="flex items-center justify-between text-[11px] text-primary hover:text-primary/80 cursor-pointer group transition-colors">
                <span className="font-medium">Review failed payments</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Transaction Details Dialog */}
      <Dialog open={Boolean(selectedTransaction)} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="max-w-md bg-card border border-border/70 rounded-[1.25rem] shadow-xl p-0 overflow-hidden">
          {selectedTransaction && (
            <>
              <DialogHeader className="p-6 pb-4 border-b border-border/60 bg-secondary/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <DialogTitle className="text-lg tracking-tight text-foreground">{selectedTransaction.id}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">{selectedTransaction.description ?? 'Payment transaction details'}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between py-4 px-5 rounded-xl border border-border/40 bg-secondary">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Status</span>
                    {getStatusBadge(selectedTransaction.status)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Amount</span>
                    <strong className="text-xl font-bold text-foreground">{formatCurrency(selectedTransaction.amount)}</strong>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Recipient</span>
                    <strong className="text-sm font-semibold text-foreground">{selectedTransaction.recipient}</strong>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Reference</span>
                    <strong className="text-sm font-semibold text-foreground">{selectedTransaction.reference}</strong>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Payment type</span>
                    <div>{getTypeBadge(selectedTransaction.type)}</div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Processed at</span>
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="w-3.5 h-3.5 text-muted-foreground" />
                      <strong className="text-xs font-semibold text-foreground">{selectedTransaction.date}</strong>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{selectedTransaction.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="p-6 pt-0 border-t-0 sm:justify-end">
                <DialogClose asChild>
                  <Button className="w-full sm:w-auto px-6 h-9 text-xs font-medium bg-secondary border border-border/70 hover:bg-foreground/10 text-foreground rounded-lg">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
