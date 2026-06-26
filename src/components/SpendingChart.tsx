import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../context/TransactionContext';
import { getCategoryBreakdown } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';
import { EmptyState } from './EmptyState';

export function SpendingChart() {
  const { state } = useTransactions();
  const chartData = getCategoryBreakdown(state.transactions);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Spending by Category</h2>
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
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
