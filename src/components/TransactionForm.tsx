import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
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
  }, [type]);

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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              type === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              type === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            Income
          </button>
        </div>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <PlusCircle size={16} />
          Add Transaction
        </button>
      </form>
    </div>
  );
}
