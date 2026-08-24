'use client';

import dynamic from 'next/dynamic';

const PaymentActivityChartRenderer = dynamic(() => import('./payment-activity-chart-renderer').then((module) => module.PaymentActivityChartRenderer), {
  ssr: false,
  loading: () => <div className="h-[280px] w-full animate-pulse rounded-xl bg-secondary/30 sm:h-[300px]" aria-hidden="true" />,
});

export function PaymentActivityChart() {
  return <PaymentActivityChartRenderer />;
}
