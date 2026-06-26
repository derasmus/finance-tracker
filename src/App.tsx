import { TransactionProvider } from './context/TransactionContext';
import { Dashboard } from './components/Dashboard';
import { BudgetLimit } from './components/BudgetLimit';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { SpendingChart } from './components/SpendingChart';

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white px-6 py-4 shadow">
          <h1 className="text-xl font-bold tracking-tight">Finance Tracker</h1>
        </header>

        <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Dashboard />
          </div>

          <BudgetLimit />

          <TransactionForm />
          <SpendingChart />

          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </main>
      </div>
    </TransactionProvider>
  );
}

export default App;
