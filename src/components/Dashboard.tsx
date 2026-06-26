import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { getTotalIncome, getTotalExpenses, getBalance } from '../utils/calculations';
import { formatCurrency } from '../utils/constants';

export function Dashboard() {
  const { state } = useTransactions();
  const income = getTotalIncome(state.transactions);
  const expenses = getTotalExpenses(state.transactions);
  const balance = getBalance(state.transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-50 rounded-xl">
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-500">Total Income</span>
        </div>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(income)}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-50 rounded-xl">
            <TrendingDown size={20} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-gray-500">Total Expenses</span>
        </div>
        <p className="text-2xl font-bold text-red-500">{formatCurrency(expenses)}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-xl ${balance >= 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
            <Wallet size={20} className={balance >= 0 ? 'text-blue-600' : 'text-red-500'} />
          </div>
          <span className="text-sm font-medium text-gray-500">Balance</span>
        </div>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
