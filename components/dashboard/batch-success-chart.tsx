'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Week 1', successful: 92, failed: 8 },
  { name: 'Week 2', successful: 95, failed: 5 },
  { name: 'Week 3', successful: 88, failed: 12 },
  { name: 'Week 4', successful: 96, failed: 4 },
];

export function BatchSuccessChart() {
  return (
    <Card className="col-span-1 border-border md:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Batch Processing Success Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar dataKey="successful" stackId="a" fill="var(--color-chart-1)" />
            <Bar dataKey="failed" stackId="a" fill="var(--color-chart-5)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
