import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-medium rounded-xl',
      'transition-all duration-300 ease-out',
      'transform-gpu',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'relative isolate overflow-hidden',
      'group',
      'backdrop-blur-xl',
      fullWidth && 'w-full'
    );

    const variantClasses = {
      primary: cn(
        'bg-gradient-to-b from-blue-500 to-blue-600 text-white',
        'hover:from-blue-400 hover:to-blue-500',
        'active:from-blue-600 active:to-blue-700',
        'shadow-[0_4px_14px_0_rgb(59,130,246,0.5)]',
        'hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]',
        'hover:scale-[1.02]',
        'active:scale-[0.98]',
        'border border-blue-400/20',
        'focus-visible:ring-blue-500'
      ),
      secondary: cn(
        'bg-white/10 text-gray-100',
        'hover:bg-white/15',
        'active:bg-white/20',
        'border border-white/20',
        'shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
        'hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        'backdrop-blur-md',
        'focus-visible:ring-white/50'
      ),
      ghost: cn(
        'bg-transparent text-gray-300',
        'hover:bg-white/5 hover:text-white',
        'active:bg-white/10',
        'border border-transparent',
        'hover:border-white/10',
        'focus-visible:ring-white/30'
      ),
      danger: cn(
        'bg-gradient-to-b from-red-500/90 to-red-600/90 text-white',
        'hover:from-red-400/90 hover:to-red-500/90',
        'active:from-red-600/90 active:to-red-700/90',
        'border border-red-400/30',
        'shadow-[0_4px_14px_rgba(239,68,68,0.4)]',
        'hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)]',
        'focus-visible:ring-red-500'
      ),
      success: cn(
        'bg-gradient-to-b from-green-500/90 to-green-600/90 text-white',
        'hover:from-green-400/90 hover:to-green-500/90',
        'active:from-green-600/90 active:to-green-700/90',
        'border border-green-400/30',
        'shadow-[0_4px_14px_rgba(34,197,94,0.4)]',
        'hover:shadow-[0_6px_20px_rgba(34,197,94,0.5)]',
        'focus-visible:ring-green-500'
      ),
    };

    const sizeClasses = {
      xs: 'h-7 px-3 text-xs gap-1.5 rounded-lg',
      sm: 'h-9 px-4 text-sm gap-2',
      md: 'h-10 px-5 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children && <span className="relative z-10">{children}</span>}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';