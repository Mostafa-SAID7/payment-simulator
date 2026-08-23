'use client';

import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

type ChartTooltipProps = TooltipProps<ValueType, NameType>;

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <div className="chart-tooltip-values">
        {payload.map((entry) => (
          <div className="chart-tooltip-row" key={String(entry.dataKey ?? entry.name)}>
            <span className="chart-tooltip-name">
              <span className="chart-tooltip-dot" style={{ backgroundColor: entry.color }} />
              {entry.name ?? entry.dataKey}
            </span>
            <span className="chart-tooltip-value">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : String(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
