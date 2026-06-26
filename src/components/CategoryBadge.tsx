import type { Category } from '../types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../utils/constants';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
      style={{ backgroundColor: CATEGORY_COLORS[category] }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
