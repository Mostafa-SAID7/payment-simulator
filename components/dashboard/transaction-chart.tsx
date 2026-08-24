'use client';

import dynamic from 'next/dynamic';

const TransactionChartRenderer = dynamic(() => import('./transaction-chart-renderer').then((module) => module.TransactionChartRenderer), { ssr: false });

export function TransactionChart() {
  return <TransactionChartRenderer />;
}
