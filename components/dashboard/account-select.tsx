'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const accounts = [
  { value: 'xx25', label: 'xx25' },
  { value: 'xx48', label: 'xx48' },
  { value: 'xx91', label: 'xx91' },
];

type AccountSelectProps = {
  className?: string;
};

export function AccountSelect({ className }: AccountSelectProps) {
  return (
    <Select defaultValue="xx25">
      <SelectTrigger aria-label="Select account" className={cn('h-8 shrink-0 gap-2 rounded-lg border-border/50 bg-secondary/80 px-3 text-[11px] font-semibold tracking-wider text-foreground/70 shadow-[var(--shadow-xs)] transition-all duration-150 hover:border-border hover:bg-secondary', className)}>
        <span className="flex -space-x-1" aria-hidden="true">
          <span className="z-10 size-3 rounded-full bg-destructive shadow-sm" />
          <span className="size-3 rounded-full bg-warning shadow-sm" />
        </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-border/70 bg-card text-[11px]">
        {accounts.map((account) => (
          <SelectItem key={account.value} value={account.value}>{account.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
