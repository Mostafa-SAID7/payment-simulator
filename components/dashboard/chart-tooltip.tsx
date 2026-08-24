'use client';

'use client';

import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

type ChartTooltipProps = TooltipProps<ValueType, NameType>;

const indicatorClasses: Record<string, string> = {
  amount: 'bg-chart-1',
  income: 'bg-chart-1',
  successful: 'bg-chart-1',
  expenses: 'bg-chart-4',
  failed: 'bg-chart-5',
};

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border/70 bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="mb-1.5 font-semibold text-foreground">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((entry) => {
          const indicatorClass = indicatorClasses[String(entry.dataKey)] ?? 'bg-muted-foreground';

          return (
            <div className="flex items-center justify-between gap-4" key={String(entry.dataKey ?? entry.name)}>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className={`size-2 shrink-0 rounded-full ${indicatorClass}`} />
                {entry.name ?? entry.dataKey}
              </span>
              <span className="font-semibold text-foreground">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : String(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
