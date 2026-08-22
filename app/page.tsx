'use client';

import { ArrowUpRight, ChevronDown, CircleDollarSign, Download, MoreHorizontal, Plus, Send, Settings2, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransactionChart } from '@/components/dashboard/transaction-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';
import { BatchSuccessChart } from '@/components/dashboard/batch-success-chart';

const transactions = [
  ['Chat Gpt', 'ID: 43652', '20 July 2025', '$585,658.00', 'Successful'],
  ['Gitlab', 'ID: 85784', '21 July 2025', '$965,854.00', 'Pending'],
  ['Nextjs', 'ID: 8542', '25 July 2025', '$985,414.00', 'Successful'],
];

export default function Dashboard() {
  return (
    <div className="dashboard-grid flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div><p className="text-xs text-muted-foreground">Overview</p><h1 className="text-lg font-semibold tracking-tight">Dashboard</h1></div>
        <Button size="sm" className="rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Plus data-icon="inline-start" /> New payment</Button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Revenue', '$47,255.00', CircleDollarSign],
          ['AVG. ORDER VALUE', '$98,747.00', WalletCards],
          ['New Order', '$47,255.00', Send],
          ['Refunds', '$2,425.00', Download],
        ].map(([label, value, Icon]) => (
          <Card key={String(label)} className="dashboard-card">
            <CardContent className="flex items-center justify-between p-4"><div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{String(label)}</p><p className="mt-1 text-lg font-semibold">{String(value)}</p></div><Icon className="size-4 text-muted-foreground" /></CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <TransactionChart />
        <PaymentTypeChart />
      </section>

      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 px-4 py-3"><CardTitle className="text-sm">Transaction History</CardTitle><Button variant="outline" size="sm" className="h-7 rounded-md text-[10px]">This Month <ChevronDown data-icon="inline-end" /></Button></CardHeader>
        <CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="text-[10px] uppercase tracking-wider text-muted-foreground"><tr>{['Transaction','Date','Amount','Status','Action'].map((x) => <th key={x} className="px-4 py-3 font-medium">{x}</th>)}</tr></thead><tbody>{transactions.map(([name, id, date, amount, status]) => <tr key={id} className="border-t border-border/50"><td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex size-7 items-center justify-center rounded-full bg-secondary"><CircleDollarSign className="size-3" /></div><div><p className="font-medium">{name}</p><p className="text-[9px] text-muted-foreground">{id}</p></div></div></td><td className="px-4 py-3 text-muted-foreground">{date}</td><td className="px-4 py-3 text-muted-foreground">{amount}</td><td className="px-4 py-3"><Badge variant={status === 'Successful' ? 'default' : 'secondary'} className="rounded-full text-[9px]">{status}</Badge></td><td className="px-4 py-3"><Button size="icon" variant="ghost" className="size-7"><MoreHorizontal /></Button></td></tr>)}</tbody></table></div></CardContent>
      </Card>
      <BatchSuccessChart />
    </div>
  );
}
