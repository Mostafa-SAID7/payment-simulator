import { MoreVertical, Plus, CreditCard, ChevronDown, Trash2, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardsCashflowChart } from '@/components/dashboard/cards-cashflow-chart';

const savedCards = [
  { variant: 'gold', number: '5421', exp: '7/28' },
  { variant: 'blue', number: '8547', exp: '7/28' },
  { variant: 'purple', number: '8757', exp: '8/41' },
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
    <div className="w-8 h-6 rounded flex items-center justify-center opacity-80" style={{ background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)' }}>
      <div className="w-full h-full border border-black/20 rounded flex flex-col justify-between p-0.5">
        <div className="w-full h-[1px] bg-black/20"></div>
        <div className="w-full h-[1px] bg-black/20"></div>
        <div className="w-full flex justify-between h-full py-0.5">
          <div className="w-[1px] h-full bg-black/20"></div>
          <div className="w-[1px] h-full bg-black/20"></div>
        </div>
      </div>
    </div>
  );
}

function MastercardLogo() {
  return (
    <div className="flex -space-x-3 items-center">
      <div className="w-6 h-6 rounded-full bg-[#EA001B] opacity-90 z-10 mix-blend-screen"></div>
      <div className="w-6 h-6 rounded-full bg-[#F7A01D] opacity-90 mix-blend-screen"></div>
    </div>
  );
}

function CardPreview({ variant, number, exp }: { variant: string; number: string; exp: string }) {
  const gradients: Record<string, string> = {
    gold: 'from-[#EAB308] via-[#713f12] to-[#131317]',
    blue: 'from-[#3B82F6] via-[#1e3a8a] to-[#131317]',
    purple: 'from-[#A855F7] via-[#4c1d95] to-[#131317]',
  };

  return (
    <div className={`relative flex flex-col justify-between w-[280px] h-[170px] rounded-2xl p-5 overflow-hidden bg-gradient-to-br ${gradients[variant]}`}>
      <div className="flex justify-between items-start w-full">
        <EmvChip />
        <MastercardLogo />
      </div>
      <div className="flex flex-col gap-1 mt-auto">
        <p className="text-white font-mono text-lg tracking-widest font-medium opacity-90">
          <span className="text-white/60">**** **** ****</span> {number}
        </p>
        <p className="text-white/50 text-[10px] font-medium tracking-wide">Exp {exp}</p>
      </div>
    </div>
  );
}

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-5 pb-6 mt-20 md:mt-24 px-4 md:px-8 max-w-[1600px] mx-auto w-full">
      <section className="flex flex-wrap gap-4" aria-label="Saved cards">
        {savedCards.map((card) => <CardPreview key={card.number} {...card} />)}
        
        <button type="button" className="flex flex-col items-center justify-center w-[120px] h-[170px] rounded-2xl bg-[#131317] border border-border/30 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors gap-2 text-xs font-medium shrink-0">
          <div className="w-6 h-6 rounded-md bg-secondary/50 border border-border/50 flex items-center justify-center mb-1">
            <Plus className="w-4 h-4" />
          </div>
          Add Card
        </button>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4" aria-label="Card insights">
        <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
            <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
              Cashflow 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-[#1A1A1F] text-[11px] text-foreground/70 hover:bg-foreground/5 transition-colors">
              <CreditCard className="w-3.5 h-3.5 opacity-70" />
              Last Month <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
            </button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col relative h-[300px]">
            <CardsCashflowChart />
          </CardContent>
        </Card>

        <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4 px-6 pt-6">
            <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
              Recent Activity 
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
            </CardTitle>
            <button type="button" className="w-6 h-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 flex flex-col gap-1">
            <span className="text-[10px] font-medium text-muted-foreground mb-2">Today</span>
            {recentActivity.slice(0, 3).map((activity) => (
              <div key={activity.name} className="flex items-center gap-3 py-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activity.img} alt={activity.name} className="w-8 h-8 rounded-full border border-border/50 object-cover" />
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-[11px] text-foreground/70 truncate">
                    <strong className="font-semibold text-foreground/90">{activity.name}</strong> {activity.action}
                  </p>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock3 className="w-3 h-3 opacity-70" /> {activity.time}
                  </span>
                </div>
              </div>
            ))}
            
            <span className="text-[10px] font-medium text-muted-foreground mt-3 mb-2">Yesterday</span>
            <div className="flex items-center gap-3 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={recentActivity[3].img} alt={recentActivity[3].name} className="w-8 h-8 rounded-full border border-border/50 object-cover" />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-[11px] text-foreground/70 truncate">
                  <strong className="font-semibold text-foreground/90">{recentActivity[3].name}</strong> {recentActivity[3].action}
                </p>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock3 className="w-3 h-3 opacity-70" /> {recentActivity[3].time}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[1.25rem] bg-[#131317] border border-border/30 shadow-none overflow-hidden mt-1">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-border/10">
          <CardTitle className="text-[13px] font-medium text-foreground/90 flex items-center gap-1.5">
            All Transactions
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
          </CardTitle>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-[#1A1A1F] text-[11px] text-foreground/70 hover:bg-foreground/5 transition-colors">
            <CreditCard className="w-3.5 h-3.5 opacity-70" />
            This Year <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border/10 [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-foreground/40">
                  <th className="w-10 text-center"><div className="w-4 h-4 rounded border border-border/50 mx-auto"></div></th>
                  <th>Qty.</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th className="w-24">Status</th>
                  <th className="text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {cardTransactions.map((transaction, index) => (
                  <tr key={`${transaction.date}-${transaction.quantity}`} className={`hover:bg-foreground/5 transition-colors [&_td]:px-6 [&_td]:py-4 ${index !== cardTransactions.length - 1 ? 'border-b border-border/10' : ''}`}>
                    <td className="w-10 text-center"><div className="w-4 h-4 rounded border border-border/50 mx-auto"></div></td>
                    <td className="font-medium text-foreground/70">{transaction.quantity}</td>
                    <td className="text-foreground/70">{transaction.date}</td>
                    <td className="text-foreground/70">{transaction.type}</td>
                    <td className="text-foreground/70">{transaction.description}</td>
                    <td className="font-medium text-foreground/80">{transaction.amount}</td>
                    <td>
                      <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[10px] font-medium border bg-transparent ${transaction.status === 'Credit' ? 'border-success/40 text-success' : 'border-destructive/40 text-destructive'}`}>
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
