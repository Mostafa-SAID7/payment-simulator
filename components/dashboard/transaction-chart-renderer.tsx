'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Calendar } from 'lucide-react';
import { ChartTooltip } from './chart-tooltip';

const data = [
  { date: 'Jan', transparentBase: 2, income: 6, expenses: 2 },
  { date: 'Feb', transparentBase: 0, income: 4, expenses: 0 },
  { date: 'Mar', transparentBase: 6, income: 3, expenses: 0 },
  { date: 'Apr', transparentBase: 1.5, income: 3.5, expenses: 0 },
  { date: 'May', transparentBase: 0, income: 1.5, expenses: 0 },
  { date: 'Jun', transparentBase: 7, income: 2.5, expenses: 0 },
  { date: 'Jul', transparentBase: 2, income: 6, expenses: 2 },
  { date: 'Aug', transparentBase: 1, income: 4, expenses: 1 },
  { date: 'Sep', transparentBase: 5, income: 3.5, expenses: 3 },
  { date: 'Oct', transparentBase: 1, income: 3.5, expenses: 3 },
  { date: 'Nov', transparentBase: 2.5, income: 5, expenses: 2 },
  { date: 'Dec', transparentBase: 0, income: 4, expenses: 2 },
];

export function TransactionChartRenderer() {
  return (
    <Card className="card-base card-elevated h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-transparent p-5">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium text-foreground/90">
          Report <span className="ml-1 inline-flex size-3.5 items-center justify-center rounded-full border border-border/50 text-[8px] text-muted-foreground">i</span>
        </CardTitle>
        <button type="button" className="filter-btn">
          <Calendar className="size-3.5" />
          This Year <ChevronDown className="ml-1 size-3.5 opacity-50" />
        </button>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] p-0 pt-4 pr-6 pb-6 pl-2">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={0} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" opacity={0.4} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-foreground)', opacity: 0.5, fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-foreground)', opacity: 0.5, fontSize: 11 }} tickFormatter={(value) => `$${value}K`} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--color-foreground)', opacity: 0.05 }} />
            <Bar dataKey="transparentBase" stackId="a" fill="transparent" barSize={24} />
            <Bar dataKey="income" stackId="a" fill="var(--color-chart-1)" radius={[4, 4, 4, 4]} barSize={24} />
            <Bar dataKey="expenses" fill="var(--color-chart-4)" radius={[4, 4, 4, 4]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
