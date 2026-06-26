import { Wallet } from 'lucide-react';
import { TransactionProvider } from './context/TransactionContext';
import { Dashboard } from './components/Dashboard';
import { BudgetLimit } from './components/BudgetLimit';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { SpendingChart } from './components/SpendingChart';
import { HeaderBalance } from './components/HeaderBalance';

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <header style={{ background: 'var(--header)' }}>
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--indigo)' }}
              >
                <Wallet size={17} color="white" />
              </div>
              <div>
                <h1
                  className="font-semibold leading-tight tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Finance Tracker
                </h1>
                <p className="text-xs mt-px" style={{ color: 'var(--ink-2)' }}>
                  Personal budget
                </p>
              </div>
            </div>
            <HeaderBalance />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-7 flex flex-col gap-5">
          <Dashboard />
          <BudgetLimit />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <TransactionForm />
            <SpendingChart />
          </div>
          <TransactionList />
        </main>
      </div>
    </TransactionProvider>
  );
}

export default App;
