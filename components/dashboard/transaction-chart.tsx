'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'Mon', amount: 4200 },
  { date: 'Tue', amount: 5100 },
  { date: 'Wed', amount: 4800 },
  { date: 'Thu', amount: 6200 },
  { date: 'Fri', amount: 7100 },
  { date: 'Sat', amount: 5900 },
  { date: 'Sun', amount: 6300 },
];

export function TransactionChart() {
  return (
    <Card className="col-span-1 border-border md:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
