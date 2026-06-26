import { useEffect, useState } from 'react';
import { Target, Pencil, X, Check, AlertTriangle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { getTotalExpenses } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';

export function BudgetLimit() {
  const { state, dispatch } = useTransactions();
  const { budgetLimit } = state;
  const expenses = getTotalExpenses(state.transactions);

  const [editing, setEditing] = useState(budgetLimit === null);
  const [inputValue, setInputValue] = useState(budgetLimit !== null ? String(budgetLimit) : '');

  useEffect(() => {
    if (budgetLimit !== null) {
      setEditing(false);
      setInputValue(String(budgetLimit));
    }
  }, [budgetLimit]);

  const handleSave = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) return;
    dispatch({ type: 'SET_BUDGET', payload: parsed });
    setEditing(false);
  };

  const handleRemove = () => {
    dispatch({ type: 'SET_BUDGET', payload: null });
    setInputValue('');
    setEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      if (budgetLimit !== null) {
        setInputValue(String(budgetLimit));
        setEditing(false);
      }
    }
  };

  const pct = budgetLimit !== null && budgetLimit > 0 ? Math.min((expenses / budgetLimit) * 100, 100) : 0;
  const isOver = budgetLimit !== null && expenses > budgetLimit;
  const isNear = !isOver && pct >= 75;

  const barColor = isOver ? 'var(--rose)' : isNear ? 'var(--amber)' : 'var(--teal)';
  const statusBg = isOver ? 'var(--rose-light)' : isNear ? 'var(--amber-light)' : 'var(--teal-light)';
  const statusColor = isOver ? 'var(--rose)' : isNear ? 'var(--amber)' : 'var(--teal)';

  if (budgetLimit === null || editing) {
    return (
      <div
        className="rounded-xl p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--indigo-light)' }}
          >
            <Target size={14} style={{ color: 'var(--indigo)' }} />
          </div>
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
          >
            Budget Limit
          </h2>
        </div>

        <div className="flex items-center gap-3 max-w-sm">
          <div className="relative flex-1">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}
            >
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              min="0.01"
              step="0.01"
              autoFocus
              className="w-full pl-7 pr-3 py-2.5 rounded-xl field-input"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!inputValue || parseFloat(inputValue) <= 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'var(--indigo)' }}
          >
            <Check size={15} />
            Set Limit
          </button>
          {budgetLimit !== null && (
            <button
              onClick={() => { setInputValue(String(budgetLimit)); setEditing(false); }}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--ink-3)' }}
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  const remaining = budgetLimit - expenses;

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--indigo-light)' }}
          >
            <Target size={14} style={{ color: 'var(--indigo)' }} />
          </div>
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
          >
            Budget Limit
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setInputValue(String(budgetLimit)); setEditing(true); }}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-2)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-alt)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-3)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            aria-label="Edit budget"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleRemove}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--rose)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-light)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-3)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            aria-label="Remove budget"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--ink-3)' }}>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(expenses)} spent</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(budgetLimit)} limit</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--ink-3)' }}>
            {pct.toFixed(0)}% of budget used
          </p>
        </div>

        <div
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: statusBg, color: statusColor }}
        >
          {isOver && <AlertTriangle size={14} />}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
            {isOver
              ? `${formatCurrency(Math.abs(remaining))} over budget`
              : `${formatCurrency(remaining)} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}
