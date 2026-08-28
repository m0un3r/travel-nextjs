import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-travelio-dark-900 text-white hover:bg-travelio-dark-800 active:bg-travelio-dark-950 focus-visible:ring-travelio-dark-900 border border-transparent shadow-sm',
  gold:
    'bg-travelio-gold-500 text-white hover:bg-travelio-gold-600 active:bg-travelio-gold-700 focus-visible:ring-travelio-gold-500 shadow-gold-glow border border-transparent font-semibold',
  secondary:
    'bg-travelio-sand-200 text-travelio-dark-900 hover:bg-travelio-sand-300 active:bg-travelio-sand-400 focus-visible:ring-travelio-dark-700 border border-transparent',
  outline:
    'bg-transparent text-travelio-dark-900 border border-zinc-300 hover:bg-zinc-100/80 active:bg-zinc-200 focus-visible:ring-travelio-dark-900',
  ghost:
    'bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-travelio-dark-900 active:bg-zinc-200 focus-visible:ring-zinc-500 border border-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600 border border-transparent shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
