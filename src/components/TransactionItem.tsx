import { Trash2 } from 'lucide-react';
import type { Transaction } from '../types';
import { useTransactions } from '../context/TransactionContext';
import { CategoryBadge } from './CategoryBadge';
import { formatCurrency } from '../utils/constants';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { dispatch } = useTransactions();

  const formattedDate = new Date(transaction.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const isIncome = transaction.type === 'income';

  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <span className="text-xs text-gray-400 w-14 shrink-0">{formattedDate}</span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{transaction.description}</p>
        <div className="mt-0.5">
          <CategoryBadge category={transaction.category} />
        </div>
      </div>

      <span
        className={`text-sm font-semibold shrink-0 ${
          isIncome ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(transaction.amount)}
      </span>

      <button
        onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })}
        className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
        aria-label="Delete transaction"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
