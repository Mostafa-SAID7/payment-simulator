import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { value: 42, fill: 'var(--color-chart-1)' },
  { value: 28, fill: 'var(--color-chart-2)' },
  { value: 18, fill: 'var(--color-chart-3)' },
  { value: 12, fill: 'var(--color-muted)' },
];

export function PaymentTypeChart() {
  return <Card className="dashboard-card"><CardHeader className="px-4 py-3"><CardTitle className="text-sm">Balance Details <span className="text-muted-foreground">ⓘ</span></CardTitle></CardHeader><CardContent className="px-3 pb-3"><div className="relative"><ResponsiveContainer width="100%" height={205}><PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">{data.map((entry, index) => <Cell key={`balance-segment-${index}`} fill={entry.fill} />)}</Pie></PieChart></ResponsiveContainer><span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium">100%</span></div></CardContent></Card>;
}
