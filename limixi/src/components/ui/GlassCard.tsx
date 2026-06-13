'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'light' | 'darker';
}

export default function GlassCard({ children, className, hover = true, onClick, variant = 'light' }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        variant === 'light' ? 'glass-blue' : 'glass-blue-darker',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        hover && 'hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
