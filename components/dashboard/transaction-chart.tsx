'use client';

import dynamic from 'next/dynamic';

const TransactionChartRenderer = dynamic(() => import('./transaction-chart-renderer').then((module) => module.TransactionChartRenderer), {
  ssr: false,
  loading: () => (
    <div
      className="h-[320px] w-full rounded-xl bg-secondary/30 motion-safe:animate-pulse"
      role="status"
      aria-label="Loading transaction report"
    />
  ),
});

export function TransactionChart() {
  return <TransactionChartRenderer />;
}
