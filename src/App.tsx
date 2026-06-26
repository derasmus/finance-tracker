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
        <header style={{ background: 'var(--header)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--indigo)' }}
              >
                <Wallet size={17} color="#06070F" />
              </div>
              <div>
                <h1
                  className="font-bold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
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

        <div className="relative w-full overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/image_20260626_142941_standard.jpg"
            alt="Team working in a modern office"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ background: 'linear-gradient(to bottom, rgba(6,7,15,0.45) 0%, rgba(6,7,15,0.65) 100%)' }}
          >
            <h2
              className="text-white font-bold mb-3"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              Take control of your finances
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Track income, manage expenses, and stay on top of your budget — all in one place.
            </p>
          </div>
        </div>

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
