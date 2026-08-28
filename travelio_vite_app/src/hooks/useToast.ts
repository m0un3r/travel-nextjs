import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '@/types';

export interface UseToastReturn {
  toasts: ToastMessage[];
  showToast: (
    type: ToastType,
    message: string,
    duration?: number,
    title?: string
  ) => string;
  success: (message: string, duration?: number, title?: string) => string;
  error: (message: string, duration?: number, title?: string) => string;
  info: (message: string, duration?: number, title?: string) => string;
  warning: (message: string, duration?: number, title?: string) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (
      type: ToastType,
      message: string,
      duration = 4000,
      title?: string
    ): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastMessage = {
        id,
        type,
        message,
        duration,
        title,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const success = useCallback(
    (message: string, duration?: number, title?: string) =>
      showToast('success', message, duration, title || 'Success'),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number, title?: string) =>
      showToast('error', message, duration, title || 'Error'),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number, title?: string) =>
      showToast('info', message, duration, title || 'Information'),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number, title?: string) =>
      showToast('warning', message, duration, title || 'Notice'),
    [showToast]
  );

  return {
    toasts,
    showToast,
    success,
    error,
    info,
    warning,
    removeToast,
    clearToasts,
  };
};

export default useToast;
