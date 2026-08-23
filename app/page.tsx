import {
  ArrowUpRight,
  ChevronDown,
  CircleDollarSign,
  MoreHorizontal,
  Send,
  WalletCards,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransactionChart } from '@/components/dashboard/transaction-chart';
import { PaymentTypeChart } from '@/components/dashboard/payment-type-chart';

const metrics = [
  { label: 'Total Revenue', value: '$47,255.00', icon: CircleDollarSign },
  { label: 'Avg. Order Value', value: '$98,747.00', icon: WalletCards },
  { label: 'New Order', value: '$47,255.00', icon: Send },
];

const transactions = [
  { name: 'Chat Gpt', id: 'ID: 43652', date: '20 July 2025', amount: '$585,658.00', status: 'Successful' },
  { name: 'Gitlab', id: 'ID: 85784', date: '21 July 2025', amount: '$965,854.00', status: 'Pending' },
  { name: 'Nextjs', id: 'ID: 8542', date: '25 July 2025', amount: '$985,414.00', status: 'Successful' },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-overview-grid" aria-label="Account overview">
        <Card className="dashboard-card dashboard-balance-card">
          <CardHeader className="dashboard-panel-header">
            <CardTitle className="dashboard-panel-title">
              My Balance <span className="dashboard-info-mark">ⓘ</span>
            </CardTitle>
            <button type="button" className="dashboard-wallet-selector" aria-label="Select wallet">
              <span>USD</span>
              <ChevronDown />
            </button>
          </CardHeader>
          <CardContent className="dashboard-balance-content">
            <div className="dashboard-balance-amount">$525,255.00</div>
            <span className="dashboard-growth-badge">+5.8%</span>
            <div className="dashboard-balance-actions">
              <Button className="dashboard-transfer-button" size="sm">
                <ArrowUpRight data-icon="inline-start" /> Transfer
              </Button>
              <Button className="dashboard-request-button" variant="ghost" size="sm">
                Request <ArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="dashboard-card dashboard-metric-card">
            <CardContent className="dashboard-metric-content">
              <div>
                <p className="dashboard-metric-label">{label}</p>
                <p className="dashboard-metric-value">{value}</p>
              </div>
              <Icon className="dashboard-metric-icon" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="dashboard-analytics-grid" aria-label="Dashboard analytics">
        <PaymentTypeChart />
        <TransactionChart />
      </section>

      <Card className="dashboard-card dashboard-transactions-card">
        <CardHeader className="dashboard-table-header">
          <CardTitle className="dashboard-panel-title">
            Transaction History <span className="dashboard-info-mark">ⓘ</span>
          </CardTitle>
          <button type="button" className="dashboard-period-selector">
            This Month <ChevronDown />
          </button>
        </CardHeader>
        <CardContent className="dashboard-table-content">
          <div className="dashboard-table-scroll">
            <table className="dashboard-transactions-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Date</th>
                  <th>Approx</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="dashboard-transaction-name">
                        <span className="dashboard-transaction-avatar"><CircleDollarSign /></span>
                        <span>
                          <strong>{transaction.name}</strong>
                          <small>{transaction.id}</small>
                        </span>
                      </div>
                    </td>
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <Badge
                        variant="outline"
                        className={transaction.status === 'Successful' ? 'dashboard-status-success' : 'dashboard-status-pending'}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="ghost" size="icon" className="dashboard-row-action" aria-label={`More actions for ${transaction.name}`}>
                        <MoreHorizontal />
                      </Button>
                    </td>
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
