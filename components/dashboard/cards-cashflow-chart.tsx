'use client';

import dynamic from 'next/dynamic';

const CardsCashflowChartRenderer = dynamic(() => import('./cards-cashflow-chart-renderer').then((module) => module.CardsCashflowChartRenderer), {
  ssr: false,
  loading: () => <div className="h-[220px] w-full animate-pulse rounded-xl bg-secondary/30" aria-hidden="true" />,
});

export function CardsCashflowChart() {
  return <CardsCashflowChartRenderer />;
}
