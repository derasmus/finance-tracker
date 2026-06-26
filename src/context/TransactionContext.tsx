import { createContext, useContext, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Action, Transaction } from '../types';
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

interface TransactionContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: [],
    budgetLimit: null,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Transaction[] = JSON.parse(raw);
        dispatch({ type: 'LOAD_TRANSACTIONS', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }

    try {
      const rawBudget = localStorage.getItem(BUDGET_STORAGE_KEY);
      if (rawBudget !== null) {
        const parsed = JSON.parse(rawBudget) as number | null;
        dispatch({ type: 'SET_BUDGET', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(state.budgetLimit));
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
