import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    error: 'bg-red-500/15 text-red-400 border-red-500/25',
    info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    neutral: 'bg-white/10 text-white/60 border-white/10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
