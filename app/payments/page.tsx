'use client';

import {
  ArrowUpRight,
  CheckCircle,
  CircleDollarSign,
  Clock3,
  CreditCard,
  MoreHorizontal,
  Send,
  WalletCards,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentActivityChart } from '@/components/dashboard/payment-activity-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';

const paymentHistory = [
  { recipient: 'William Hirsch', id: 'PAY-8784', detail: 'Service Fee', date: '20 July 2025', amount: '$585,658.00', status: 'Paid' },
  { recipient: 'William Hirsch', id: 'PAY-8784', detail: 'Service Fee', date: '21 July 2025', amount: '$965,854.00', status: 'Pending' },
  { recipient: 'William Hirsch', id: 'PAY-8784', detail: 'Service Fee', date: '25 July 2025', amount: '$985,414.00', status: 'Paid' },
];

const balanceBreakdown = [
  ['USD', '$525,525.00'],
  ['EUR', '$414,587.00'],
  ['ETH', '$785.58.00'],
  ['GBP', '$875,525.00'],
];

function PaymentStatusIcon({ status }: { status: string }) {
  if (status === 'Paid') {
    return <CheckCircle className="payment-status-icon payment-status-icon-paid" />;
  }

  if (status === 'Pending') {
    return <Clock3 className="payment-status-icon payment-status-icon-pending" />;
  }

  return <XCircle className="payment-status-icon payment-status-icon-failed" />;
}

export default function PaymentsPage() {
  return (
    <div className="payments-page page-stack">
      <div className="payments-page-intro">
        <h1 className="payments-page-title">Payment</h1>
        <p className="payments-page-description">
          Easily manage all your payments, invoices, and transactions with real-time analytics, customer insights,<br className="payments-description-break" /> and multi-currency support – ensuring accuracy and financial transparency.
        </p>
      </div>

      <section className="payments-overview-grid" aria-label="Payment overview">
        <Card className="dashboard-card payment-balance-card">
          <CardHeader className="payment-panel-header">
            <CardTitle className="payment-panel-title">
              <span className="payment-title-icon"><WalletCards /></span>
              My Balance <span className="payment-info-mark">ⓘ</span>
            </CardTitle>
            <button type="button" className="payment-currency-button">
              <CreditCard />
              <span>xx25</span>
              <span aria-hidden="true">⌄</span>
            </button>
          </CardHeader>
          <CardContent className="payment-balance-content">
            <div className="payment-balance-total">
              <strong>$875,985.00</strong>
              <Badge className="payment-change-badge">+55.56%</Badge>
            </div>
            <div className="payment-balance-actions">
              <Button className="payment-transfer-button"><Send /> Transfer</Button>
              <Button variant="ghost" className="payment-request-button">Request <ArrowUpRight /></Button>
            </div>
            <div className="payment-breakdown-grid">
              {balanceBreakdown.map(([currency, amount]) => (
                <div key={currency} className="payment-breakdown-item">
                  <strong>{amount}</strong>
                  <span>{currency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="payment-metric-stack">
          <Card className="dashboard-card payment-metric-card">
            <div className="payment-metric-icon"><CircleDollarSign /></div>
            <div>
              <span>Gross Volume</span>
              <strong>$965,741.00</strong>
            </div>
          </Card>
          <Card className="dashboard-card payment-metric-card">
            <div className="payment-metric-icon"><Clock3 /></div>
            <div>
              <span>Net Volume</span>
              <strong>$475,744.00</strong>
            </div>
          </Card>
          <Card className="dashboard-card payment-metric-card">
            <div className="payment-metric-icon"><CreditCard /></div>
            <div>
              <span>Per Customer</span>
              <strong>$747,985.00</strong>
            </div>
          </Card>
        </div>
      </section>

      <section className="payments-analytics-grid" aria-label="Payment analytics">
        <PaymentActivityChart />
        <PaymentTypeChart />
      </section>

      <Card className="dashboard-card payment-history-card">
        <CardHeader className="payment-history-header">
          <CardTitle className="payment-panel-title">Payment History <span className="payment-info-mark">ⓘ</span></CardTitle>
          <button type="button" className="payment-period-button">This Year⌄</button>
        </CardHeader>
        <CardContent className="payment-history-content">
          <div className="payment-history-table-wrap">
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>Members</th>
                  <th>Invoice</th>
                  <th>Payments Details</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={`${payment.id}-${index}`}>
                    <td>
                      <div className="payment-member-cell">
                        <div className="payment-member-avatar">WH</div>
                        <div>
                          <strong>{payment.recipient}</strong>
                          <span>ID: {payment.id.replace('PAY-', 'C')}</span>
                        </div>
                      </div>
                    </td>
                    <td>{payment.id}</td>
                    <td>{payment.detail}</td>
                    <td>{payment.date}</td>
                    <td>{payment.amount}</td>
                    <td><span className={`payment-status-badge payment-status-${payment.status.toLowerCase()}`}><PaymentStatusIcon status={payment.status} />{payment.status}</span></td>
                    <td><Button variant="ghost" size="icon" className="payment-row-action"><MoreHorizontal /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
