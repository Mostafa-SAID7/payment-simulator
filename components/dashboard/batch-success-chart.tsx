'use client';

import dynamic from 'next/dynamic';

const BatchSuccessChartRenderer = dynamic(() => import('./batch-success-chart-renderer').then((module) => module.BatchSuccessChartRenderer), { ssr: false });

export function BatchSuccessChart() {
  return <BatchSuccessChartRenderer />;
}
