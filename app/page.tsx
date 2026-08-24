import {
  ArrowUpRight,
  CircleDollarSign,
  MoreVertical,
  Trash2,
  PieChart,
  ShoppingBag,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransactionChart } from '@/components/dashboard/transaction-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';
import { BalanceCard } from '@/components/dashboard/balance-card';
import { PeriodSelect } from '@/components/dashboard/period-select';
import { AccountSelect } from '@/components/dashboard/account-select';
import { cn } from '@/lib/utils';

const metrics = [
  { title: 'Total Revenue', amount: 47255, change: 14.2, icon: <CircleDollarSign className="h-4 w-4" /> },
  { title: 'AVG. ORDER VALUE', amount: 98747, change: 9.8, icon: <PieChart className="h-4 w-4" /> },
  { title: 'New Order', amount: 47255, change: 5.3, icon: <ShoppingBag className="h-4 w-4" /> },
];

const transactions = [
  { 
    name: 'Chat Gpt', 
    id: 'ID: A3652', 
    date: '20 July 2025', 
    amount: '$585,658.00', 
    status: 'Successful',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
  },
  { 
    name: 'Gitlab', 
    id: 'ID: B5784', 
    date: '21 July 2025', 
    amount: '$965,854.00', 
    status: 'Pending',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg'
  },
  { 
    name: 'Nextjs', 
    id: 'ID: C8542', 
    date: '25 July 2025', 
    amount: '$985,414.00', 
    status: 'Successful',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg'
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-3 pb-6 sm:px-5 md:px-6 lg:px-8">

      {/* Top Cards Row */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" aria-label="Account overview">
        
        {/* My Balance */}
        <Card className="card-base card-elevated flex min-w-0 flex-col justify-between xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-foreground/10 flex items-center justify-center shrink-0">
                <WalletIcon />
              </div>
              My Balance 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <AccountSelect />
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3">
            <div className="flex items-baseline gap-3 mb-5">
              <div className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">$525,255<span className="text-foreground/50 text-xl lg:text-2xl font-semibold">.00</span></div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-semibold border border-success/20">+55.58%</span>
            </div>
            <div className="flex gap-3 mt-auto">
              <Button className="btn-primary-glow flex-1 h-10 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90" size="sm">
                <ArrowUpRight className="w-4 h-4 mr-1.5" /> Transfer
              </Button>
              <Button className="flex-1 h-10 text-xs font-semibold border-border/40 hover:bg-foreground/5 rounded-xl" variant="outline" size="sm">
                Request <ArrowDownRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Small Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          {metrics.map((metric) => (
            <BalanceCard key={metric.title} {...metric} />
          ))}
        </div>
      </section>

      {/* Middle Charts Row */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]" aria-label="Dashboard analytics">
        <PaymentTypeChart />
        <TransactionChart />
      </section>

      {/* Transaction History Table */}
      <Card className="card-base card-elevated min-w-0">
        <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-border/20">
          <CardTitle className="text-sm font-medium text-foreground/90 flex items-center gap-1.5">
            Transaction History <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
          </CardTitle>
          <PeriodSelect defaultValue="month" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="table-container">
            <table className="table-base">
              <thead>
                <tr className="border-b border-border/20">
                  <th className="table-th">Transaction</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">AApprox</th>
                  <th className="table-th">Status</th>
                  <th className="table-th text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={cn("table-row-hover", index !== transactions.length - 1 && "border-b border-border/20")}>
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={transaction.logo} alt={transaction.name} className="w-5 h-5 object-contain" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground/90 text-[13px]">{transaction.name}</span>
                          <span className="text-foreground/40 text-[11px] mt-0.5">{transaction.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="table-td text-foreground/60 text-[13px]">{transaction.date}</td>
                    <td className="table-td font-semibold text-foreground/80 text-[13px]">{transaction.amount}</td>
                    <td className="table-td">
                      <Badge variant="outline" className={cn(
                        "rounded-full px-3 py-0.5 font-medium border",
                        transaction.status === 'Successful'
                          ? 'badge-success-glow border-success/40 bg-transparent text-success'
                          : 'badge-warning-glow border-warning/40 bg-transparent text-warning'
                      )}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg border border-border/30 text-foreground/50 hover:text-foreground hover:bg-foreground/10" aria-label={`More actions for ${transaction.name}`}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg border border-border/30 text-foreground/50 hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-colors" aria-label={`Delete ${transaction.name}`}>
                          <Trash2 className="w-4 h-4" />
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

function WalletIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  );
}
