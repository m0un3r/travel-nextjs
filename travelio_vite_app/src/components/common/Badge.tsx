import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'gold'
  | 'dark'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline'
  | 'cities'
  | 'nature'
  | 'adventure'
  | 'honeymoon'
  | 'wildlife';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-zinc-100 text-zinc-800 border-zinc-200/80',
  gold: 'bg-travelio-gold-50 text-travelio-gold-800 border-travelio-gold-200',
  dark: 'bg-travelio-dark-900 text-white border-white/10',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  outline: 'bg-transparent text-zinc-700 border-zinc-300',
  cities: 'bg-blue-50 text-blue-800 border-blue-200',
  nature: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  adventure: 'bg-amber-50 text-amber-800 border-amber-200',
  honeymoon: 'bg-rose-50 text-rose-800 border-rose-200',
  wildlife: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3.5 py-1.5 text-sm gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border tracking-wide transition-colors
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.trim()}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
