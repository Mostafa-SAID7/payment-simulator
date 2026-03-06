'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'ACH', value: 45, fill: 'var(--color-chart-1)' },
  { name: 'RTGS', value: 30, fill: 'var(--color-chart-2)' },
  { name: 'WPS', value: 25, fill: 'var(--color-chart-3)' },
];

export function PaymentTypeChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Payment Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
