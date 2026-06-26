import type { Category } from '../types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../utils/constants';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md"
      style={{
        color,
        background: `${color}18`,
      }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
