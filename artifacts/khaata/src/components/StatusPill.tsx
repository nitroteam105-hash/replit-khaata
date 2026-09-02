import { cn } from '@/lib/utils';

type StatusType = 'Active' | 'Overdue' | 'Expiring' | 'Pending' | 'New';

export function StatusPill({ status }: { status: StatusType | string }) {
  const variants: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800',
    'Expiring': 'bg-amber-100 text-amber-800',
    'Pending': 'bg-blue-100 text-blue-800',
    'New': 'bg-purple-100 text-purple-800',
  };

  const className = variants[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", className)}>
      {status}
    </span>
  );
}