'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, ArrowUpRight, Building2, CheckCircle2, Eye, Landmark, MoreHorizontal, Pencil, Plus, Search, ShieldCheck, Trash2, Wallet, X } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

type AccountForm = Pick<Account, 'name' | 'accountNumber' | 'bankCode' | 'type' | 'balance'>;

const mockAccounts: Account[] = [
  { id: 'ACC-001', name: 'Main Operating Account', accountNumber: '1234567890', bankCode: 'BANK001', type: 'business', balance: 500000, status: 'active', lastActivity: 'Today, 14:32' },
  { id: 'ACC-002', name: 'Payroll Account', accountNumber: '0987654321', bankCode: 'BANK001', type: 'checking', balance: 250000, status: 'active', lastActivity: 'Today, 10:15' },
  { id: 'ACC-003', name: 'Contingency Fund', accountNumber: '5555555555', bankCode: 'BANK002', type: 'savings', balance: 1000000, status: 'active', lastActivity: 'Yesterday, 09:00' },
  { id: 'ACC-004', name: 'Vendor Payments', accountNumber: '3333333333', bankCode: 'BANK002', type: 'business', balance: 150000, status: 'inactive', lastActivity: '28 Feb, 16:45' },
];

const emptyForm: AccountForm = {
  name: '',
  accountNumber: '',
  bankCode: '',
  type: 'business',
  balance: 0,
};

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const numberFormatter = new Intl.NumberFormat('en-US');

function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

function maskAccount(accountNumber: string) {
  return `•••• ${accountNumber.slice(-4)}`;
}

function getStatusBadge(status: Account['status']) {
  const labels = { active: 'Active', inactive: 'Inactive', suspended: 'Suspended' };
  const variants: Record<Account['status'], 'default' | 'secondary' | 'destructive'> = {
    active: 'default',
    inactive: 'secondary',
    suspended: 'destructive',
  };
  return <Badge variant={variants[status]} className={`accounts-status accounts-status-${status}`}>{labels[status]}</Badge>;
}

