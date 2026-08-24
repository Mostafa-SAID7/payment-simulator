'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const data = [
  { label: 'USD', value: 42, fill: 'var(--color-chart-1)', colorClass: 'bg-chart-1' },
  { label: 'Euro', value: 28, fill: 'var(--color-chart-2)', colorClass: 'bg-chart-2' },
  { label: 'Pounds', value: 18, fill: 'var(--color-chart-3)', colorClass: 'bg-chart-3' },
  { label: 'Dinar', value: 12, fill: 'var(--color-chart-4)', colorClass: 'bg-chart-4' },
];

export function PaymentTypeChartRenderer() {
  return (
    <Card className="h-full min-w-0 overflow-hidden rounded-[1.25rem] border-0 bg-card py-0 gap-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-3 pb-0">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium text-foreground/90">
          Balance Details <span className="ml-1 inline-flex size-3.5 items-center justify-center rounded-full border border-border/50 text-[8px] text-muted-foreground" title="More information">i</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex h-[calc(100%-4rem)] flex-col items-center justify-center p-0 pt-6">
        <div className="relative flex h-[210px] w-full max-w-[340px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry) => <Cell key={entry.label} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="absolute text-lg font-bold text-foreground">100%</span>
        </div>
        <div className="mt-6 flex w-full flex-wrap justify-center gap-x-4 gap-y-2 pb-6 text-xs text-foreground/60">
          {data.map((entry) => (
            <span key={entry.label} className="flex items-center gap-1.5">
              <i className={cn('inline-block size-2.5 rounded-[2px]', entry.colorClass)} />
              {entry.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
