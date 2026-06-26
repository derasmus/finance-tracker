import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { getTotalIncome, getTotalExpenses } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';

export function Dashboard() {
  const { state } = useTransactions();
  const income = getTotalIncome(state.transactions);
  const expenses = getTotalExpenses(state.transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        className="rounded-2xl p-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
          >
            Total Income
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--teal-light)' }}
          >
            <TrendingUp size={14} style={{ color: 'var(--teal)' }} />
          </div>
        </div>
        <p
          className="text-2xl font-medium tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)' }}
        >
          {formatCurrency(income)}
        </p>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
          >
            Total Expenses
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--rose-light)' }}
          >
            <TrendingDown size={14} style={{ color: 'var(--rose)' }} />
          </div>
        </div>
        <p
          className="text-2xl font-medium tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--rose)' }}
        >
          {formatCurrency(expenses)}
        </p>
      </div>
    </div>
  );
}
