import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CircleDollarSign,
  Clock3,
  Download,
  CreditCard,
  Globe,
  Mail,
  MoreVertical,
  Phone,
  RefreshCw,
  ShieldCheck,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentActivityChart } from '@/components/dashboard/payment-activity-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';
import { PeriodSelect } from '@/components/dashboard/period-select';
import { AccountSelect } from '@/components/dashboard/account-select';
import { cn } from '@/lib/utils';

const paymentHistory = [
  { name: 'William Hirsch', subtitle: 'USA', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', invoice: 'INV-5784', detail: 'Service Fee', date: '20 July 2025', amount: '$585,658.00', status: 'Paid' },
  { name: 'William Hirsch', subtitle: 'USA', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', invoice: 'INV-5785', detail: 'Service Fee', date: '21 July 2025', amount: '$965,854.00', status: 'Pending' },
  { name: 'William Hirsch', subtitle: 'USA', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', invoice: 'INV-5786', detail: 'Service Fee', date: '25 July 2025', amount: '$985,414.00', status: 'Paid' },
];

const metrics = [
  { label: 'GROSS VOLUME', value: '$865,741.00', icon: CircleDollarSign, trend: '+14.2%' },
  { label: 'NET VOLUME', value: '$475,744.00', icon: Clock3, trend: '+9.8%' },
  { label: 'PER CUSTOMER', value: '$747,985.00', icon: CreditCard, trend: '+5.3%' },
];

const subBalances = [
  { val: '$525,525', dec: '.00', label: 'BTC/USD' },
  { val: '$414,587', dec: '.00', label: 'EUR/USD' },
  { val: '$785,58', dec: '.00', label: 'ETH/USD' },
  { val: '$875,525', dec: '.00', label: 'GBP/USD' },
];

const paymentHeroStats = [
  { label: 'Total volume', value: '$865K', icon: CircleDollarSign, color: 'text-primary', bg: 'bg-primary/15' },
  { label: 'Net volume', value: '$475K', icon: TrendingUp, color: 'text-success', bg: 'bg-success/15' },
  { label: 'Active rails', value: '4', icon: CreditCard, color: 'text-warning', bg: 'bg-warning/15' },
  { label: 'Settlement health', value: '98%', icon: ShieldCheck, color: 'text-info', bg: 'bg-info/15' },
];

const cardShadow = 'shadow-[0_1px_4px_oklch(0_0_0/0.05),0_1px_2px_oklch(0_0_0/0.04),inset_0_1px_0_color-mix(in_oklch,white_60%,transparent)] dark:shadow-[0_2px_8px_oklch(0_0_0/0.22),inset_0_1px_0_color-mix(in_oklch,white_3%,transparent)]';

function WalletIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function InfoMark() {
  return <span className="inline-flex size-3.5 items-center justify-center rounded-full border border-border/50 text-[8px] text-muted-foreground" title="More information">i</span>;
}

function YearPicker() {
  return <PeriodSelect defaultValue="year" />;
}

export default function PaymentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 pb-6 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-success/6" />
        <div className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 to-success/15 shadow-sm"><Activity className="size-7 text-primary" /></div>
                <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card bg-success" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2"><h1 className="text-xl font-bold leading-tight tracking-tight text-foreground">Payments</h1><Badge variant="secondary" className="border-primary/20 bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold text-primary">Live workspace</Badge></div>
                <p className="mt-0.5 text-sm text-muted-foreground">Monitor balances, transfers &amp; payment activity</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2"><Button variant="outline" size="sm" className="h-8 gap-1.5 border-border/60 text-xs"><Download className="size-3.5" /> Export</Button><Button variant="outline" size="sm" className="h-8 gap-1.5 border-border/60 text-xs"><RefreshCw className="size-3.5" /> Refresh</Button></div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5"><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Building2 className="size-3" /> FinPay Corp</span><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Globe className="size-3" /> finpay.com</span><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Mail className="size-3" /> payments@finpay.com</span><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Phone className="size-3" /> +1 (555) 123-4567</span></div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{paymentHeroStats.map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><span className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-lg', bg, color)}><Icon className="size-4" /></span><div className="min-w-0"><p className="text-[0.65rem] font-medium leading-none text-muted-foreground">{label}</p><p className="mt-0.5 text-base font-bold leading-none text-foreground">{value}</p></div></div>)}</div>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" aria-label="Balance overview">
        <Card className={cn('relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card', cardShadow)}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-10 -left-6 size-48 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute -right-6 -bottom-6 size-36 rounded-full bg-accent/6 blur-2xl" />
            <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          <CardHeader className="relative z-10 flex flex-row items-center justify-between px-4 pt-5 pb-3 sm:px-6 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground/85">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10"><WalletIcon /></span>
              <span className="hidden sm:inline">My Balance</span>
              <span className="sm:hidden">Balance</span>
              <InfoMark />
            </CardTitle>
            <AccountSelect />
          </CardHeader>

          <CardContent className="relative z-10 px-4 pt-2 pb-5 sm:px-6 sm:pb-6">
            <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="text-3xl leading-none font-bold tracking-tight text-foreground sm:text-[2.5rem]">
                $875,985<span className="text-xl font-semibold text-foreground/40 sm:text-2xl">.00</span>
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success shadow-[0_0_8px_color-mix(in_oklch,var(--color-success)_20%,transparent)]">
                <TrendingUp className="size-2.5" />+55.58%
              </span>
            </div>
            <div className="mb-7 flex flex-wrap gap-3">
              <Button className="h-10 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-[0_4px_14px_-2px_color-mix(in_oklch,var(--color-primary)_40%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_6px_20px_-2px_color-mix(in_oklch,var(--color-primary)_50%,transparent)] sm:px-6" size="sm">
                <ArrowUpRight className="mr-1.5 size-3.5" /> Transfer
              </Button>
              <Button className="h-10 rounded-xl border border-border/50 bg-secondary px-5 text-xs font-semibold text-foreground/80 shadow-[var(--shadow-xs)] transition-all duration-150 hover:border-border hover:bg-secondary/80 sm:px-6" variant="outline" size="sm">
                Request <ArrowDownRight className="ml-1.5 size-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-border/25 pt-5 sm:grid-cols-4">
              {subBalances.map((item, index) => (
                <div key={item.label} className={cn('flex flex-col gap-1.5', index > 0 && 'sm:border-l sm:border-border/20 sm:pl-4')}>
                  <span className="text-sm leading-tight font-bold text-foreground/85">{item.val}<span className="text-xs text-foreground/40">{item.dec}</span></span>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {metrics.map(({ label, value, icon: Icon, trend }) => (
            <Card key={label} className={cn('relative flex min-w-0 flex-col justify-center overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_oklch(0_0_0/0.08)]', cardShadow)}>
              <div className="absolute top-0 right-0 left-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-primary/6 shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] sm:size-11"><Icon className="size-4 text-primary/70 sm:size-5" /></span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center justify-between gap-2"><span className="truncate text-[10px] font-semibold tracking-widest text-muted-foreground">{label}</span><span className="shrink-0 rounded-full border border-success/20 bg-success/8 px-1.5 py-0.5 text-[10px] font-semibold text-success">{trend}</span></span>
                  <span className="text-base leading-tight font-bold text-foreground sm:text-lg">{value.split('.')[0]}<span className="text-sm text-foreground/40">.{value.split('.')[1]}</span></span>
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" aria-label="Payment analytics">
        <Card className={cn('flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card', cardShadow)}>
          <CardHeader className="flex flex-row items-center justify-between px-4 pt-5 pb-3 sm:px-6 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground/90">Payment Activity <InfoMark /></CardTitle>
            <YearPicker />
          </CardHeader>
          <CardContent className="relative flex min-h-[280px] flex-1 flex-col p-0"><PaymentActivityChart /></CardContent>
        </Card>

        <PaymentTypeChart />
      </section>

      <Card className={cn('overflow-hidden rounded-2xl border border-border/50 bg-card', cardShadow)}>
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/25 px-4 py-5 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground/90">Payment History <InfoMark /></CardTitle>
          <YearPicker />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto [scrollbar-width:thin]">
            <table className="min-w-[640px] w-full text-xs">
              <thead>
                <tr className="border-b border-border/25 bg-secondary/30">
                  {['Members', 'Invoice', 'Details', 'Date', 'Amount', 'Status', ''].map((heading, index) => (
                    <th key={`${heading}-${index}`} className={cn('px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-muted-foreground uppercase', index === 6 && 'text-right')}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((transaction, index) => (
                  <tr key={`${transaction.date}-${transaction.invoice}`} className={cn('transition-colors duration-100 [&_td]:px-6 [&_td]:py-4 hover:bg-primary/3', index !== paymentHistory.length - 1 && 'border-b border-border/20')}>
                    <td><div className="flex items-center gap-3"><img src={transaction.img} alt={transaction.name} className="size-9 rounded-full border border-border/50 object-cover shadow-[var(--shadow-xs)]" /><span className="flex flex-col"><span className="text-[13px] leading-tight font-semibold text-foreground/90">{transaction.name}</span><span className="mt-0.5 text-[11px] text-muted-foreground">{transaction.subtitle}</span></span></div></td>
                    <td className="font-medium text-muted-foreground">{transaction.invoice}</td>
                    <td className="text-muted-foreground">{transaction.detail}</td>
                    <td className="text-muted-foreground">{transaction.date}</td>
                    <td className="font-bold text-foreground/85">{transaction.amount}</td>
                    <td><Badge variant="outline" className={cn('rounded-full border px-3 py-0.5 text-[10px] font-semibold', transaction.status === 'Paid' ? 'border-success/35 bg-success/6 text-success shadow-[0_0_8px_color-mix(in_oklch,var(--color-success)_15%,transparent)]' : 'border-warning/35 bg-warning/6 text-warning shadow-[0_0_8px_color-mix(in_oklch,var(--color-warning)_15%,transparent)]')}>{transaction.status}</Badge></td>
                    <td><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="icon" className="size-8 rounded-lg border border-border/40 text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"><MoreVertical className="size-3.5" /></Button><Button variant="ghost" size="icon" className="size-8 rounded-lg border border-border/40 text-muted-foreground transition-all duration-150 hover:bg-destructive/8 hover:text-destructive"><Trash2 className="size-3.5" /></Button></div></td>
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
