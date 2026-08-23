'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip } from './chart-tooltip';

const activityData = [
  { month: 'Jan', amount: 42000 },
  { month: 'Feb', amount: 36000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 89000 },
  { month: 'May', amount: 61000 },
  { month: 'Jun', amount: 18000 },
  { month: 'Jul', amount: 76000 },
  { month: 'Aug', amount: 71000 },
  { month: 'Sep', amount: 83000 },
  { month: 'Oct', amount: 79000 },
  { month: 'Nov', amount: 86000 },
  { month: 'Dec', amount: 82000 },
];

export function PaymentActivityChart() {
  return (
    <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xs font-semibold text-foreground/80">
          Payment Activity <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border/50 text-muted-foreground text-[10px] cursor-help">ⓘ</span>
        </CardTitle>
        <button type="button" className="flex items-center gap-1 px-2 py-1 rounded-md border border-border/50 text-xs text-muted-foreground hover:bg-secondary/50 transition-colors">This Year⌄</button>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={190}>
          <AreaChart data={activityData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="paymentActivityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="2 4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 8 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 8 }} tickFormatter={(value) => `$${value / 1000}K`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="amount" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#paymentActivityFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
