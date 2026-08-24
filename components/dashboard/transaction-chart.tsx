'use client';

import dynamic from 'next/dynamic';

const TransactionChartRenderer = dynamic(() => import('./transaction-chart-renderer').then((module) => module.TransactionChartRenderer), {
  ssr: false,
  loading: () => <div className="h-[320px] w-full animate-pulse rounded-xl bg-secondary/30" aria-hidden="true" />,
});

export function TransactionChart() {
  return <TransactionChartRenderer />;
}
