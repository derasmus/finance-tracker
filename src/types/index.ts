export type TransactionType = 'income' | 'expense';

export const Category = {
  Food: 'food',
  Rent: 'rent',
  Transport: 'transport',
  Entertainment: 'entertainment',
  Healthcare: 'healthcare',
  Shopping: 'shopping',
  Utilities: 'utilities',
  Salary: 'salary',
  Freelance: 'freelance',
  Other: 'other',
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: number;
}

export interface AppState {
  transactions: Transaction[];
  budgetLimit: number | null;
}

export type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'LOAD_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_BUDGET'; payload: number | null };

export interface ChartDatum {
  name: string;
  value: number;
  color: string;
}
