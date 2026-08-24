'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  title: string;
  amount: number;
  change?: number;
  icon: React.ReactNode;
}

export function BalanceCard({ title, amount, change, icon }: BalanceCardProps) {
  return (
    <Card className="min-w-0 border-border/70 bg-card py-0 gap-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2 pt-4">
        <CardTitle className="text-sm font-medium text-foreground/60">{title}</CardTitle>
        <div className="text-accent">{icon}</div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-2xl font-bold text-foreground">${(amount / 1000).toFixed(1)}K</div>
        {change !== undefined && (
          <div className="mt-1 flex items-center gap-1 text-xs text-accent">
            <TrendingUp className="h-4 w-4" />
            <span>{change.toFixed(1)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
