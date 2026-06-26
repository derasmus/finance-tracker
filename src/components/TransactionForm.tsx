import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Category, TransactionType } from '../types';
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_LABELS,
} from '../utils/constants';
import { useTransactions } from '../context/TransactionContext';

export function TransactionForm() {
  const { dispatch } = useTransactions();

  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    setCategory(categories[0]);
  }, [type, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0 || !date) return;

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: crypto.randomUUID(),
        type,
        amount: parsedAmount,
        category,
        description: description.trim(),
        date,
        createdAt: Date.now(),
      },
    });

    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    setCategory(categories[0]);
  };

  const activeColor = type === 'expense' ? 'var(--rose)' : 'var(--teal)';
  const activeShadow =
    type === 'expense'
      ? '0 1px 4px rgba(220,38,38,0.25)'
      : '0 1px 4px rgba(13,148,136,0.25)';

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h2
        className="text-sm font-semibold uppercase mb-5"
        style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}
      >
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Type toggle */}
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}
        >
          <button
            type="button"
            onClick={() => setType('expense')}
            className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all"
            style={
              type === 'expense'
                ? { background: activeColor, color: 'white', boxShadow: activeShadow }
                : { background: 'transparent', color: 'var(--ink-2)' }
            }
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all"
            style={
              type === 'income'
                ? { background: activeColor, color: 'white', boxShadow: activeShadow }
                : { background: 'transparent', color: 'var(--ink-2)' }
            }
          >
            Income
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="txn-description"
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.07em' }}
          >
            Description
          </label>
          <input
            id="txn-description"
            type="text"
            placeholder="e.g. Grocery shopping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-xl field-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="txn-amount"
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.07em' }}
          >
            Amount
          </label>
          <input
            id="txn-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
            className="w-full px-3 py-2.5 rounded-xl field-input"
            style={{ fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="txn-category"
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.07em' }}
          >
            Category
          </label>
          <select
            id="txn-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2.5 rounded-xl field-input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="txn-date"
            className="text-xs font-semibold uppercase"
            style={{ color: 'var(--ink-2)', letterSpacing: '0.07em' }}
          >
            Date
          </label>
          <input
            id="txn-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-xl field-input"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 mt-1"
          style={{ background: 'var(--indigo)' }}
        >
          <Plus size={16} />
          Record Transaction
        </button>
      </form>
    </div>
  );
}
