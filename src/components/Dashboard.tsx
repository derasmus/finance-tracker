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
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex h-full">
          <div className="shrink-0" style={{ width: '3px', background: 'var(--teal)' }} />
          <div className="flex-1 p-5">
            <p
              className="text-xs font-bold uppercase mb-3"
              style={{ color: 'var(--ink-2)', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}
            >
              Total Income
            </p>
            <p
              className="tabular-nums"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.75rem',
                fontWeight: 500,
                color: 'var(--teal)',
                lineHeight: 1,
              }}
            >
              {formatCurrency(income)}
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex h-full">
          <div className="shrink-0" style={{ width: '3px', background: 'var(--rose)' }} />
          <div className="flex-1 p-5">
            <p
              className="text-xs font-bold uppercase mb-3"
              style={{ color: 'var(--ink-2)', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}
            >
              Total Expenses
            </p>
            <p
              className="tabular-nums"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.75rem',
                fontWeight: 500,
                color: 'var(--rose)',
                lineHeight: 1,
              }}
            >
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
