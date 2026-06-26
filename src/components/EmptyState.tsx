import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <PackageOpen size={48} strokeWidth={1.5} />
      <p className="mt-3 text-sm">{message}</p>
    </div>
  );
}
