'use client';

import { MoreVertical, Plus, CreditCard, ChevronDown, Trash2, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardsCashflowChart } from '@/components/dashboard/cards-cashflow-chart';
import { cn } from '@/lib/utils';

const savedCards = [
  { variant: 'gold', number: '5421', exp: '7/28', label: 'Gold Mastercard' },
  { variant: 'blue', number: '8547', exp: '7/28', label: 'Blue Mastercard' },
  { variant: 'purple', number: '8757', exp: '8/41', label: 'Purple Mastercard' },
];

const recentActivity = [
  { initials: 'DR', name: 'Darlene Robertson', action: 'Updated Account S...', time: '14:05 AM', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { initials: 'MM', name: 'Marvin McKinney', action: 'Recent Transaction', time: '16:10 AM', img: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { initials: 'DS', name: 'Darrell Steward', action: 'Transferred Funds to', time: '18:14 AM', img: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
  { initials: 'DL', name: 'Devon Lane', action: 'added a new savings...', time: '11:20 AM', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
];

const cardTransactions = [
  { quantity: '14', date: '20 July 2025', type: 'Transfer', description: 'Service Fee', amount: '$125,52.00', status: 'Credit' },
  { quantity: '17', date: '24 July 2025', type: 'Card Payment', description: 'UI/UX Project', amount: '$747,85.00', status: 'Debit' },
  { quantity: '20', date: '26 July 2025', type: 'Card Payment', description: 'Freelancer Fee', amount: '$625,14.00', status: 'Credit' },
];

function EmvChip() {
  return (
    <div className="w-8 h-6 rounded-md overflow-hidden shadow-sm">
      <div className="w-full h-full bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 border border-yellow-300/60 rounded-md flex flex-col justify-between p-0.5">
        <div className="w-full h-[1px] bg-yellow-600/30"></div>
        <div className="w-full h-[1px] bg-yellow-600/30"></div>
        <div className="w-full flex justify-between h-full py-0.5">
          <div className="w-[1px] h-full bg-yellow-600/30"></div>
          <div className="w-[1px] h-full bg-yellow-600/30"></div>
        </div>
      </div>
    </div>
  );
}

function MastercardLogo() {
  return (
    <div className="flex -space-x-2.5 items-center drop-shadow-sm">
      <div className="w-6 h-6 rounded-full bg-[#EB001B] z-10 opacity-95"></div>
      <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-95"></div>
    </div>
  );
}

function CardPreview({ variant, number, exp, label }: { variant: string; number: string; exp: string; label: string }) {
  const gradients: Record<string, string> = {
    gold: 'from-[#D4A017] via-[#8B5E0A] to-[#1a1520]',
    blue: 'from-[#2563EB] via-[#1e3a8a] to-[#0f172a]',
    purple: 'from-[#9333EA] via-[#4c1d95] to-[#0f0a1e]',
  };

  const glows: Record<string, string> = {
    gold: 'shadow-[0_8px_32px_oklch(0.68_0.17_58/0.35),0_2px_8px_oklch(0_0_0/0.25)]',
    blue: 'shadow-[0_8px_32px_oklch(0.55_0.18_248/0.35),0_2px_8px_oklch(0_0_0/0.25)]',
    purple: 'shadow-[0_8px_32px_oklch(0.50_0.24_278/0.35),0_2px_8px_oklch(0_0_0/0.25)]',
  };

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between w-full h-[180px] rounded-2xl p-5 overflow-hidden',
        `bg-gradient-to-br ${gradients[variant]}`,
        glows[variant],
        'transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]',
        'border border-white/10'
      )}
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="relative flex justify-between items-start w-full">
        <EmvChip />
        <MastercardLogo />
      </div>
      <div className="relative flex flex-col gap-1.5 mt-auto">
        <p className="text-white/90 font-mono text-base tracking-[0.2em] font-medium drop-shadow-sm">
          <span className="text-white/45">**** **** ****</span> {number}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-white/45 text-[10px] font-medium tracking-widest uppercase">Exp {exp}</p>
          <p className="text-white/45 text-[10px] font-medium tracking-wide">{label}</p>
        </div>
      </div>
    </div>
  );
}

const cardShadow = 'shadow-[0_1px_4px_oklch(0_0_0/0.05),0_1px_2px_oklch(0_0_0/0.04),inset_0_1px_0_color-mix(in_oklch,white_60%,transparent)] dark:shadow-[0_2px_8px_oklch(0_0_0/0.22),inset_0_1px_0_color-mix(in_oklch,white_3%,transparent)]';

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(3,minmax(0,280px))_auto] gap-5 items-start" aria-label="Saved cards">
        {savedCards.map((card) => (
          <div key={card.number} className="w-full">
            <CardPreview {...card} />
          </div>
        ))}

        <button
          type="button"
          className={cn(
            'flex flex-col items-center justify-center w-full h-[180px] rounded-2xl',
            'bg-card border border-dashed border-border/60',
            'text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/3',
            'transition-all duration-200 gap-2.5 text-xs font-medium',
            'shadow-[var(--shadow-xs)]'
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center shadow-[var(--shadow-xs)]">
            <Plus className="w-5 h-5" />
          </div>
          Add Card
        </button>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-5" aria-label="Card insights">
        <Card className={cn('rounded-2xl bg-card border border-border/50 overflow-hidden flex flex-col', cardShadow)}>
          <CardHeader className="flex flex-row items-center justify-between pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
              Cashflow
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help">i</span>
            </CardTitle>
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-secondary/80 text-[11px] text-foreground/60 hover:bg-secondary hover:border-border transition-all duration-150 shadow-[var(--shadow-xs)]">
              <CreditCard className="w-3.5 h-3.5 opacity-70" />
              <span className="hidden sm:inline">Last Month</span>
              <ChevronDown className="w-3 h-3 opacity-50 ml-0.5" />
            </button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col relative min-h-[300px]">
            <CardsCashflowChart />
          </CardContent>
        </Card>

        <Card className={cn('rounded-2xl bg-card border border-border/50 overflow-hidden', cardShadow)}>
          <CardHeader className="flex flex-row items-center justify-between pb-4 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
              Recent Activity
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help">i</span>
            </CardTitle>
            <button type="button" aria-label="More recent activity options" className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Today</span>
            {recentActivity.slice(0, 3).map((activity) => (
              <div key={activity.name} className="flex items-center gap-3 py-3 border-b border-border/15 last:border-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activity.img} alt={activity.name} className="w-9 h-9 rounded-full border border-border/50 object-cover shadow-[var(--shadow-xs)] shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground truncate leading-tight">
                    <strong className="font-semibold text-foreground/85">{activity.name}</strong> {activity.action}
                  </p>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock3 className="w-3 h-3 opacity-60 shrink-0" /> {activity.time}
                  </span>
                </div>
              </div>
            ))}

            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-3 mb-2">Yesterday</span>
            <div className="flex items-center gap-3 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={recentActivity[3].img} alt={recentActivity[3].name} className="w-9 h-9 rounded-full border border-border/50 object-cover shadow-[var(--shadow-xs)] shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground truncate leading-tight">
                  <strong className="font-semibold text-foreground/85">{recentActivity[3].name}</strong> {recentActivity[3].action}
                </p>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock3 className="w-3 h-3 opacity-60 shrink-0" /> {recentActivity[3].time}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className={cn('rounded-2xl bg-card border border-border/50 overflow-hidden', cardShadow)}>
        <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-border/25">
          <CardTitle className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            All Transactions
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help">i</span>
          </CardTitle>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-secondary/80 text-[11px] text-foreground/60 hover:bg-secondary hover:border-border transition-all duration-150 shadow-[var(--shadow-xs)]">
            <CreditCard className="w-3.5 h-3.5 opacity-70" />
            <span className="hidden sm:inline">This Year</span>
            <ChevronDown className="w-3 h-3 opacity-50 ml-0.5" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="table-container">
            <table className="w-full min-w-[640px] text-xs">
              <thead>
                <tr className="border-b border-border/25 bg-secondary/30">
                  <th className="px-6 py-4 text-center w-12">
                    <div className="w-4 h-4 rounded border border-border/50 mx-auto"></div>
                  </th>
                  {['Qty.', 'Date', 'Type', 'Description', 'Amount', 'Status', ''].map((heading, index) => (
                    <th
                      key={heading || 'actions'}
                      className={cn(
                        'px-6 py-4 text-left font-semibold text-muted-foreground text-[10px] uppercase tracking-widest',
                        index === 6 && 'text-right'
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cardTransactions.map((transaction, index) => (
                  <tr
                    key={`${transaction.date}-${transaction.quantity}`}
                    className={cn(
                      'table-row-hover [&_td]:px-6 [&_td]:py-4',
                      index !== cardTransactions.length - 1 && 'border-b border-border/20'
                    )}
                  >
                    <td className="w-12 text-center">
                      <div className="w-4 h-4 rounded border border-border/50 mx-auto hover:border-primary/50 transition-colors cursor-pointer"></div>
                    </td>
                    <td className="font-semibold text-muted-foreground">{transaction.quantity}</td>
                    <td className="text-muted-foreground">{transaction.date}</td>
                    <td className="text-muted-foreground">{transaction.type}</td>
                    <td className="text-muted-foreground">{transaction.description}</td>
                    <td className="font-bold text-foreground/85">{transaction.amount}</td>
                    <td>
                      <Badge
                        variant="outline"
                        className={cn(
                          'rounded-full px-3 py-0.5 text-[10px] font-semibold border',
                          transaction.status === 'Credit'
                            ? 'border-success/35 bg-success/6 text-success shadow-[0_0_8px_color-mix(in_oklch,var(--color-success)_15%,transparent)]'
                            : 'border-destructive/35 bg-destructive/6 text-destructive shadow-[0_0_8px_color-mix(in_oklch,var(--color-destructive)_15%,transparent)]'
                        )}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" aria-label={`More actions for ${transaction.description}`} className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/40 transition-all duration-150">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${transaction.description}`} className="w-8 h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/8 border border-border/40 transition-all duration-150">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
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
