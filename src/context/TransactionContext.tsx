import { createContext, useContext, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Action } from '../types';
import { STORAGE_KEY, BUDGET_STORAGE_KEY } from '../utils/constants';

function transactionReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case 'LOAD_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_BUDGET':
      return { ...state, budgetLimit: action.payload };
    default:
      return state;
  }
}

function loadInitialState(): AppState {
  let transactions: AppState['transactions'] = [];
  let budgetLimit: AppState['budgetLimit'] = null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) transactions = JSON.parse(raw);
  } catch { /* ignore */ }

  try {
    const rawBudget = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (rawBudget !== null && rawBudget !== 'null') {
      budgetLimit = JSON.parse(rawBudget);
    }
  } catch { /* ignore */ }

  return { transactions, budgetLimit };
}

interface TransactionContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transactionReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    if (state.budgetLimit === null) {
      localStorage.removeItem(BUDGET_STORAGE_KEY);
    } else {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(state.budgetLimit));
    }
  }, [state.budgetLimit]);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions(): TransactionContextValue {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactions must be used within TransactionProvider');
  return ctx;
}
