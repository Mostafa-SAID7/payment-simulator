'use client';

import dynamic from 'next/dynamic';

const CardsCashflowChartRenderer = dynamic(() => import('./cards-cashflow-chart-renderer').then((module) => module.CardsCashflowChartRenderer), { ssr: false });

export function CardsCashflowChart() {
  return <CardsCashflowChartRenderer />;
}
