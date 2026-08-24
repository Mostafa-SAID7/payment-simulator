'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  title: string;
  amount: number;
  change?: number;
  icon: React.ReactNode;
}

export function BalanceCard({ title, amount, change, icon }: BalanceCardProps) {
  return (
    <Card className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_1px_4px_oklch(0_0_0/0.05),0_1px_2px_oklch(0_0_0/0.04),inset_0_1px_0_color-mix(in_oklch,white_60%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_oklch(0_0_0/0.08)] dark:shadow-[0_2px_8px_oklch(0_0_0/0.22),inset_0_1px_0_color-mix(in_oklch,white_3%,transparent)]">
      <div className="absolute top-0 right-0 left-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <CardContent className="flex items-center gap-4 p-4 sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-primary/6 text-primary/70 shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] sm:size-11">{icon}</span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{title}</span>
            {change !== undefined && (
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-success/20 bg-success/8 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                <TrendingUp className="size-2.5" />+{change.toFixed(1)}%
              </span>
            )}
          </div>
          <span className="text-base leading-tight font-bold text-foreground sm:text-lg">${(amount / 1000).toFixed(1)}K</span>
          {change !== undefined && <span className="text-[10px] text-muted-foreground">{change.toFixed(1)}% from last month</span>}
        </div>
      </CardContent>
    </Card>
  );
}
