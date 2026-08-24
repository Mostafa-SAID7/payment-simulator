'use client';

import dynamic from 'next/dynamic';

const PaymentTypeChartRenderer = dynamic(() => import('./payment-type-chart-renderer').then((module) => module.PaymentTypeChartRenderer), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full animate-pulse rounded-xl bg-secondary/30" aria-hidden="true" />,
});

export function PaymentTypeChart() {
  return <PaymentTypeChartRenderer />;
}
