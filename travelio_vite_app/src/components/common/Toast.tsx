import React, { useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { ToastMessage, ToastType } from '@/types';

export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const { id, type, title, message, duration = 4000 } = toast;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const config: Record<
    ToastType,
    {
      icon: React.ReactNode;
      containerStyle: string;
      iconStyle: string;
      titleColor: string;
    }
  > = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      containerStyle: 'bg-emerald-950/95 border-emerald-500/30 text-emerald-100 shadow-emerald-900/20',
      iconStyle: 'text-emerald-400 bg-emerald-900/50',
      titleColor: 'text-emerald-300',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5" />,
      containerStyle: 'bg-rose-950/95 border-rose-500/30 text-rose-100 shadow-rose-900/20',
      iconStyle: 'text-rose-400 bg-rose-900/50',
      titleColor: 'text-rose-300',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      containerStyle: 'bg-amber-950/95 border-amber-500/30 text-amber-100 shadow-amber-900/20',
      iconStyle: 'text-amber-400 bg-amber-900/50',
      titleColor: 'text-amber-300',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      containerStyle: 'bg-zinc-900/95 border-travelio-gold-500/30 text-zinc-100 shadow-black/40',
      iconStyle: 'text-travelio-gold-400 bg-travelio-gold-950/50',
      titleColor: 'text-travelio-gold-300',
    },
  };

  const currentConfig = config[type] || config.info;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-testid={`toast-${type}`}
      className={`
        pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl
        transition-all duration-300 transform translate-y-0 opacity-100
        hover:scale-[1.01] max-w-sm sm:max-w-md w-full
        ${currentConfig.containerStyle}
      `}
    >
      <div className={`p-2 rounded-xl shrink-0 ${currentConfig.iconStyle}`}>
        {currentConfig.icon}
      </div>

      <div className="flex-1 min-w-0 pt-0.5 space-y-0.5">
        {title && (
          <h4 className={`text-xs font-semibold uppercase tracking-wider ${currentConfig.titleColor}`}>
            {title}
          </h4>
        )}
        <p className="text-xs sm:text-sm font-medium leading-snug break-words text-zinc-200">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="shrink-0 p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-left';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'bottom-right',
}) => {
  if (toasts.length === 0) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 sm:top-6',
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  };

  return (
    <aside
      aria-label="Notifications"
      className={`
        fixed z-50 pointer-events-none flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0
        ${positionClasses[position]}
      `}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </aside>
  );
};

export default Toast;
