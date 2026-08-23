'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface BatchProgressProps {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  status: 'idle' | 'processing' | 'completed';
}

export function BatchProgress({
  total,
  processed,
  successful,
  failed,
  status,
}: BatchProgressProps) {
  const percentage = total > 0 ? (processed / total) * 100 : 0;

  return (
    <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-3 border-b border-border/60">
        <CardTitle className="text-sm font-semibold text-foreground">Processing Progress</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {status === 'completed'
            ? 'Batch processing completed'
            : 'Monitor your batch processing in real-time'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{percentage.toFixed(0)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          {/* Total Transactions */}
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Transactions</span>
              <Clock className="h-5 w-5 text-primary/50" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{total}</p>
          </div>

          {/* Processed */}
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Processed</span>
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{processed}</p>
          </div>

          {/* Successful */}
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Successful</span>
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <p className="mt-1 text-2xl font-bold text-success">{successful}</p>
          </div>

          {/* Failed */}
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Failed</span>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <p className="mt-1 text-2xl font-bold text-destructive">{failed}</p>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium text-foreground">
            Status:{' '}
            <span
              className={
                status === 'completed'
                  ? 'text-success'
                  : status === 'processing'
                    ? 'text-warning'
                    : 'text-muted-foreground'
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
