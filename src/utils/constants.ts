import { Category } from '../types';

export const STORAGE_KEY = 'finance-tracker-transactions';
export const BUDGET_STORAGE_KEY = 'finance-tracker-budget';

export const INCOME_CATEGORIES: Category[] = [
  Category.Salary,
  Category.Freelance,
  Category.Other,
];

export const EXPENSE_CATEGORIES: Category[] = [
  Category.Food,
  Category.Rent,
  Category.Transport,
  Category.Entertainment,
  Category.Healthcare,
  Category.Shopping,
  Category.Utilities,
  Category.Other,
];

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.Food]: '#f97316',
  [Category.Rent]: '#8b5cf6',
  [Category.Transport]: '#3b82f6',
  [Category.Entertainment]: '#ec4899',
  [Category.Healthcare]: '#14b8a6',
  [Category.Shopping]: '#f59e0b',
  [Category.Utilities]: '#6b7280',
  [Category.Salary]: '#22c55e',
  [Category.Freelance]: '#84cc16',
  [Category.Other]: '#94a3b8',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.Food]: 'Food',
  [Category.Rent]: 'Rent',
  [Category.Transport]: 'Transport',
  [Category.Entertainment]: 'Entertainment',
  [Category.Healthcare]: 'Healthcare',
  [Category.Shopping]: 'Shopping',
  [Category.Utilities]: 'Utilities',
  [Category.Salary]: 'Salary',
  [Category.Freelance]: 'Freelance',
  [Category.Other]: 'Other',
};

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
