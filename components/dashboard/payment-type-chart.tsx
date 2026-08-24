'use client';

import dynamic from 'next/dynamic';

const PaymentTypeChartRenderer = dynamic(() => import('./payment-type-chart-renderer').then((module) => module.PaymentTypeChartRenderer), { ssr: false });

export function PaymentTypeChart() {
  return <PaymentTypeChartRenderer />;
}
