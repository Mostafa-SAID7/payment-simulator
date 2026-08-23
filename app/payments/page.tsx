import { ArrowDownRight, ArrowUpRight, ChevronDown, CircleDollarSign, Clock3, CreditCard, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentActivityChart } from '@/components/dashboard/payment-activity-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';
import { cn } from '@/lib/utils';

const paymentHistory = [
  { 
    name: 'William Hirsch',
    subtitle: 'USA',
    img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    invoice: 'INV-5784', 
    detail: 'Service Fee', 
    date: '20 July 2025', 
    amount: '$585,658.00', 
    status: 'Paid' 
  },
  { 
    name: 'William Hirsch',
    subtitle: 'USA',
    img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    invoice: 'INV-5784', 
    detail: 'Service Fee', 
    date: '21 July 2025', 
    amount: '$965,854.00', 
    status: 'Pending' 
  },
  { 
    name: 'William Hirsch',
    subtitle: 'USA',
    img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    invoice: 'INV-5784', 
    detail: 'Service Fee', 
    date: '25 July 2025', 
    amount: '$985,414.00', 
    status: 'Paid' 
  },
];

const metrics = [
  { label: 'GROSS VOLUME', value: '$865,741.00', icon: CircleDollarSign },
  { label: 'NET VOLUME', value: '$475,744.00', icon: Clock3 },
  { label: 'PER CUSTOMER', value: '$747,985.00', icon: CreditCard },
];

function WalletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  );
}

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-5 pb-6 mt-20 md:mt-24 px-4 md:px-8 max-w-[1600px] mx-auto w-full">
      {/* Top Row: Balance and Metrics */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4" aria-label="Balance overview">
        
        {/* My Balance Card */}
        <Card className="rounded-[1.25rem] border border-border/30 shadow-none overflow-hidden flex flex-col justify-between relative bg-[#131317]">
          {/* Subtle radial glow */}
          <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80 pointer-events-none"></div>
          
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6 relative z-10">
            <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-foreground/5 border border-border/30 flex items-center justify-center shrink-0">
                <WalletIcon />
              </div>
              My Balance 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-0.5">i</span>
            </CardTitle>
            <button type="button" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/40 bg-[#1A1A1F] text-[11px] text-foreground/80 hover:bg-foreground/5 transition-colors">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#EA001B] opacity-90 z-10 mix-blend-screen"></div>
                <div className="w-3 h-3 rounded-full bg-[#F7A01D] opacity-90 mix-blend-screen"></div>
              </div>
              <span className="font-medium tracking-wider">xx25</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>
          </CardHeader>
          
          <CardContent className="px-6 pb-6 pt-2 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl lg:text-[2.5rem] font-bold tracking-tight text-foreground leading-none">$875,985<span className="text-foreground/50 text-2xl lg:text-[1.75rem] font-semibold">.00</span></div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-semibold border border-success/20">+55.58%</span>
            </div>
            <div className="flex gap-3 mb-8">
              <Button className="h-9 px-6 text-xs font-semibold bg-primary hover:bg-primary/90 rounded-lg text-white" size="sm">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" /> Transfer
              </Button>
              <Button className="h-9 px-6 text-xs font-semibold bg-[#1A1A1F] border border-border/30 hover:bg-foreground/5 rounded-lg text-foreground/80" variant="outline" size="sm">
                Request <ArrowDownRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
            
            {/* Sub balances */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/10">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground/90 text-sm">$525,525<span className="text-foreground/50 text-xs">.00</span></span>
                <span className="text-[10px] text-foreground/40 font-medium tracking-wide">BTC/USD</span>
              </div>
              <div className="flex flex-col gap-1 md:border-l md:border-border/10 md:pl-4">
                <span className="font-semibold text-foreground/90 text-sm">$414,587<span className="text-foreground/50 text-xs">.00</span></span>
                <span className="text-[10px] text-foreground/40 font-medium tracking-wide">EUR/USD</span>
              </div>
              <div className="flex flex-col gap-1 md:border-l md:border-border/10 md:pl-4">
                <span className="font-semibold text-foreground/90 text-sm">$785,58<span className="text-foreground/50 text-xs">.00</span></span>
                <span className="text-[10px] text-foreground/40 font-medium tracking-wide">ETH/USD</span>
              </div>
              <div className="flex flex-col gap-1 md:border-l md:border-border/10 md:pl-4">
                <span className="font-semibold text-foreground/90 text-sm">$875,525<span className="text-foreground/50 text-xs">.00</span></span>
                <span className="text-[10px] text-foreground/40 font-medium tracking-wide">GBP/USD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3 Stacked Cards */}
        <div className="flex flex-col gap-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden flex-1 flex flex-col justify-center">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border border-border/20 bg-foreground/5 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-foreground/70" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold text-foreground/40 tracking-widest">{label}</span>
                  <span className="text-[17px] font-bold text-foreground">
                    {value.split('.')[0]}<span className="text-foreground/50 text-sm">.{value.split('.')[1]}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Middle Row: Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4" aria-label="Payment analytics">
        
        {/* Payment Activity Chart */}
        <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
            <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
              Payment Activity 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-[#1A1A1F] text-[11px] text-foreground/70 hover:bg-foreground/5 transition-colors">
              <CalendarIcon />
              This Year <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
            </button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col relative min-h-[280px]">
            <PaymentActivityChart />
          </CardContent>
        </Card>

        {/* Balance Details Donut */}
        <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-0 px-6 pt-6">
            <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
              Balance Details 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <PaymentTypeChart />
          </CardContent>
        </Card>
      </section>

      {/* Bottom Row: Payment History Table */}
      <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden mt-1">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-border/10">
          <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
            Payment History
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
          </CardTitle>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-[#1A1A1F] text-[11px] text-foreground/70 hover:bg-foreground/5 transition-colors">
            <CalendarIcon />
            This Year <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border/10 [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-foreground/40">
                  <th className="w-48">Members</th>
                  <th>Invoice</th>
                  <th>Payments Details</th>
                  <th>Date</th>
                  <th>AApprox</th>
                  <th className="w-24">Status</th>
                  <th className="text-right w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((transaction, index) => (
                  <tr key={`${transaction.date}-${transaction.invoice}`} className={`hover:bg-foreground/5 transition-colors [&_td]:px-6 [&_td]:py-4 ${index !== paymentHistory.length - 1 ? 'border-b border-border/5' : ''}`}>
                    <td>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={transaction.img} alt={transaction.name} className="w-8 h-8 rounded-full border border-border/50 object-cover" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground/90">{transaction.name}</span>
                          <span className="text-foreground/40 text-[9px] mt-0.5">{transaction.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-foreground/60">{transaction.invoice}</td>
                    <td className="text-foreground/60">{transaction.detail}</td>
                    <td className="text-foreground/60">{transaction.date}</td>
                    <td className="font-semibold text-foreground/80">{transaction.amount}</td>
                    <td>
                      <Badge variant="outline" className={cn(
                        "rounded-full px-3 py-0.5 text-[9px] font-medium border bg-transparent",
                        transaction.status === 'Paid' 
                          ? 'border-success/40 text-success' 
                          : 'border-warning/40 text-warning'
                      )}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-foreground/40 hover:text-foreground hover:bg-foreground/10 border border-border/20">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-foreground/40 hover:text-destructive hover:bg-destructive/10 border border-border/20">
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
