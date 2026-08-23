import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { label: 'USD', value: 42, fill: 'var(--color-chart-1)', colorClass: 'dashboard-legend-dot-usd' },
  { label: 'Euro', value: 28, fill: 'var(--color-chart-2)', colorClass: 'dashboard-legend-dot-euro' },
  { label: 'Pound', value: 18, fill: 'var(--color-chart-3)', colorClass: 'dashboard-legend-dot-pound' },
  { label: 'Dinar', value: 12, fill: 'var(--color-muted)', colorClass: 'dashboard-legend-dot-dinar' },
];

export function PaymentTypeChart() {
  return (
    <Card className="dashboard-card dashboard-balance-details-card">
      <CardHeader className="dashboard-panel-header">
        <CardTitle className="dashboard-panel-title">
          Balance Details <span className="dashboard-info-mark">ⓘ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="dashboard-balance-chart-content">
        <div className="dashboard-donut-wrap">
          <ResponsiveContainer width="100%" height={176}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value" stroke="none">
                {data.map((entry) => <Cell key={entry.label} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="dashboard-donut-total">100%</span>
        </div>
        <div className="dashboard-balance-legend">
          {data.map((entry) => (
            <span key={entry.label}>
              <i className={`dashboard-legend-dot ${entry.colorClass}`} />
              {entry.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
