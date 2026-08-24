'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip } from './chart-tooltip';

const data = [
  { name: 'Week 1', successful: 92, failed: 8 },
  { name: 'Week 2', successful: 95, failed: 5 },
  { name: 'Week 3', successful: 88, failed: 12 },
  { name: 'Week 4', successful: 96, failed: 4 },
];

export function BatchSuccessChartRenderer() {
  return (
    <Card className="dashboard-card col-span-1 min-w-0 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Batch Processing Success Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-[340px] min-w-0 px-2 pb-5 sm:px-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Bar dataKey="successful" stackId="a" fill="var(--color-chart-1)" />
            <Bar dataKey="failed" stackId="a" fill="var(--color-chart-5)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
