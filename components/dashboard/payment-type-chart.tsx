import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { label: 'USD', value: 42, fill: 'var(--color-chart-1)', colorClass: 'bg-chart-1' },
  { label: 'Euro', value: 28, fill: 'var(--color-chart-2)', colorClass: 'bg-chart-2' },
  { label: 'Pounds', value: 18, fill: 'var(--color-chart-3)', colorClass: 'bg-chart-3' },
  { label: 'Dinar', value: 12, fill: 'var(--color-chart-4)', colorClass: 'bg-chart-4' },
];

export function PaymentTypeChart() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
              {data.map((entry) => <Cell key={entry.label} fill={entry.fill} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="absolute text-lg font-bold text-foreground">100%</span>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 pb-1 text-xs text-foreground/60 sm:mt-6">
        {data.map((entry) => (
          <span key={entry.label} className="flex items-center gap-1.5"><i className={cn('inline-block size-2.5 rounded-[2px]', entry.colorClass)} />{entry.label}</span>
        ))}
      </div>
    </div>
  );
}
