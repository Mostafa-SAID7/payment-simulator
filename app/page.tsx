'use client';

import { DollarSign, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { BalanceCard } from '@/components/dashboard/balance-card';
import { TransactionChart } from '@/components/dashboard/transaction-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';
import { BatchSuccessChart } from '@/components/dashboard/batch-success-chart';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome to FinPay Payment Simulator
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Send className="mr-2 h-4 w-4" />
          New Payment
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <BalanceCard
          title="Total Volume"
          amount={2500000}
          change={12.5}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <BalanceCard
          title="Payments Today"
          amount={450000}
          change={8.2}
          icon={<Send className="h-5 w-5" />}
        />
        <BalanceCard
          title="Successful Batches"
          amount={950000}
          change={5.1}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <BalanceCard
          title="Failed Payments"
          amount={12500}
          change={-2.3}
          icon={<AlertCircle className="h-5 w-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <TransactionChart />
        <PaymentTypeChart />
      </div>

      <BatchSuccessChart />
    </div>
  );
}
