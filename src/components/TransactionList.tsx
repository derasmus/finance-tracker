import { useTransactions } from '../context/TransactionContext';
import { TransactionItem } from './TransactionItem';
import { EmptyState } from './EmptyState';

export function TransactionList() {
  const { state } = useTransactions();

  const sorted = [...state.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.createdAt - a.createdAt
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">Transactions</h2>
      </div>
      {sorted.length === 0 ? (
        <EmptyState message="No transactions yet. Add one above!" />
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {sorted.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
