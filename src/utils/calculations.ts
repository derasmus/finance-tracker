import type { Transaction, ChartDatum, Category } from '../types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from './constants';

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getCategoryBreakdown(transactions: Transaction[]): ChartDatum[] {
  const totals = transactions
    .filter((t) => t.type === 'expense')
    .reduce<Partial<Record<Category, number>>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});

  return (Object.entries(totals) as [Category, number][])
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([category, value]) => ({
      name: CATEGORY_LABELS[category],
      value,
      color: CATEGORY_COLORS[category],
    }));
}
