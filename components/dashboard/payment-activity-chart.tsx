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
    <Card className="dashboard-card payment-activity-card">
      <CardHeader className="payment-panel-header">
        <CardTitle className="payment-panel-title">
          Payment Activity <span className="payment-info-mark">ⓘ</span>
        </CardTitle>
        <button type="button" className="payment-period-button">This Year⌄</button>
      </CardHeader>
      <CardContent className="payment-chart-content">
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
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#paymentActivityFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
