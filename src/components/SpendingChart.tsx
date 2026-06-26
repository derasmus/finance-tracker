import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../context/TransactionContext';
import { getCategoryBreakdown } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';
import { EmptyState } from './EmptyState';

export function SpendingChart() {
  const { state } = useTransactions();
  const chartData = getCategoryBreakdown(state.transactions);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h2
        className="text-sm font-semibold uppercase mb-4"
        style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
      >
        Spending by Category
      </h2>
      {chartData.length === 0 ? (
        <EmptyState message="Add some expenses to see the breakdown." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [formatCurrency(value as number), 'Amount']}
              contentStyle={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8125rem',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                boxShadow: 'none',
                color: 'var(--ink)',
              }}
            />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={(value) => (
                <span style={{ fontSize: '0.75rem', color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