function getTypeBadge(type: Account['type']) {
  return <span className={`accounts-type accounts-type-${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>;
}

function getAccountIcon(type: Account['type']) {
  if (type === 'savings') return <Wallet />;
  if (type === 'checking') return <Landmark />;
  return <Building2 />;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null);
  const [form, setForm] = useState<AccountForm>(emptyForm);

  const filteredAccounts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return accounts.filter((account) => {
      const matchesSearch = !query || [account.name, account.accountNumber, account.bankCode, account.id].some((value) => value.toLowerCase().includes(query));
      const matchesType = filterType === 'all' || account.type === filterType;
      const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [accounts, filterStatus, filterType, searchTerm]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const activeAccounts = accounts.filter((account) => account.status === 'active').length;
  const inactiveAccounts = accounts.filter((account) => account.status !== 'active').length;
  const totalFilteredBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  const hasFilters = Boolean(searchTerm || filterType !== 'all' || filterStatus !== 'all');

  function openAddDialog() {
    setEditingAccount(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  }

  function openEditDialog(account: Account) {
    setEditingAccount(account);
    setForm({ name: account.name, accountNumber: account.accountNumber, bankCode: account.bankCode, type: account.type, balance: account.balance });
    setIsDialogOpen(true);
  }

  function updateForm(field: keyof AccountForm, value: string) {
    setForm((current) => ({ ...current, [field]: field === 'balance' ? Number(value) : value } as AccountForm));
  }

  function saveAccount() {
    if (!form.name.trim() || !form.accountNumber.trim() || !form.bankCode.trim()) return;

    if (editingAccount) {
      setAccounts((current) => current.map((account) => account.id === editingAccount.id ? { ...account, ...form, lastActivity: 'Just now' } : account));
    } else {
      const nextId = `ACC-${String(accounts.length + 1).padStart(3, '0')}`;
      setAccounts((current) => [...current, { ...form, id: nextId, status: 'active', lastActivity: 'Just now' }]);
    }
    setIsDialogOpen(false);
  }

  function deleteAccount(accountId: string) {
    setAccounts((current) => current.filter((account) => account.id !== accountId));
    if (viewingAccount?.id === accountId) setViewingAccount(null);
  }

  function clearFilters() {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
  }

  return (
    <div className="accounts-page page-stack compact-route-page">
      <PageHeader
        title="Accounts"
        description="Manage payment, settlement, and operating accounts from one secure workspace"
        actions={<Button size="sm" className="compact-primary-button gap-2" onClick={openAddDialog}><Plus />Add Account</Button>}
      />

      <section className="accounts-summary-grid" aria-label="Account overview">
        <Card className="dashboard-card accounts-summary-card">
          <CardContent className="accounts-summary-content"><span className="accounts-summary-icon accounts-summary-icon-primary"><Wallet /></span><span><small>Total balance</small><strong>{formatCurrency(totalBalance)}</strong><em>Across all accounts</em></span></CardContent>
        </Card>
        <Card className="dashboard-card accounts-summary-card">
          <CardContent className="accounts-summary-content"><span className="accounts-summary-icon accounts-summary-icon-success"><CheckCircle2 /></span><span><small>Active accounts</small><strong>{activeAccounts}</strong><em>{accounts.length ? Math.round((activeAccounts / accounts.length) * 100) : 0}% of portfolio</em></span></CardContent>
        </Card>
        <Card className="dashboard-card accounts-summary-card">
          <CardContent className="accounts-summary-content"><span className="accounts-summary-icon accounts-summary-icon-info"><Landmark /></span><span><small>Account portfolio</small><strong>{accounts.length}</strong><em>{numberFormatter.format(totalBalance / Math.max(accounts.length, 1))} avg. balance</em></span></CardContent>
        </Card>
        <Card className="dashboard-card accounts-summary-card">
          <CardContent className="accounts-summary-content"><span className="accounts-summary-icon accounts-summary-icon-warning"><AlertCircle /></span><span><small>Needs attention</small><strong>{inactiveAccounts}</strong><em>{inactiveAccounts ? 'Review account status' : 'All accounts healthy'}</em></span></CardContent>
        </Card>
      </section>

      <section className="accounts-content-grid" aria-label="Account management">
        <Card className="dashboard-card compact-table-card accounts-table-card">
          <CardHeader className="compact-card-header accounts-table-header">
            <div className="accounts-table-heading"><div><CardTitle className="compact-panel-title">Your accounts</CardTitle><CardDescription className="compact-panel-description">Monitor balances, account status, and recent activity</CardDescription></div><Badge variant="outline" className="accounts-count-badge">{filteredAccounts.length} shown</Badge></div>
            <div className="accounts-filter-bar">
              <div className="accounts-search-field"><Search /><Input aria-label="Search accounts" placeholder="Search name, ID, or bank..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="compact-input" /></div>
              <Select value={filterType} onValueChange={setFilterType}><SelectTrigger className="compact-filter-control accounts-filter-control"><SelectValue placeholder="Account type" /></SelectTrigger><SelectContent><SelectItem value="all">All types</SelectItem><SelectItem value="business">Business</SelectItem><SelectItem value="checking">Checking</SelectItem><SelectItem value="savings">Savings</SelectItem></SelectContent></Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="compact-filter-control accounts-filter-control"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="suspended">Suspended</SelectItem></SelectContent></Select>
              {hasFilters && <Button variant="ghost" size="sm" className="accounts-clear-button" onClick={clearFilters}><X />Clear</Button>}
            </div>
          </CardHeader>
          <CardContent className="compact-card-content p-0">
            <div className="accounts-table-meta"><span>{hasFilters ? `Showing ${filteredAccounts.length} of ${accounts.length} accounts` : 'All connected accounts'}</span><strong>{formatCurrency(totalFilteredBalance)} visible balance</strong></div>
            <div className="overflow-x-auto">
              <Table className="compact-data-table accounts-data-table">
                <TableHeader><TableRow className="border-border hover:bg-transparent"><TableHead>Account</TableHead><TableHead>Institution</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Status</TableHead><TableHead>Last activity</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => <TableRow key={account.id} className="border-border">
                    <TableCell><div className="accounts-primary-cell"><span className={`accounts-row-icon accounts-row-icon-${account.type}`}>{getAccountIcon(account.type)}</span><span><strong>{account.name}</strong><small>{account.id} · {maskAccount(account.accountNumber)}</small></span></div></TableCell>
                    <TableCell><div className="accounts-institution"><strong>{account.bankCode}</strong><small>Connected bank</small></div></TableCell>
                    <TableCell>{getTypeBadge(account.type)}</TableCell>
                    <TableCell className="text-right"><strong className="accounts-balance">{formatCurrency(account.balance)}</strong></TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell className="accounts-activity">{account.lastActivity}</TableCell>
                    <TableCell><div className="accounts-row-actions"><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`View ${account.name}`} onClick={() => setViewingAccount(account)}><Eye /></Button><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`Edit ${account.name}`} onClick={() => openEditDialog(account)}><Pencil /></Button><Button variant="ghost" size="icon-sm" className="compact-row-action" aria-label={`Delete ${account.name}`} onClick={() => deleteAccount(account.id)}><Trash2 className="text-destructive" /></Button></div></TableCell>
                  </TableRow>)}
                </TableBody>
              </Table>
              {filteredAccounts.length === 0 && <div className="accounts-empty-state"><Search /><strong>No accounts match your filters</strong><span>Try a different search or clear the active filters.</span>{hasFilters && <Button variant="outline" size="sm" className="compact-secondary-button" onClick={clearFilters}>Clear filters</Button>}</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card compact-settings-card accounts-health-card">
          <CardHeader className="compact-card-header"><CardTitle className="compact-panel-title">Account health</CardTitle><CardDescription className="compact-panel-description">Connection and verification status</CardDescription></CardHeader>
          <CardContent className="compact-card-content accounts-health-content">
            <div className="accounts-health-score"><span className="accounts-health-ring"><ShieldCheck /></span><span><strong>{inactiveAccounts ? 'Good' : 'Excellent'}</strong><small>{inactiveAccounts ? 'A few accounts need review' : 'Everything is ready'}</small></span></div>
            <div className="accounts-health-list"><div><span className="accounts-health-dot accounts-health-dot-success" /><span><strong>Bank connections</strong><small>{accounts.length} of {accounts.length} connected</small></span><CheckCircle2 /></div><div><span className="accounts-health-dot accounts-health-dot-success" /><span><strong>Verification</strong><small>All required checks complete</small></span><CheckCircle2 /></div><div><span className="accounts-health-dot accounts-health-dot-warning" /><span><strong>Attention items</strong><small>{inactiveAccounts ? `${inactiveAccounts} account${inactiveAccounts === 1 ? '' : 's'} to review` : 'No action needed'}</small></span>{inactiveAccounts ? <AlertCircle /> : <CheckCircle2 />}</div></div>
            <div className="accounts-health-link"><span>View account activity</span><ArrowUpRight /></div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="accounts-dialog-content">
          <DialogHeader><DialogTitle>{editingAccount ? 'Edit account' : 'Add account'}</DialogTitle><DialogDescription>{editingAccount ? 'Update the account details used for payment operations.' : 'Connect a payment or settlement account to your workspace.'}</DialogDescription></DialogHeader>
          <div className="accounts-form-grid"><div className="accounts-form-field accounts-form-field-wide"><Label htmlFor="account-name">Account name</Label><Input id="account-name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="e.g. Main Operating Account" className="compact-input" /></div><div className="accounts-form-field"><Label htmlFor="account-number">Account number</Label><Input id="account-number" value={form.accountNumber} onChange={(event) => updateForm('accountNumber', event.target.value)} placeholder="Enter account number" className="compact-input" /></div><div className="accounts-form-field"><Label htmlFor="bank-code">Bank code</Label><Input id="bank-code" value={form.bankCode} onChange={(event) => updateForm('bankCode', event.target.value)} placeholder="e.g. BANK001" className="compact-input" /></div><div className="accounts-form-field"><Label htmlFor="account-type">Account type</Label><Select value={form.type} onValueChange={(value) => updateForm('type', value)}><SelectTrigger id="account-type" className="compact-filter-control"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="business">Business</SelectItem><SelectItem value="checking">Checking</SelectItem><SelectItem value="savings">Savings</SelectItem></SelectContent></Select></div><div className="accounts-form-field"><Label htmlFor="account-balance">Opening balance</Label><Input id="account-balance" type="number" min="0" value={form.balance} onChange={(event) => updateForm('balance', event.target.value)} className="compact-input" /></div></div>
          <DialogFooter><DialogClose asChild><Button variant="outline" className="compact-secondary-button">Cancel</Button></DialogClose><Button onClick={saveAccount} className="compact-primary-button">{editingAccount ? 'Save changes' : 'Add account'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingAccount)} onOpenChange={(open) => !open && setViewingAccount(null)}>
        <DialogContent className="accounts-dialog-content accounts-detail-dialog">
          {viewingAccount && <><DialogHeader><div className="accounts-detail-title"><span className={`accounts-row-icon accounts-row-icon-${viewingAccount.type}`}>{getAccountIcon(viewingAccount.type)}</span><span><DialogTitle>{viewingAccount.name}</DialogTitle><DialogDescription>{viewingAccount.id} · {viewingAccount.bankCode}</DialogDescription></span></div></DialogHeader><div className="accounts-detail-balance"><small>Available balance</small><strong>{formatCurrency(viewingAccount.balance)}</strong><span>{getStatusBadge(viewingAccount.status)}</span></div><div className="accounts-detail-grid"><div><small>Account number</small><strong>{maskAccount(viewingAccount.accountNumber)}</strong></div><div><small>Account type</small><strong>{viewingAccount.type.charAt(0).toUpperCase() + viewingAccount.type.slice(1)}</strong></div><div><small>Last activity</small><strong>{viewingAccount.lastActivity}</strong></div><div><small>Institution</small><strong>{viewingAccount.bankCode}</strong></div></div><DialogFooter><Button variant="outline" className="compact-secondary-button" onClick={() => { setViewingAccount(null); openEditDialog(viewingAccount); }}><Pencil />Edit account</Button><DialogClose asChild><Button className="compact-primary-button">Done</Button></DialogClose></DialogFooter></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
