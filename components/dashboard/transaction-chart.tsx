'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Calendar } from 'lucide-react';
import { ChartTooltip } from './chart-tooltip';

// Modified data to create a "floating" effect using stacked bars with transparent bases
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

export function TransactionChart() {
  return (
    <Card className="rounded-[1.25rem] bg-card shadow-none overflow-hidden h-full border-0">
      <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-transparent">
        <CardTitle className="text-sm font-medium text-foreground/90 flex items-center gap-1.5">
          Report <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
        </CardTitle>
        <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-foreground/5 text-xs text-foreground/70 hover:bg-foreground/10 transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          This Year <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
        </button>
      </CardHeader>
      <CardContent className="p-0 pl-2 pr-6 pb-6 pt-4 h-[calc(100%-4rem)]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={0} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" opacity={0.4} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-foreground)', opacity: 0.5, fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-foreground)', opacity: 0.5, fontSize: 11 }} tickFormatter={(value) => `$${value}K`} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--color-foreground)', opacity: 0.05 }} />
            
            {/* Transparent base to push the purple bars up */}
            <Bar dataKey="transparentBase" stackId="a" fill="transparent" barSize={24} />
            
            {/* The main visible bars */}
            <Bar dataKey="income" stackId="a" fill="var(--color-chart-1)" radius={[4, 4, 4, 4]} barSize={24} />
            
            {/* A secondary darker bar used in the design, also stacked to "float" downwards */}
            <Bar dataKey="expenses" fill="var(--color-chart-4)" radius={[4, 4, 4, 4]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
