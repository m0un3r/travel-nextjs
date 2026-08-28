import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      fullWidth = true,
      id,
      className = '',
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} space-y-1.5`}>
        {label && (
          <label
            htmlFor={inputId}
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

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              block w-full rounded-xl text-sm transition-all duration-200
              ${leadingIcon ? 'pl-10' : 'pl-3.5'}
              ${trailingIcon ? 'pr-10' : 'pr-3.5'}
              py-2.5 bg-white text-zinc-900 placeholder:text-zinc-400
              border
              ${
                error
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
              }
              focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed
              ${className}
            `.trim()}
            {...props}
          />

          {trailingIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400">
              {trailingIcon}
            </div>
          )}
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

Input.displayName = 'Input';

export default Input;
