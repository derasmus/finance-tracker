import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12" style={{ color: 'var(--ink-3)' }}>
      <PackageOpen size={40} strokeWidth={1.5} />
      <p className="mt-3 text-sm" style={{ color: 'var(--ink-3)' }}>
        {message}
      </p>
    </div>
  );
}
