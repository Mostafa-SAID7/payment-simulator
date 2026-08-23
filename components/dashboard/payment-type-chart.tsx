'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { label: 'USD', value: 42, fill: 'var(--color-chart-1)', colorClass: 'bg-[#7F56D9]' },
  { label: 'Euro', value: 28, fill: 'var(--color-chart-2)', colorClass: 'bg-[#2E90FA]' },
  { label: 'Pounds', value: 18, fill: 'var(--color-chart-3)', colorClass: 'bg-[#F79009]' },
  { label: 'Dinar', value: 12, fill: 'var(--color-chart-4)', colorClass: 'bg-[#344054]' },
];

export function PaymentTypeChart() {
  return (
    <Card className="rounded-[1.25rem] bg-card shadow-none overflow-hidden h-full border-0">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-0">
        <CardTitle className="text-sm font-medium text-foreground/90 flex items-center gap-1.5">
          Balance Details <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border/50 text-muted-foreground text-[8px] cursor-help ml-1">i</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative flex flex-col items-center justify-center h-[calc(100%-4rem)] pt-6">
        <div className="relative flex justify-center items-center w-full">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry) => <Cell key={entry.label} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="absolute text-lg font-bold text-foreground">100%</span>
        </div>
        <div className="flex justify-center gap-4 mt-6 text-xs text-foreground/60 pb-6">
          {data.map((entry) => (
            <span key={entry.label} className="flex items-center gap-1.5">
              <i className={`inline-block w-2.5 h-2.5 rounded-[2px] ${entry.colorClass}`} />
              {entry.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
