'use client';

import { cn } from '@/lib/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  className,
  ...props
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#007AFF] text-white shadow-[0_4px_14px_0_rgba(0,122,255,0.39)] hover:bg-[#006ee6] hover:shadow-[0_6px_20px_rgba(0,122,255,0.23)] hover:-translate-y-0.5 active:scale-[0.98]',
    outline: 'bg-transparent border border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/10 active:scale-[0.98]',
    ghost: 'bg-transparent text-[#007AFF] hover:bg-[#007AFF]/10 active:scale-[0.98]',
    danger: 'bg-[#FF3B30] text-white shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] hover:bg-[#e0352b] hover:-translate-y-0.5 active:scale-[0.98]',
    glass: 'glass-blue font-semibold text-[#007AFF] hover:bg-white/70 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
