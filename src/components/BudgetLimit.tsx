import { useState } from 'react';
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

  const barColor = isOver ? 'bg-red-500' : isNear ? 'bg-amber-400' : 'bg-green-500';
  const statusColor = isOver ? 'text-red-600' : isNear ? 'text-amber-600' : 'text-green-600';

  if (budgetLimit === null || editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-violet-50 rounded-xl">
            <Target size={20} className="text-violet-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800">Budget Limit</h2>
        </div>

        <div className="flex items-center gap-3 max-w-sm">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              min="0.01"
              step="0.01"
              autoFocus
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!inputValue || parseFloat(inputValue) <= 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Check size={15} />
            Set Limit
          </button>
          {budgetLimit !== null && (
            <button
              onClick={() => { setInputValue(String(budgetLimit)); setEditing(false); }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-50 rounded-xl">
            <Target size={20} className="text-violet-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800">Budget Limit</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setInputValue(String(budgetLimit)); setEditing(true); }}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Edit budget"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleRemove}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            aria-label="Remove budget"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>{formatCurrency(expenses)} spent</span>
            <span>{formatCurrency(budgetLimit)} limit</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{pct.toFixed(0)}% of budget used</p>
        </div>

        <div className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
          isOver ? 'bg-red-50 text-red-600' : isNear ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
        }`}>
          {isOver && <AlertTriangle size={15} />}
          <span className={statusColor}>
            {isOver
              ? `${formatCurrency(Math.abs(remaining))} over budget`
              : `${formatCurrency(remaining)} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}
