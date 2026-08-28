import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  options?: SelectOption[];
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      leadingIcon,
      options,
      fullWidth = true,
      id,
      className = '',
      disabled = false,
      required = false,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} space-y-1.5`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            {label}
            {required && <span className="text-travelio-gold-600 ml-1">*</span>}
          </label>
        )}

        <div className="relative rounded-xl">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              {leadingIcon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              block w-full rounded-xl text-sm transition-all duration-200 appearance-none
              ${leadingIcon ? 'pl-10' : 'pl-3.5'}
              pr-10 py-2.5 bg-white text-zinc-900
              border
              ${
                error
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
              }
              focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer
              ${className}
            `.trim()}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error ? (
          <p id={errorId} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-zinc-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
