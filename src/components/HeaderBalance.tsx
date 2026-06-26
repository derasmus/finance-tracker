import { useTransactions } from '../context/TransactionContext';
import { getBalance } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';

export function HeaderBalance() {
  const { state } = useTransactions();
  const balance = getBalance(state.transactions);
  const isPositive = balance >= 0;

  return (
    <div className="text-right">
      <p
        className="text-xs font-semibold uppercase"
        style={{ color: 'var(--ink-2)', letterSpacing: '0.1em' }}
      >
        Net Balance
      </p>
      <p
        className="tabular-nums leading-tight mt-0.5"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.75rem',
          fontWeight: 500,
          color: isPositive ? 'var(--teal)' : 'var(--rose)',
        }}
      >
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
