'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', income: 4200, expenses: 2100 }, { date: 'Feb', income: 7000, expenses: 3500 }, { date: 'Mar', income: 6000, expenses: 2600 }, { date: 'Apr', income: 5000, expenses: 2800 }, { date: 'May', income: 5900, expenses: 1800 }, { date: 'Jun', income: 7200, expenses: 3100 }, { date: 'Jul', income: 6400, expenses: 2900 }, { date: 'Aug', income: 7300, expenses: 3300 }, { date: 'Sep', income: 4900, expenses: 2700 }, { date: 'Oct', income: 6500, expenses: 3500 }, { date: 'Nov', income: 5400, expenses: 2200 }, { date: 'Dec', income: 7600, expenses: 3400 },
];

export function TransactionChart() {
  return <Card className="dashboard-card lg:min-h-[310px]"><CardHeader className="flex flex-row items-center justify-between px-4 py-3"><CardTitle className="text-sm">Report <span className="text-muted-foreground">ⓘ</span></CardTitle><button className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">This Year⌄</button></CardHeader><CardContent className="px-2 pb-3"><ResponsiveContainer width="100%" height={245}><BarChart data={data} barGap={0}><CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="2 4" /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 9 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 9 }} tickFormatter={(v) => `$${v / 1000}K`} /><Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: 11 }} /><Bar dataKey="income" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} barSize={11} /><Bar dataKey="expenses" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} barSize={11} /></BarChart></ResponsiveContainer></CardContent></Card>;
}
