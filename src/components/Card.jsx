import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const Card = forwardRef(
  ({ variant = 'default', padding = 'md', hoverable = false, children, className, onClick, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const variantClasses = {
      default: cn(
        'bg-gradient-to-br from-gray-800/50 to-gray-900/50',
        'backdrop-blur-2xl',
        'border border-gray-700/50',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        'relative overflow-hidden'
      ),
      elevated: cn(
        'bg-gradient-to-br from-gray-800/70 to-gray-900/70',
        'border border-gray-600/50',
        'shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
        'backdrop-blur-2xl',
        'relative overflow-hidden'
      ),
      outlined: cn(
        'bg-gray-900/20',
        'border-2 border-gray-700/50',
        'backdrop-blur-lg',
        'hover:border-blue-500/50'
      ),
      ghost: cn(
        'bg-transparent',
        'border border-transparent',
        'hover:bg-gray-800/30',
        'hover:backdrop-blur-lg'
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl relative',
          'transition-all duration-300 ease-out',
          paddingClasses[padding],
          variantClasses[variant],
          hoverable && cn(
            'cursor-pointer',
            'hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]',
            'hover:border-gray-600/70',
            'hover:transform hover:scale-[1.02]',
            'hover:-translate-y-1',
            'active:scale-[0.98]'
          ),
          'group',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Glassmorphism effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
        
        {/* Shimmer effect on hover */}
        {hoverable && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';