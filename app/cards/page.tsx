import { MoreVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardsCashflowChart } from '@/components/dashboard/cards-cashflow-chart';
import { PageHeader } from '@/components/page-header';

const savedCards = [
  { variant: 'gold', number: '5421', holder: 'John Doe' },
  { variant: 'blue', number: '8547', holder: 'John Doe' },
  { variant: 'purple', number: '8757', holder: 'John Doe' },
];

const recentActivity = [
  { initials: 'DR', name: 'Darlene Robertson', action: 'Updated Account S...', time: '04:05 AM', variant: 'peach' },
  { initials: 'MM', name: 'Marvin McKinney', action: 'Recent Transaction', time: '10:30 AM', variant: 'rose' },
  { initials: 'DS', name: 'Darrell Steward', action: 'Transferred Funds to', time: '02:14 AM', variant: 'violet' },
  { initials: 'DL', name: 'Devon Lane', action: 'added a new savings...', time: '09:25 AM', variant: 'orange' },
];

const cardTransactions = [
  { quantity: '14', date: '20 July 2025', type: 'Transfer', description: 'Service Fee', amount: '$525,652.00', status: 'Credit' },
  { quantity: '17', date: '24 July 2025', type: 'Card Payment', description: 'UI/UX Project', amount: '$747,985.00', status: 'Debit' },
  { quantity: '20', date: '26 July 2025', type: 'Card Payment', description: 'Freelancer Fee', amount: '$625,440.00', status: 'Credit' },
];

function CardPreview({ variant, number, holder }: { variant: string; number: string; holder: string }) {
  return (
    <div className={`saved-card saved-card-${variant}`}>
      <div className="saved-card-topline">
        <span className="saved-card-chip"><span /><span /><span /></span>
        <span className="saved-card-network"><span /><span /></span>
      </div>
      <p className="saved-card-number">•••• •••• •••• {number}</p>
      <div className="saved-card-footer">
        <span>{holder}</span>
        <span>VISA</span>
      </div>
    </div>
  );
}

export default function CardsPage() {
  return (
    <div className="cards-page page-stack">
      <PageHeader
        title="Cards"
        description={<>Manage multiple cards effortlessly, track transactions, monitor spending patterns, and view real-time activity — all designed to simplify your financial control and transparency.</>}
      />

      <section className="cards-preview-row" aria-label="Saved cards">
        {savedCards.map((card) => <CardPreview key={card.number} {...card} />)}
        <button type="button" className="cards-add-card">
          <Plus />
          <span>Add Card</span>
        </button>
      </section>

      <section className="cards-insights-grid" aria-label="Card insights">
        <CardsCashflowChart />
        <Card className="dashboard-card cards-activity-card">
          <CardHeader className="cards-panel-header">
            <CardTitle className="cards-panel-title">Recent Activity <span className="cards-info-mark">ⓘ</span></CardTitle>
            <button type="button" className="cards-more-button" aria-label="More activity options"><MoreVertical /></button>
          </CardHeader>
          <CardContent className="cards-activity-content">
            <span className="cards-activity-day">Today</span>
            {recentActivity.slice(0, 3).map((activity) => (
              <div key={activity.name} className="cards-activity-item">
                <div className={`cards-activity-avatar cards-activity-avatar-${activity.variant}`}>{activity.initials}</div>
                <div className="cards-activity-copy">
                  <p><strong>{activity.name}</strong> <span>{activity.action}</span></p>
                  <small><span className="cards-activity-dot" />{activity.time}</small>
                </div>
              </div>
            ))}
            <span className="cards-activity-day">Yesterday</span>
            <div className="cards-activity-item">
              <div className="cards-activity-avatar cards-activity-avatar-orange">{recentActivity[3].initials}</div>
              <div className="cards-activity-copy">
                <p><strong>{recentActivity[3].name}</strong> <span>{recentActivity[3].action}</span></p>
                <small><span className="cards-activity-dot" />{recentActivity[3].time}</small>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="dashboard-card cards-transactions-card">
        <CardHeader className="cards-panel-header cards-transactions-header">
          <CardTitle className="cards-panel-title">All Transactions <span className="cards-info-mark">ⓘ</span></CardTitle>
          <button type="button" className="cards-period-button">This Year⌄</button>
        </CardHeader>
        <CardContent className="cards-transactions-content">
          <div className="cards-transactions-table-wrap">
            <table className="cards-transactions-table">
              <thead>
                <tr>
                  <th><span className="cards-checkbox" />Qty</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cardTransactions.map((transaction) => (
                  <tr key={`${transaction.date}-${transaction.quantity}`}>
                    <td><span className="cards-checkbox" />{transaction.quantity}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td><Badge className={`cards-transaction-status cards-transaction-status-${transaction.status.toLowerCase()}`}>{transaction.status}</Badge></td>
                    <td><Button variant="ghost" size="icon" className="cards-row-action"><MoreVertical /></Button></td>
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
