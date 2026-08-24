'use client';

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type PeriodValue = 'month' | 'year' | 'last-month';

type PeriodSelectProps = {
  defaultValue?: PeriodValue;
  className?: string;
};

const periodOptions: Record<PeriodValue, string> = {
  month: 'This Month',
  year: 'This Year',
  'last-month': 'Last Month',
};

export function PeriodSelect({ defaultValue = 'year', className }: PeriodSelectProps) {
  const [value, setValue] = useState<PeriodValue>(defaultValue);

  return (
    <Select value={value} onValueChange={(nextValue) => setValue(nextValue as PeriodValue)}>
      <SelectTrigger aria-label="Select reporting period" className={cn('h-8 shrink-0 gap-1.5 rounded-lg border-border/50 bg-secondary/80 px-3 text-[11px] text-foreground/60 shadow-[var(--shadow-xs)] transition-all duration-150 hover:border-border hover:bg-secondary', className)}>
        <CalendarDays className="size-3.5 opacity-70" />
        <SelectValue>{periodOptions[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent className="border-border/70 bg-card text-[11px]">
        <SelectItem value="month">This Month</SelectItem>
        <SelectItem value="year">This Year</SelectItem>
        <SelectItem value="last-month">Last Month</SelectItem>
      </SelectContent>
    </Select>
  );
}
