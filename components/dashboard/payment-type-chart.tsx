'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'USD', value: 42, fill: 'var(--color-chart-1)' }, { name: 'Euro', value: 28, fill: 'var(--color-chart-2)' }, { name: 'Pounds', value: 18, fill: 'var(--color-chart-3)' }, { name: 'Dinar', value: 12, fill: 'var(--color-muted)' },
];

export function PaymentTypeChart() {
  return <Card className="dashboard-card border-border/80 bg-card/80 shadow-none"><CardHeader className="px-4 py-3"><CardTitle className="text-sm">Balance Details <span className="text-muted-foreground">ⓘ</span></CardTitle></CardHeader><CardContent className="px-3 pb-3"><div className="relative"><ResponsiveContainer width="100%" height={205}><PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">{data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Pie></PieChart></ResponsiveContainer><span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium">100%</span></div><Legend verticalAlign="bottom" iconType="square" iconSize={7} wrapperStyle={{ fontSize: '9px' }} payload={data.map((item) => ({ value: item.name, type: 'square', color: item.fill }))} /></CardContent></Card>;
}
