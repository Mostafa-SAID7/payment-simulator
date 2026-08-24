'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Activity, ArrowUpRight, CalendarDays, CheckCircle2, ChevronRight, Clock3, CreditCard, Download, Eye, FileText, Lock, Plus, RefreshCw, ShieldCheck, TrendingUp, Wallet, X, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardsCashflowChart } from '@/components/dashboard/cards-cashflow-chart';
import { PeriodSelect } from '@/components/dashboard/period-select';
import { cn } from '@/lib/utils';

const savedCards = [
  { variant: 'gold', number: '5421', exp: '7/28', label: 'Gold Mastercard', balance: '$8,420.50', status: 'Primary card' },
  { variant: 'blue', number: '8547', exp: '7/28', label: 'Blue Mastercard', balance: '$2,184.25', status: 'Business card' },
  { variant: 'purple', number: '8757', exp: '8/41', label: 'Purple Mastercard', balance: '$1,875.75', status: 'Travel card' },
];

const recentActivity = [
  { name: 'Darlene Robertson', action: 'Updated account settings', time: '14:05', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { name: 'Marvin McKinney', action: 'Completed a card payment', time: '16:10', img: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { name: 'Darrell Steward', action: 'Transferred funds to card', time: '18:14', img: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
  { name: 'Devon Lane', action: 'Added a new savings card', time: '11:20', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
];

const cardTransactions = [
  { quantity: '14', date: '20 July 2025', type: 'Transfer', description: 'Service Fee', amount: '$1,252.00', status: 'Credit' },
  { quantity: '17', date: '24 July 2025', type: 'Card Payment', description: 'UI/UX Project', amount: '$7,478.00', status: 'Debit' },
  { quantity: '20', date: '26 July 2025', type: 'Card Payment', description: 'Freelancer Fee', amount: '$6,251.00', status: 'Credit' },
  { quantity: '23', date: '29 July 2025', type: 'Transfer', description: 'Workspace funds', amount: '$3,840.00', status: 'Credit' },
];

const cardStats = [
  { label: 'Available balance', value: '$12,480', icon: Wallet, color: 'text-primary', bg: 'bg-primary/15' },
  { label: 'Monthly spend', value: '$4,730', icon: TrendingUp, color: 'text-success', bg: 'bg-success/15' },
  { label: 'Active cards', value: '3', icon: CreditCard, color: 'text-warning', bg: 'bg-warning/15' },
  { label: 'Card transactions', value: '51', icon: Activity, color: 'text-info', bg: 'bg-info/15' },
];

function EmvChip() {
  return <div className="w-8 h-6 rounded-md overflow-hidden shadow-sm"><div className="w-full h-full bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 border border-yellow-300/60 rounded-md flex flex-col justify-between p-0.5"><div className="w-full h-px bg-yellow-600/30" /><div className="w-full h-px bg-yellow-600/30" /><div className="w-full flex justify-between h-full py-0.5"><div className="w-px h-full bg-yellow-600/30" /><div className="w-px h-full bg-yellow-600/30" /></div></div></div>;
}

function MastercardLogo() {
  return <div className="flex -space-x-2.5 items-center drop-shadow-sm"><div className="w-6 h-6 rounded-full bg-[#EB001B] z-10 opacity-95" /><div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-95" /></div>;
}

function CardPreview({ variant, number, exp, label }: { variant: string; number: string; exp: string; label: string }) {
  const gradients: Record<string, string> = { gold: 'from-[#D4A017] via-[#8B5E0A] to-[#1a1520]', blue: 'from-[#2563EB] via-[#1e3a8a] to-[#0f172a]', purple: 'from-[#9333EA] via-[#4c1d95] to-[#0f0a1e]' };
  const glows: Record<string, string> = { gold: 'shadow-[0_8px_32px_oklch(0.68_0.17_58/0.35),0_2px_8px_oklch(0_0_0/0.25)]', blue: 'shadow-[0_8px_32px_oklch(0.55_0.18_248/0.35),0_2px_8px_oklch(0_0_0/0.25)]', purple: 'shadow-[0_8px_32px_oklch(0.50_0.24_278/0.35),0_2px_8px_oklch(0_0_0/0.25)]' };
  return <div className={cn('relative flex flex-col justify-between w-full h-[180px] rounded-2xl p-5 overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]', `bg-gradient-to-br ${gradients[variant]}`, glows[variant])}><div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" /><div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" /><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" /><div className="relative flex justify-between items-start w-full"><EmvChip /><MastercardLogo /></div><div className="relative flex flex-col gap-1.5 mt-auto"><p className="text-white/90 font-mono text-base tracking-[0.2em] font-medium drop-shadow-sm"><span className="text-white/45">**** **** ****</span> {number}</p><div className="flex items-center justify-between"><p className="text-white/45 text-[10px] font-medium tracking-widest uppercase">Exp {exp}</p><p className="text-white/45 text-[10px] font-medium tracking-wide">{label}</p></div></div></div>;
}

const cardShadow = 'shadow-[0_1px_4px_oklch(0_0_0/0.05),0_1px_2px_oklch(0_0_0/0.04),inset_0_1px_0_color-mix(in_oklch,white_60%,transparent)] dark:shadow-[0_2px_8px_oklch(0_0_0/0.22),inset_0_1px_0_color-mix(in_oklch,white_3%,transparent)]';

function SectionHeader({ icon: Icon, title, description, accent = false, action }: { icon: typeof CreditCard; title: string; description: string; accent?: boolean; action?: ReactNode }) {
  return <div className={cn('flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border/50', accent && 'bg-gradient-to-r from-primary/5 to-transparent')}><div className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0', accent ? 'bg-primary/15 text-primary' : 'bg-muted/80 text-muted-foreground')}><Icon className="w-4 h-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground leading-tight">{title}</p><p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-snug">{description}</p></div>{action && <div className="shrink-0">{action}</div>}</div>;
}

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState(savedCards[0].number);
  const [cardNotice, setCardNotice] = useState('');
  const [showAllActivity, setShowAllActivity] = useState(false);

  const activeCard = savedCards.find((card) => card.number === selectedCard) ?? savedCards[0];
  const visibleActivity = showAllActivity ? recentActivity : recentActivity.slice(0, 3);

  function handleCardAction(message: string) {
    setCardNotice(message);
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      {cardNotice && <div className="flex items-center gap-2.5 rounded-xl border border-success/25 bg-success/10 px-4 py-3 text-xs font-medium text-success" role="status"><CheckCircle2 className="w-4 h-4 shrink-0" /><span className="flex-1">{cardNotice}</span><button type="button" aria-label="Dismiss card notification" onClick={() => setCardNotice('')}><X className="w-3.5 h-3.5" /></button></div>}

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-info/6 pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="relative"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-info/20 border border-primary/20 shadow-sm"><CreditCard className="w-7 h-7 text-primary" /></div><span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" /></div><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-xl font-bold text-foreground leading-tight">Card Center</h1><Badge variant="secondary" className="text-[0.6rem] px-2 py-0.5 font-semibold bg-primary/10 text-primary border-primary/20">3 cards active</Badge></div><p className="text-sm text-muted-foreground mt-0.5">Manage cards, cash flow &amp; card activity</p></div></div><div className="flex items-center gap-2 flex-wrap"><Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60" onClick={() => handleCardAction('Card activity export is ready.') }><Download className="w-3.5 h-3.5" /> Export</Button><Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/60" onClick={() => handleCardAction('Card data refreshed just now.') }><RefreshCw className="w-3.5 h-3.5" /> Refresh</Button><Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90" onClick={() => handleCardAction('Your new card request has been queued.') }><Plus className="w-3.5 h-3.5" /> Add Card</Button></div></div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4"><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><Wallet className="w-3 h-3" /> FinPay Corp</span><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><ShieldCheck className="w-3 h-3" /> All cards protected</span><span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground"><CalendarDays className="w-3 h-3" /> Updated today</span></div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{cardStats.map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5"><span className={cn('inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0', bg, color)}><Icon className="w-4 h-4" /></span><div className="min-w-0"><p className="text-[0.65rem] text-muted-foreground font-medium leading-none">{label}</p><p className="text-base font-bold text-foreground mt-0.5 leading-none">{value}</p></div></div>)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}>
            <SectionHeader icon={CreditCard} title="Saved cards" description="Select a card to view its balance and controls" action={<Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => handleCardAction('New card request started.') }><Plus className="w-3.5 h-3.5" /> Add Card</Button>} />
            <CardContent className="p-5"><div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{savedCards.map((card) => <button key={card.number} type="button" onClick={() => setSelectedCard(card.number)} className={cn('rounded-2xl text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50', selectedCard === card.number && 'ring-2 ring-primary/60 ring-offset-2 ring-offset-card')}><CardPreview {...card} /><div className="mt-3 flex items-center justify-between px-1"><div><p className="text-xs font-semibold text-foreground">{card.balance}</p><p className="text-[0.65rem] text-muted-foreground">{card.status}</p></div><ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /></div></button>)}<button type="button" onClick={() => handleCardAction('Your new card request has been queued.')} className="flex h-[180px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-border/60 bg-card text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/3 hover:text-primary"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-secondary/80"><Plus className="w-5 h-5" /></div>Add another card</button></div></CardContent>
          </Card>

          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}>
            <SectionHeader icon={FileText} title="Card transactions" description="Recent activity across all saved cards" action={<PeriodSelect defaultValue="year" />} />
            <CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-xs"><thead><tr className="border-b border-border/40 bg-muted/20 [&_th]:px-5 [&_th]:py-3 [&_th]:text-left [&_th]:text-[10px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-muted-foreground"><th>Qty.</th><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th className="text-right">Action</th></tr></thead><tbody>{cardTransactions.map((transaction, index) => <tr key={`${transaction.date}-${transaction.quantity}`} className={cn('transition-colors hover:bg-foreground/[0.03] [&_td]:px-5 [&_td]:py-3.5', index !== cardTransactions.length - 1 && 'border-b border-border/30')}><td className="font-semibold text-muted-foreground">{transaction.quantity}</td><td><div className="flex flex-col gap-0.5"><span className="font-medium text-foreground">{transaction.date}</span><span className="flex items-center gap-1 text-[9px] text-muted-foreground"><Clock3 className="w-2.5 h-2.5" /> Recent</span></div></td><td className="text-muted-foreground">{transaction.type}</td><td className="text-muted-foreground">{transaction.description}</td><td className="font-bold text-foreground">{transaction.amount}</td><td><Badge variant="outline" className={cn('rounded-full border px-2.5 py-0.5 text-[9px] font-semibold', transaction.status === 'Credit' ? 'border-success/35 bg-success/6 text-success' : 'border-destructive/35 bg-destructive/6 text-destructive')}>{transaction.status}</Badge></td><td><div className="flex justify-end"><Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg border border-border/40 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label={`View ${transaction.description}`} onClick={() => handleCardAction(`${transaction.description} details are ready to view.`)}><Eye className="w-3.5 h-3.5" /></Button></div></td></tr>)}</tbody></table></div></CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}><SectionHeader icon={ShieldCheck} title="Card health" description="Protection and selected card status" accent /><CardContent className="p-5"><div className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/8 p-3.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/15"><ShieldCheck className="w-4 h-4 text-success" /></div><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-foreground">Cards are protected</p><p className="mt-0.5 text-[0.7rem] text-muted-foreground">Fraud monitoring is active</p></div><Badge className="border-success/30 bg-success/10 text-[0.6rem] text-success">Healthy</Badge></div><div className="mt-4 flex flex-col gap-3">{[{ label: 'Selected card', value: activeCard.label }, { label: 'Available balance', value: activeCard.balance }, { label: 'Monthly limit', value: '$15,000' }, { label: 'Renewal date', value: `Aug ${activeCard.exp}` }].map((row) => <div key={row.label} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0"><span className="text-xs text-muted-foreground">{row.label}</span><span className="max-w-[58%] truncate text-right text-xs font-semibold text-foreground">{row.value}</span></div>)}</div><Button variant="outline" size="sm" className="mt-4 h-8 w-full gap-1.5 text-xs" onClick={() => handleCardAction('Card security settings opened.')}>Manage security<ChevronRight className="w-3 h-3" /></Button></CardContent></Card>

          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}><SectionHeader icon={Activity} title="Cashflow" description="Card movement over time" action={<PeriodSelect defaultValue="last-month" />} /><CardContent className="min-h-[250px] p-0"><CardsCashflowChart /></CardContent></Card>

          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}><SectionHeader icon={Zap} title="Recent activity" description="Latest card events" /><CardContent className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground/60">Today</span><button type="button" className="text-[0.65rem] font-medium text-primary hover:text-primary/80" onClick={() => setShowAllActivity((visible) => !visible)}>{showAllActivity ? 'Show less' : 'View all'}</button></div><div className="flex flex-col gap-1">{visibleActivity.map((activity) => <div key={activity.name} className="flex items-center gap-3 border-b border-border/30 py-3 last:border-0"><img src={activity.img} alt="" className="h-8 w-8 shrink-0 rounded-full border border-border/50 object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-[0.7rem] text-foreground"><strong className="font-semibold">{activity.name}</strong> {activity.action}</p><span className="mt-0.5 flex items-center gap-1 text-[0.65rem] text-muted-foreground"><Clock3 className="h-3 w-3 opacity-60" />{activity.time}</span></div></div>)}</div></CardContent></Card>

          <Card className={cn('overflow-hidden rounded-2xl border border-border/60 bg-card', cardShadow)}><SectionHeader icon={Lock} title="Quick controls" description="Common card actions" /><CardContent className="grid grid-cols-2 gap-2 p-5"><Button variant="outline" size="sm" className="h-8 gap-1.5 text-[0.65rem]" onClick={() => handleCardAction('Card temporarily locked.') }><Lock className="w-3 h-3" />Lock card</Button><Button variant="outline" size="sm" className="h-8 gap-1.5 text-[0.65rem]" onClick={() => handleCardAction('Card number copied securely.') }><CreditCard className="w-3 h-3" />Card details</Button><Button variant="outline" size="sm" className="h-8 gap-1.5 text-[0.65rem]" onClick={() => handleCardAction('Payment limits opened.') }><Wallet className="w-3 h-3" />Limits</Button><Button variant="outline" size="sm" className="h-8 gap-1.5 text-[0.65rem]" onClick={() => handleCardAction('Support request started.') }><ChevronRight className="w-3 h-3" />Support</Button></CardContent></Card>
        </div>
      </div>
    </div>
  );
}
