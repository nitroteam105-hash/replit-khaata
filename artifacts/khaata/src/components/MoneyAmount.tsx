import { cn } from '@/lib/utils';

export function MoneyAmount({ amount, className }: { amount: number, className?: string }) {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

  return <span className={cn("font-display tabular-nums", className)}>{formatted}</span>;
}