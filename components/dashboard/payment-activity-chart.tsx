'use client';

import dynamic from 'next/dynamic';

const PaymentActivityChartRenderer = dynamic(() => import('./payment-activity-chart-renderer').then((module) => module.PaymentActivityChartRenderer), { ssr: false });

export function PaymentActivityChart() {
  return <PaymentActivityChartRenderer />;
}
