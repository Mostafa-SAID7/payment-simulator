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

const cashflowData = [
  { month: 'Jan', amount: 210 },
  { month: 'Feb', amount: 250 },
  { month: 'Mar', amount: 225 },
  { month: 'Apr', amount: 480 },
  { month: 'May', amount: 300 },
  { month: 'Jun', amount: 100 },
  { month: 'Jul', amount: 420 },
  { month: 'Aug', amount: 370 },
  { month: 'Sep', amount: 430 },
  { month: 'Oct', amount: 390 },
];

export function CardsCashflowChartRenderer() {
  return (
    <Card className="min-w-0 overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xs font-semibold text-foreground/80">
          Cashflow <span className="inline-flex size-4 items-center justify-center rounded-full border border-border/50 text-[10px] text-muted-foreground" title="More information">ⓘ</span>
        </CardTitle>
        <button type="button" className="flex items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary/50">
          Last Month⌄
        </button>
      </CardHeader>
      <CardContent className="h-[220px] min-w-0 p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cashflowData} margin={{ top: 12, right: 5, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="cardsCashflowFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="2 4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 8 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 8 }} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="amount" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#cardsCashflowFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
