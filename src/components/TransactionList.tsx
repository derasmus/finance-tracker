import { useTransactions } from '../context/TransactionContext';
import { TransactionItem } from './TransactionItem';
import { EmptyState } from './EmptyState';

export function TransactionList() {
  const { state } = useTransactions();

  const sorted = [...state.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.createdAt - a.createdAt
  );

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <h2
          className="text-sm font-semibold uppercase"
          style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
        >
          Transactions
        </h2>
        {sorted.length > 0 && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)', border: '1px solid var(--border)' }}
          >
            {sorted.length}
          </span>
        )}
      </div>
      {sorted.length === 0 ? (
        <EmptyState message="No transactions yet. Add one above!" />
      ) : (
        <div className="max-h-[32rem] overflow-y-auto">
          {sorted.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
