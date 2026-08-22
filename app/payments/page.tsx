'use client';

import { PaymentForm } from '@/components/payment-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const recentPayments = [
  {
    id: 'PAY-001',
    recipient: 'Acme Corporation',
    amount: 25000,
    type: 'ACH',
    status: 'completed',
    date: '2024-03-05',
  },
  {
    id: 'PAY-002',
    recipient: 'Tech Solutions Inc',
    amount: 50000,
    type: 'RTGS',
    status: 'completed',
    date: '2024-03-04',
  },
  {
    id: 'PAY-003',
    recipient: 'Global Enterprises',
    amount: 75000,
    type: 'WPS',
    status: 'pending',
    date: '2024-03-04',
  },
  {
    id: 'PAY-004',
    recipient: 'Local Business LLC',
    amount: 15000,
    type: 'ACH',
    status: 'failed',
    date: '2024-03-03',
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    completed: 'default',
    pending: 'secondary',
    failed: 'destructive',
  };
  return (
    <Badge variant={variants[status] || 'outline'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function PaymentsPage() {
  return (
    <div className="page-stack">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and initiate payment transactions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Form */}
        <div className="lg:col-span-1">
          <PaymentForm />
        </div>

        {/* Recent Payments */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Your latest payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{payment.recipient}</p>
                        <p className="text-sm text-muted-foreground">{payment.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${(payment.amount / 1000).toFixed(1)}K
                        </p>
                        <p className="text-xs text-muted-foreground">{payment.type}</p>
                      </div>
                      <div className="w-24">
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
