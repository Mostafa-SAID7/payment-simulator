'use client';

import React, { useMemo, useState } from 'react';
import { AlertCircle, BarChart3, BookOpen, Building2, Calendar, Calculator, CheckCircle2, Clock3, Download, FileText, Landmark, PieChart, Receipt, RefreshCw, Search, ShieldCheck, Trash2, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface TaxDocument {
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'Available' | 'Verified' | 'Pending';
  period: string;
}

const initialTaxDocuments: TaxDocument[] = [
  { name: '1099-K Form 2024', type: 'Annual Form', date: 'Jan 31, 2025', size: '1.2 MB', status: 'Available', period: '2024' },
  { name: 'Q4 2024 Tax Summary', type: 'Quarterly', date: 'Jan 15, 2025', size: '0.8 MB', status: 'Available', period: 'Q4 2024' },
  { name: 'Q3 2024 Tax Summary', type: 'Quarterly', date: 'Oct 15, 2024', size: '0.7 MB', status: 'Available', period: 'Q3 2024' },
  { name: 'W-9 Form (Updated)', type: 'Legal', date: 'May 12, 2024', size: '2.1 MB', status: 'Verified', period: '2024' },
  { name: 'Q2 2024 Tax Summary', type: 'Quarterly', date: 'Jul 15, 2024', size: '0.6 MB', status: 'Available', period: 'Q2 2024' },
  { name: 'Q1 2024 Tax Summary', type: 'Quarterly', date: 'Apr 15, 2024', size: '0.5 MB', status: 'Verified', period: 'Q1 2024' },
  { name: '1099-K Form 2023', type: 'Annual Form', date: 'Jan 31, 2024', size: '1.1 MB', status: 'Verified', period: '2023' },
  { name: 'State Tax Filing 2024', type: 'State', date: 'Mar 15, 2025', size: '0.9 MB', status: 'Pending', period: '2024' },
];

const heroStats = [
  { label: 'Estimated Tax', value: '$124,500', icon: Calculator, color: 'text-primary', bg: 'bg-primary/15' },
  { label: 'Tax Collected', value: '$84,200', icon: Receipt, color: 'text-success', bg: 'bg-success/15' },
  { label: 'Withheld', value: '$40,300', icon: Landmark, color: 'text-warning', bg: 'bg-warning/15' },
  { label: 'Documents', value: '8', icon: FileText, color: 'text-info', bg: 'bg-info/15' },
];

const quarterlyBreakdown = [
  { quarter: 'Q1 2024', estimated: 28500, paid: 26200, pct: 92, width: 'w-[92%]' },
  { quarter: 'Q2 2024', estimated: 31200, paid: 31200, pct: 100, width: 'w-full' },
  { quarter: 'Q3 2024', estimated: 29800, paid: 27000, pct: 91, width: 'w-[91%]' },
  { quarter: 'Q4 2024', estimated: 35000, paid: 0, pct: 0, width: 'w-0' },
];

const taxCategories = [
  { label: 'Federal Income', amount: '$62,400', pct: 50, color: 'bg-primary', width: 'w-1/2' },
  { label: 'State Income', amount: '$24,900', pct: 20, color: 'bg-info', width: 'w-1/5' },
  { label: 'Self-Employment', amount: '$18,675', pct: 15, color: 'bg-success', width: 'w-[15%]' },
  { label: 'Sales Tax', amount: '$12,450', pct: 10, color: 'bg-warning', width: 'w-[10%]' },
  { label: 'Other', amount: '$6,075', pct: 5, color: 'bg-muted-foreground', width: 'w-[5%]' },
];

const recentActivity = [
  { icon: CheckCircle2, text: 'Q3 2024 summary verified', time: '2d ago', tone: 'success' },
  { icon: Clock3, text: 'State Tax Filing 2024 pending review', time: '5d ago', tone: 'warning' },
  { icon: Download, text: '1099-K Form 2024 downloaded', time: '1w ago', tone: 'primary' },
  { icon: AlertCircle, text: 'Q4 2024 payment due Jan 15', time: '2w ago', tone: 'destructive' },
];

const toneMap: Record<string, string> = { destructive: 'bg-destructive/10 text-destructive', success: 'bg-success/10 text-success', warning: 'bg-warning/10 text-warning', primary: 'bg-primary/10 text-primary' };
const statusStyles: Record<TaxDocument['status'], string> = { Available: 'border-success/40 text-success bg-success/8', Verified: 'border-primary/40 text-primary bg-primary/8', Pending: 'border-warning/40 text-warning bg-warning/8' };
const upcomingDeadlines = [
  { label: 'Q4 2024 Estimated Tax', due: 'Jan 15, 2025', status: 'overdue' },
  { label: 'Annual Filing 2024', due: 'Apr 15, 2025', status: 'upcoming' },
  { label: 'State Return 2024', due: 'Apr 15, 2025', status: 'upcoming' },
  { label: 'Q1 2025 Estimated Tax', due: 'Apr 15, 2025', status: 'upcoming' },
];

function SectionHeader({ icon: Icon, title, description, accent = false, action }: { icon: typeof FileText; title: string; description: string; accent?: boolean; action?: React.ReactNode }) {
  return <div className={cn('flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border/50', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}><div className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}><Icon className="w-4 h-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground leading-tight">{title}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">{description}</p></div>{action && <div className="shrink-0">{action}</div>}</div>;
}

export default function TaxesPage() {
  const [documents, setDocuments] = useState<TaxDocument[]>(initialTaxDocuments);
  const [selectedDocument, setSelectedDocument] = useState<TaxDocument | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDocuments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesSearch = !query || [document.name, document.type, document.period].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (filterType === 'all' || document.type === filterType) && (filterStatus === 'all' || document.status === filterStatus);
    });
  }, [documents, searchTerm, filterType, filterStatus]);

  const hasFilters = Boolean(searchTerm || filterType !== 'all' || filterStatus !== 'all');
  const docStats = { available: documents.filter((document) => document.status === 'Available').length, verified: documents.filter((document) => document.status === 'Verified').length, pending: documents.filter((document) => document.status === 'Pending').length };
  const documentCount = Math.max(documents.length, 1);
  const verifiedPercent = Math.round((docStats.verified / documentCount) * 100);
  const verifiedDash = Math.round((docStats.verified / documentCount) * 163.4);

  function clearFilters() { setSearchTerm(''); setFilterType('all'); setFilterStatus('all'); }
  function deleteSelectedDocument() {
    if (!selectedDocument) return;
    setDocuments((current) => current.filter((document) => document.name !== selectedDocument.name));
    setSelectedDocument(null);
  }
  function downloadAll() {
    const csv = ['Name,Type,Date,Size,Status,Period', ...documents.map((document) => `"${document.name}","${document.type}","${document.date}","${document.size}","${document.status}","${document.period}"`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tax-documents.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-warning/6 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-warning/5 blur-2xl pointer-events-none" />
        <div className="relative px-5 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0"><div className="relative shrink-0"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-warning/20 border border-primary/20 flex items-center justify-center shadow-sm"><Receipt className="w-7 h-7 text-primary" /></div><span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" /></div><div className="min-w-0"><h1 className="text-xl font-bold text-foreground leading-tight">Tax Center</h1><p className="text-sm text-muted-foreground mt-0.5">Manage filings, documents &amp; obligations</p><div className="flex flex-wrap items-center gap-3 mt-2"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Building2 className="w-3.5 h-3.5" /> FinPay Corp</span><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> Tax Year 2024</span><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><BookOpen className="w-3.5 h-3.5" /> {documents.length} documents</span></div></div></div>
          <div className="flex items-center gap-2 shrink-0"><Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 border-border/60" onClick={downloadAll}><Download className="w-3.5 h-3.5" /> Export All</Button><Button size="sm" className="h-8 text-xs gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Sync</Button></div>
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-px border-t border-border/40 bg-border/20">{heroStats.map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-3 px-4 py-3.5 bg-card/80 backdrop-blur-sm"><span className={cn('inline-flex items-center justify-center w-8 h-8 rounded-xl shrink-0', bg, color)}><Icon className="w-4 h-4" /></span><div className="min-w-0"><p className="text-[0.65rem] text-muted-foreground font-medium leading-none mb-1">{label}</p><p className="text-base font-bold text-foreground leading-none">{value}</p></div></div>)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <SectionHeader icon={FileText} title="Tax Documents" description={`${documents.length} documents · ${docStats.verified} verified · ${docStats.pending} pending`} accent action={<Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 border-border/60" onClick={downloadAll}><Download className="w-3 h-3" /> Download All</Button>} />
            <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20"><div className="relative flex-1 min-w-[160px]"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Search documents…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="h-7 pl-8 text-xs bg-background border-border/60 rounded-lg" /></div><select value={filterType} onChange={(event) => setFilterType(event.target.value)} className="h-7 px-2.5 text-xs rounded-lg border border-border/60 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="all">All Types</option><option value="Annual Form">Annual Form</option><option value="Quarterly">Quarterly</option><option value="Legal">Legal</option><option value="State">State</option></select><select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="h-7 px-2.5 text-xs rounded-lg border border-border/60 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"><option value="all">All Status</option><option value="Available">Available</option><option value="Verified">Verified</option><option value="Pending">Pending</option></select>{hasFilters && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground" onClick={clearFilters}><X className="w-3 h-3 mr-1" /> Clear</Button>}</div>
            <div className="overflow-x-auto [scrollbar-width:thin]"><table className="min-w-[580px] w-full text-xs"><thead><tr className="border-b border-border/50 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[0.68rem] [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:uppercase [&_th]:tracking-wide"><th>Document</th><th>Type</th><th>Period</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredDocuments.length > 0 ? filteredDocuments.map((document) => <tr key={document.name} className="border-b border-border/30 hover:bg-muted/30 transition-colors [&_td]:px-4 [&_td]:py-3"><td><div className="flex items-center gap-3"><div className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary"><FileText className="w-3.5 h-3.5" /></div><span className="font-semibold text-foreground truncate max-w-[160px]">{document.name}</span></div></td><td><span className="inline-flex items-center px-2 py-0.5 rounded-md border border-border/50 bg-muted/40 text-[10px] font-medium text-muted-foreground">{document.type}</span></td><td className="text-muted-foreground">{document.period}</td><td className="text-muted-foreground">{document.date}</td><td><Badge variant="outline" className={cn('rounded-full px-2.5 py-0.5 text-[9px] font-semibold border uppercase tracking-wider', statusStyles[document.status])}>{document.status}</Badge></td><td><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60" aria-label={`Download ${document.name}`}><Download className="w-3.5 h-3.5" /></Button><Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${document.name}`} onClick={() => setSelectedDocument(document)}><Trash2 className="w-3.5 h-3.5" /></Button></div></td></tr>) : <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No documents match your filters.</td></tr>}</tbody></table></div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={BarChart3} title="Quarterly Tax Breakdown" description="Estimated vs. paid per quarter — FY 2024" accent /><div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">{quarterlyBreakdown.map((quarter) => <div key={quarter.quarter} className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-foreground">{quarter.quarter}</span><Badge variant="outline" className={cn('text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border', quarter.pct === 100 ? 'border-success/40 text-success bg-success/8' : quarter.pct === 0 ? 'border-destructive/40 text-destructive bg-destructive/8' : 'border-warning/40 text-warning bg-warning/8')}>{quarter.pct === 0 ? 'Due' : quarter.pct === 100 ? 'Paid' : `${quarter.pct}%`}</Badge></div><div className="space-y-1.5"><div className="flex justify-between text-xs text-muted-foreground"><span>Estimated</span><span className="font-medium text-foreground">${quarter.estimated.toLocaleString()}</span></div><div className="flex justify-between text-xs text-muted-foreground"><span>Paid</span><span className={cn('font-medium', quarter.paid === 0 ? 'text-destructive' : 'text-success')}>{quarter.paid === 0 ? 'Unpaid' : `$${quarter.paid.toLocaleString()}`}</span></div></div><div className="w-full h-1.5 rounded-full bg-muted overflow-hidden"><div className={cn('h-full rounded-full transition-all', quarter.pct === 100 ? 'bg-success' : quarter.pct === 0 ? 'bg-destructive/40' : 'bg-warning', quarter.width)} /></div></div>)}</div></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={PieChart} title="Tax Breakdown" description="By category — FY 2024" /><div className="p-5 space-y-3">{taxCategories.map((category) => <div key={category.label} className="space-y-1.5"><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground font-medium">{category.label}</span><div className="flex items-center gap-2"><span className="font-semibold text-foreground">{category.amount}</span><span className="text-muted-foreground/70">{category.pct}%</span></div></div><div className="w-full h-1.5 rounded-full bg-muted overflow-hidden"><div className={cn('h-full rounded-full', category.color, category.width)} /></div></div>)}<div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs"><span className="font-semibold text-foreground">Total Estimated</span><span className="font-bold text-primary">$124,500</span></div></div></div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Calendar} title="Upcoming Deadlines" description="Filing &amp; payment due dates" /><div className="p-4 space-y-2">{upcomingDeadlines.map((deadline) => <div key={deadline.label} className={cn('flex items-center gap-3 p-3 rounded-xl border transition-colors', deadline.status === 'overdue' ? 'border-destructive/30 bg-destructive/5' : 'border-border/40 bg-muted/20 hover:bg-muted/40')}><div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', deadline.status === 'overdue' ? 'bg-destructive/15 text-destructive' : 'bg-warning/15 text-warning')}>{deadline.status === 'overdue' ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock3 className="w-3.5 h-3.5" />}</div><div className="flex-1 min-w-0"><p className="text-xs font-semibold text-foreground truncate">{deadline.label}</p><p className={cn('text-[0.65rem] font-medium', deadline.status === 'overdue' ? 'text-destructive' : 'text-muted-foreground')}>Due {deadline.due}</p></div>{deadline.status === 'overdue' && <Badge variant="outline" className="text-[9px] border-destructive/40 text-destructive bg-destructive/8 rounded-full px-2 py-0.5 font-bold uppercase tracking-wider shrink-0">Overdue</Badge>}</div>)}</div></div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={ShieldCheck} title="Document Health" description="Compliance &amp; verification status" /><div className="p-5 space-y-4"><div className="flex items-center gap-4"><div className="relative w-16 h-16 shrink-0"><svg viewBox="0 0 64 64" className="w-full h-full -rotate-90"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/40" /><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={`${verifiedDash} 163.4`} strokeLinecap="round" className="text-success" /></svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-foreground">{verifiedPercent}%</span></div></div><div className="space-y-1.5 flex-1"><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Verified</span><span className="font-semibold text-success">{docStats.verified}</span></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Available</span><span className="font-semibold text-foreground">{docStats.available}</span></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Pending</span><span className="font-semibold text-warning">{docStats.pending}</span></div></div></div>{[{ label: 'Annual forms filed', ok: true }, { label: 'W-9 up to date', ok: true }, { label: 'Q4 payment made', ok: false }, { label: 'State filing complete', ok: false }].map((item) => <div key={item.label} className="flex items-center gap-2.5 text-xs"><div className={cn('w-4 h-4 rounded-full flex items-center justify-center shrink-0', item.ok ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive')}>{item.ok ? <CheckCircle2 className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}</div><span className={item.ok ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span></div>)}</div></div>

          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"><SectionHeader icon={Zap} title="Recent Activity" description="Latest tax events" /><div className="p-4 space-y-2">{recentActivity.map((item) => { const Icon = item.icon; return <div key={item.text} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors"><div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5', toneMap[item.tone])}><Icon className="w-3.5 h-3.5" /></div><div className="flex-1 min-w-0"><p className="text-xs font-medium text-foreground leading-snug">{item.text}</p><p className="text-[0.65rem] text-muted-foreground mt-0.5">{item.time}</p></div></div>; })}</div></div>
        </div>
      </div>

      <AlertDialog open={Boolean(selectedDocument)} onOpenChange={(open) => { if (!open) setSelectedDocument(null); }}><AlertDialogContent className="max-w-md rounded-2xl border-border/70 bg-card"><AlertDialogHeader><AlertDialogTitle>Delete tax document?</AlertDialogTitle><AlertDialogDescription>This document will be permanently removed. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>{selectedDocument && <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/50 p-3"><div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive"><FileText className="size-4" /></div><div className="min-w-0 space-y-1"><p className="truncate text-sm font-semibold text-foreground">{selectedDocument.name}</p><p className="text-xs text-muted-foreground">{selectedDocument.type} · {selectedDocument.date} · {selectedDocument.size}</p><p className="text-xs text-muted-foreground">Status: {selectedDocument.status}</p></div></div>}<AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={deleteSelectedDocument}>Delete document</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
