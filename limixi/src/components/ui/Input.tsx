'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-white/70 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300',
              'focus:border-[#FF6A00]/50 focus:shadow-[0_0_15px_rgba(255,106,0,0.1)] focus:bg-white/[0.06]',
              icon && 'pl-12',
              error && 'border-red-500/50 focus:border-red-500/50',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
