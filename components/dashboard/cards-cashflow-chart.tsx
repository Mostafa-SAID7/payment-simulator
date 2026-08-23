'use client';

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

export function CardsCashflowChart() {
  return (
    <Card className="dashboard-card cards-cashflow-card">
      <CardHeader className="cards-panel-header">
        <CardTitle className="cards-panel-title">Cashflow <span className="cards-info-mark">ⓘ</span></CardTitle>
        <button type="button" className="cards-period-button">Last Month⌄</button>
      </CardHeader>
      <CardContent className="cards-chart-content">
        <ResponsiveContainer width="100%" height={175}>
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
