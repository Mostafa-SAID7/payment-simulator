'use client';

import React, { useMemo, useState } from 'react';
import { AlertCircle, Activity, ArrowRight, ArrowUpRight, BarChart3, Building2, Calendar, CheckCircle2, Clock3, CreditCard, Download, Eye, FileText, Filter, Globe, Hash, Mail, Phone, RefreshCw, Search, ShieldCheck, TrendingDown, TrendingUp, X, Zap, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const typeDistribution = [
  { type: 'ACH', count: 3, pct: 38, color: 'bg-primary', width: 'w-[38%]' },
  { type: 'RTGS', count: 3, pct: 38, color: 'bg-info', width: 'w-[38%]' },
  { type: 'WPS', count: 2, pct: 24, color: 'bg-success', width: 'w-[24%]' },
];

const recentActivity: { icon: React.ElementType; text: string; time: string; tone: string }[] = [
  { icon: CheckCircle2, text: 'TXN-2024-008 settled successfully', time: '2m ago', tone: 'success' },
  { icon: AlertCircle, text: 'TXN-2024-004 failed — invalid account', time: '1h ago', tone: 'destructive' },
  { icon: Clock3, text: 'TXN-2024-005 awaiting settlement', time: '3h ago', tone: 'warning' },
  { icon: CheckCircle2, text: 'TXN-2024-006 batch completed', time: '5h ago', tone: 'success' },
];

const toneMap: Record<string, string> = {
  destructive: 'bg-destructive/10 text-destructive',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  primary: 'bg-primary/10 text-primary',
};

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const formatCurrency = (amount: number) => currencyFormatter.format(amount);

function getStatusBadge(status: Transaction['status']) {
  const styles: Record<Transaction['status'], string> = {
    completed: 'border-success/40 text-success bg-success/8',
    pending: 'border-warning/40 text-warning bg-warning/8',
    failed: 'border-destructive/40 text-destructive bg-destructive/8',
  };
  const labels = { completed: 'Completed', pending: 'Pending', failed: 'Failed' };
  return <Badge variant="outline" className={cn('rounded-full px-2.5 py-0.5 text-[9px] font-semibold border uppercase tracking-wider', styles[status])}>{labels[status]}</Badge>;
}

function getTypeBadge(type: Transaction['type']) {
  const styles: Record<Transaction['type'], string> = { ACH: 'bg-primary/10 text-primary border-primary/25', RTGS: 'bg-info/10 text-info border-info/25', WPS: 'bg-success/10 text-success border-success/25' };
  return <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-semibold tracking-wide', styles[type])}>{type}</span>;
}

function SectionHeader({ icon: Icon, title, description, accent = false }: { icon: typeof FileText; title: string; description: string; accent?: boolean }) {
  return <div className={cn('flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border/50', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}><div className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}><Icon className="w-4 h-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground leading-tight">{title}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">{description}</p></div></div>;
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
      return matchesSearch && (filterType === 'all' || transaction.type === filterType) && (filterStatus === 'all' || transaction.status === filterStatus);
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
  const completionRate = Math.round((stats.completed / stats.total) * 100);
  const hasFilters = Boolean(searchTerm || filterType !== 'all' || filterStatus !== 'all');

  function clearFilters() { setSearchTerm(''); setFilterType('all'); setFilterStatus('all'); }

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
    <div className="flex flex-col gap-4 pb-6">
      <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-success/6 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative px-5 pt-5 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3"><div className="relative"><div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shadow-sm"><Activity className="w-6 h-6 text-primary" /></div><span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" /></div><div><h1 className="text-lg font-bold text-foreground leading-tight">Transaction Ledger</h1><p className="text-xs text-muted-foreground mt-0.5">Monitor, filter &amp; export all payment activity</p></div></div>
            <div className="flex items-center gap-2 flex-wrap"><Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60" onClick={exportTransactions}><Download className="w-3.5 h-3.5" /> Export CSV</Button><Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60"><RefreshCw className="w-3.5 h-3.5" /> Refresh</Button><Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"><FileText className="w-3.5 h-3.5" /> New Payment</Button></div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">{[{ icon: Building2, text: 'FinPay Corp' }, { icon: Globe, text: 'finpay.com' }, { icon: Mail, text: 'payments@finpay.com' }, { icon: Phone, text: '+1 (555) 123-4567' }].map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Icon className="w-3 h-3 shrink-0" />{text}</span>)}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">{[{ label: 'Total Volume', value: '$400K', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/15' }, { label: 'Completed', value: '6', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/15' }, { label: 'Pending', value: '1', icon: Clock3, color: 'text-warning', bg: 'bg-warning/15' }, { label: 'Failed', value: '1', icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/15' }].map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><span className={cn('inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0', bg, color)}><Icon className="w-4 h-4" /></span><div className="min-w-0"><p className="text-[0.65rem] text-muted-foreground font-medium leading-none">{label}</p><p className="text-base font-bold text-foreground mt-0.5 leading-none">{value}</p></div></div>)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><div className="px-4 py-3 flex flex-col sm:flex-row gap-2"><div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Search recipient, ID, or reference…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="pl-8 h-8 text-xs bg-background/60 border-border/50" /></div><div className="flex gap-2 flex-wrap"><div className="relative"><select value={filterType} onChange={(event) => setFilterType(event.target.value)} className="h-8 pl-3 pr-7 text-xs rounded-md border border-border/50 bg-background/60 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="all">All types</option><option value="ACH">ACH</option><option value="RTGS">RTGS</option><option value="WPS">WPS</option></select><Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" /></div><div className="relative"><select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="h-8 pl-3 pr-7 text-xs rounded-md border border-border/50 bg-background/60 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="all">All statuses</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="failed">Failed</option></select><Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" /></div>{hasFilters && <Button variant="ghost" size="sm" className="h-8 text-xs px-2.5 text-muted-foreground hover:text-foreground" onClick={clearFilters}><X className="w-3.5 h-3.5 mr-1" /> Clear</Button>}</div></div></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={FileText} title="All Transactions" description={`${filteredTransactions.length} result${filteredTransactions.length !== 1 ? 's' : ''} · sorted by date`} accent /><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-border/50 bg-muted/20 [&_th]:px-5 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:text-[10px] [&_th]:uppercase [&_th]:tracking-wider"><th>Transaction</th><th>Date &amp; Time</th><th>Recipient</th><th>Type</th><th>Amount</th><th>Status</th><th className="text-right">View</th></tr></thead><tbody>{filteredTransactions.map((transaction, index) => <tr key={transaction.id} className={cn('hover:bg-foreground/[0.03] transition-colors [&_td]:px-5 [&_td]:py-3.5', index !== filteredTransactions.length - 1 && 'border-b border-border/30')}><td><div className="flex flex-col gap-0.5"><span className="font-semibold text-foreground">{transaction.id}</span><span className="text-muted-foreground text-[9px] font-medium">{transaction.reference}</span></div></td><td><div className="flex flex-col gap-0.5"><span className="font-medium text-foreground">{transaction.date}</span><span className="text-muted-foreground text-[9px] flex items-center gap-1"><Clock3 className="w-2.5 h-2.5" />{transaction.time}</span></div></td><td><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Building2 className="w-3.5 h-3.5 text-primary" /></div><div className="flex flex-col gap-0.5"><span className="font-semibold text-foreground leading-tight">{transaction.recipient}</span><span className="text-muted-foreground text-[9px]">{transaction.description}</span></div></div></td><td>{getTypeBadge(transaction.type)}</td><td><span className="font-bold text-foreground">{formatCurrency(transaction.amount)}</span></td><td>{getStatusBadge(transaction.status)}</td><td className="text-right"><Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 border border-border/40" aria-label={`View ${transaction.id}`} onClick={() => setSelectedTransaction(transaction)}><Eye className="w-3.5 h-3.5" /></Button></td></tr>)}{filteredTransactions.length === 0 && <tr><td colSpan={7} className="py-14"><div className="flex flex-col items-center gap-3 text-center"><div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center"><Search className="w-5 h-5 text-muted-foreground" /></div><p className="text-sm font-medium text-muted-foreground">No transactions found</p><p className="text-xs text-muted-foreground/70">Try adjusting your filters or search term.</p>{hasFilters && <Button variant="outline" size="sm" className="mt-1 h-8 text-xs border-border/50" onClick={clearFilters}>Clear filters</Button>}</div></td></tr>}</tbody></table></div></Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={ShieldCheck} title="Settlement Health" description="Payment reliability overview" accent /><CardContent className="p-5 flex flex-col gap-4"><div className="flex items-center gap-4"><div className="relative w-16 h-16 shrink-0"><svg viewBox="0 0 56 56" className="w-full h-full -rotate-90"><circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="6" className="text-border/40" /><circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 22}`} strokeDashoffset={`${2 * Math.PI * 22 * (1 - completionRate / 100)}`} strokeLinecap="round" className="text-success transition-all duration-700" /></svg><span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{completionRate}%</span></div><div><p className="text-sm font-semibold text-foreground">Healthy throughput</p><p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">Completion rate across all payments</p></div></div><div className="flex flex-col gap-3 pt-3 border-t border-border/40">{[{ label: 'Completed', count: stats.completed, pct: completionRate, color: 'bg-success', textColor: 'text-success', width: 'w-[75%]' }, { label: 'Pending', count: stats.pending, pct: Math.round((stats.pending / stats.total) * 100), color: 'bg-warning', textColor: 'text-warning', width: 'w-[13%]' }, { label: 'Failed', count: stats.failed, pct: Math.round((stats.failed / stats.total) * 100), color: 'bg-destructive', textColor: 'text-destructive', width: 'w-[13%]' }].map(({ label, count, pct, color, textColor, width }) => <div key={label} className="flex flex-col gap-1.5"><div className="flex items-center justify-between text-[0.7rem]"><span className="text-muted-foreground font-medium">{label}</span><span className={cn('font-bold', textColor)}>{count} · {pct}%</span></div><div className="h-1.5 rounded-full bg-border/30 overflow-hidden"><div className={cn('h-full rounded-full transition-all duration-700', color, width)} /></div></div>)}</div><button type="button" className="flex items-center justify-between text-[0.7rem] text-primary hover:text-primary/80 transition-colors group pt-1" onClick={() => setFilterStatus('failed')}><span className="font-medium">Review failed payments</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></button></CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={BarChart3} title="Payment Types" description="Distribution by method" /><CardContent className="p-5 flex flex-col gap-3">{typeDistribution.map(({ type, count, pct, color, width }) => <div key={type} className="flex flex-col gap-1.5"><div className="flex items-center justify-between text-[0.7rem]"><div className="flex items-center gap-2"><span className={cn('w-2 h-2 rounded-full', color)} /><span className="font-semibold text-foreground">{type}</span></div><span className="text-muted-foreground">{count} txns · {pct}%</span></div><div className="h-1.5 rounded-full bg-border/30 overflow-hidden"><div className={cn('h-full rounded-full transition-all duration-700', color, width)} /></div></div>)}<div className="mt-1 pt-3 border-t border-border/40 grid grid-cols-2 gap-2"><div className="rounded-xl border border-border/40 bg-background/60 px-3 py-2.5"><p className="text-[0.65rem] text-muted-foreground font-medium">Total Volume</p><p className="text-sm font-bold text-foreground mt-0.5">{formatCurrency(totalVolume)}</p></div><div className="rounded-xl border border-border/40 bg-background/60 px-3 py-2.5"><p className="text-[0.65rem] text-muted-foreground font-medium">Settled</p><p className="text-sm font-bold text-success mt-0.5">{formatCurrency(completedVolume)}</p></div></div></CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Activity} title="Recent Activity" description="Latest transaction events" /><CardContent className="p-5 flex flex-col gap-3">{recentActivity.map(({ icon: Icon, text, time, tone }) => <div key={text} className="flex items-start gap-3"><span className={cn('inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5', toneMap[tone])}><Icon className="w-3.5 h-3.5" /></span><div className="flex-1 min-w-0"><p className="text-[0.7rem] text-foreground font-medium leading-snug">{text}</p><p className="text-[0.65rem] text-muted-foreground mt-0.5">{time}</p></div></div>)}</CardContent></Card>

          <Card className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Zap} title="Quick Stats" description="At-a-glance metrics" /><CardContent className="p-5 grid grid-cols-2 gap-3">{[{ label: 'Avg. Amount', value: formatCurrency(totalVolume / stats.total), icon: TrendingUp, color: 'text-primary bg-primary/10' }, { label: 'Success Rate', value: `${completionRate}%`, icon: ShieldCheck, color: 'text-success bg-success/10' }, { label: 'Largest Txn', value: formatCurrency(Math.max(...mockTransactions.map((transaction) => transaction.amount))), icon: ArrowUpRight, color: 'text-info bg-info/10' }, { label: 'Failed Rate', value: `${Math.round((stats.failed / stats.total) * 100)}%`, icon: TrendingDown, color: 'text-destructive bg-destructive/10' }].map(({ label, value, icon: Icon, color }) => <div key={label} className="rounded-xl border border-border/40 bg-background/60 px-3 py-2.5 flex items-center gap-2.5"><span className={cn('inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0', color)}><Icon className="w-3.5 h-3.5" /></span><div className="min-w-0"><p className="text-[0.65rem] text-muted-foreground font-medium leading-none truncate">{label}</p><p className="text-xs font-bold text-foreground mt-0.5 leading-none">{value}</p></div></div>)}</CardContent></Card>
        </div>
      </div>

      {selectedTransaction && <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelectedTransaction(null)}><div className="absolute inset-0 bg-black/40 backdrop-blur-sm" /><div className="relative w-full max-w-md rounded-2xl bg-card border border-border/70 shadow-2xl overflow-hidden" onClick={(event) => event.stopPropagation()}><div className="flex items-start gap-4 p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent"><div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-primary" /></div><div className="flex-1 min-w-0 mt-0.5"><h2 className="text-base font-bold text-foreground leading-tight">{selectedTransaction.id}</h2><p className="text-xs text-muted-foreground mt-0.5">{selectedTransaction.description ?? 'Payment transaction details'}</p></div><button type="button" aria-label="Close transaction details" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors" onClick={() => setSelectedTransaction(null)}><X className="w-4 h-4" /></button></div><div className="mx-6 mt-5 flex items-center justify-between py-4 px-5 rounded-xl border border-border/40 bg-secondary/50"><div className="flex flex-col gap-1.5"><span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Status</span>{getStatusBadge(selectedTransaction.status)}</div><div className="flex flex-col items-end gap-1.5"><span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Amount</span><span className="text-2xl font-bold text-foreground">{formatCurrency(selectedTransaction.amount)}</span></div></div><div className="p-6 grid grid-cols-2 gap-y-5 gap-x-4">{[{ label: 'Recipient', value: selectedTransaction.recipient, icon: Building2 }, { label: 'Reference', value: selectedTransaction.reference, icon: Hash }, { label: 'Payment Type', value: selectedTransaction.type, icon: CreditCard }, { label: 'Date', value: selectedTransaction.date, icon: Calendar }].map(({ label, value, icon: Icon }) => <div key={label} className="flex flex-col gap-1.5"><span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5"><Icon className="w-3 h-3" />{label}</span><span className="text-sm font-semibold text-foreground">{value}</span></div>)}<div className="col-span-2 flex flex-col gap-1.5"><span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5"><Clock3 className="w-3 h-3" />Processed at</span><span className="text-sm font-semibold text-foreground">{selectedTransaction.date} · {selectedTransaction.time}</span></div></div><div className="px-6 pb-6 flex gap-2"><Button variant="outline" className="flex-1 h-9 text-xs border-border/60" onClick={() => setSelectedTransaction(null)}>Close</Button><Button className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"><Download className="w-3.5 h-3.5" /> Download Receipt</Button></div></div></div>}
    </div>
  );
}
