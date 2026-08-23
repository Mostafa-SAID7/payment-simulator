import {
  ArrowUpRight,
  ChevronDown,
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
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'Total Revenue', value: '$47,255.00', icon: CircleDollarSign },
  { label: 'AVG. ORDER VALUE', value: '$98,747.00', icon: PieChart },
  { label: 'New Order', value: '$47,255.00', icon: ShoppingBag },
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
    <div className="flex flex-col gap-5 pb-6 mt-20 md:mt-24 px-4 md:px-8 max-w-[1600px] mx-auto w-full">

      {/* Top Cards Row */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-4" aria-label="Account overview">
        
        {/* My Balance */}
        <Card className="rounded-[1.25rem] bg-card shadow-none overflow-hidden flex flex-col justify-between border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-foreground/10 flex items-center justify-center shrink-0">
                <WalletIcon />
              </div>
              My Balance 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <button type="button" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/40 bg-foreground/5 text-xs text-foreground/80 hover:bg-foreground/10 transition-colors">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90 z-10"></div>
                <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90"></div>
              </div>
              <span className="font-medium">xx25</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3">
            <div className="flex items-baseline gap-3 mb-5">
              <div className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">$525,255<span className="text-foreground/50 text-xl lg:text-2xl font-semibold">.00</span></div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-semibold border border-success/20">+55.58%</span>
            </div>
            <div className="flex gap-3 mt-auto">
              <Button className="flex-1 h-10 text-xs font-semibold bg-primary hover:bg-primary/90 rounded-xl" size="sm">
                <ArrowUpRight className="w-4 h-4 mr-1.5" /> Transfer
              </Button>
              <Button className="flex-1 h-10 text-xs font-semibold border-border/40 hover:bg-foreground/5 rounded-xl" variant="outline" size="sm">
                Request <ArrowDownRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Small Metric Cards */}
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="rounded-[1.25rem] bg-card/80 backdrop-blur-sm shadow-none overflow-hidden flex flex-col justify-center border-0">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-border/50 bg-foreground/5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-foreground/70" />
                </div>
                <p className="text-[11px] font-medium text-foreground/50 uppercase tracking-wide">{label}</p>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">
                {value.split('.')[0]}<span className="text-foreground/40 text-lg font-semibold">.{value.split('.')[1]}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Middle Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-4" aria-label="Dashboard analytics">
        <PaymentTypeChart />
        <TransactionChart />
      </section>

      {/* Transaction History Table */}
      <Card className="rounded-[1.25rem] bg-card shadow-none overflow-hidden border-0">
        <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-border/20">
          <CardTitle className="text-sm font-medium text-foreground/90 flex items-center gap-1.5">
            Transaction History <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
          </CardTitle>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-foreground/5 text-xs text-foreground/70 hover:bg-foreground/10 transition-colors">
            <CalendarIcon />
            This Month <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-foreground/40 [&_th]:text-xs">
                  <th>Transaction</th><th>Date</th><th>AApprox</th><th>Status</th><th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={cn("hover:bg-foreground/5 transition-colors [&_td]:px-6 [&_td]:py-4", index !== transactions.length - 1 && "border-b border-border/20")}>
                    <td>
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
                    <td className="text-foreground/60 text-[13px]">{transaction.date}</td>
                    <td className="font-semibold text-foreground/80 text-[13px]">{transaction.amount}</td>
                    <td>
                      <Badge variant="outline" className={cn(
                        "rounded-full px-3 py-0.5 font-medium border",
                        transaction.status === 'Successful' 
                          ? 'border-success/40 bg-transparent text-success' 
                          : 'border-warning/40 bg-transparent text-warning'
                      )}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td>
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
