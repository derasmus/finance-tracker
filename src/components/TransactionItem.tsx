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
  const accentColor = isIncome ? 'var(--teal)' : 'var(--rose)';
  const amountColor = isIncome ? 'var(--teal)' : 'var(--rose)';

  return (
    <div
      className="flex items-center gap-4 py-3.5 px-5 border-b last:border-0 transition-colors"
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-alt)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <div
        className="w-0.5 h-8 rounded-full shrink-0"
        style={{ background: accentColor }}
      />

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: 'var(--ink)' }}
        >
          {transaction.description}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <CategoryBadge category={transaction.category} />
          <span className="text-xs" style={{ color: 'var(--ink-3)' }}>
            {formattedDate}
          </span>
        </div>
      </div>

      <span
        className="text-sm font-medium tabular-nums shrink-0"
        style={{ fontFamily: 'var(--font-mono)', color: amountColor }}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(transaction.amount)}
      </span>

      <button
        onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })}
        className="shrink-0 p-1.5 rounded-lg transition-colors"
        style={{ color: 'var(--ink-3)' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--rose)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-light)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-3)';
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }}
        aria-label="Delete transaction"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
