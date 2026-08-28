import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastContainer } from '@/components/common/Toast';
import { ToastMessage } from '@/types';

describe('Toast & ToastContainer Components', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const sampleSuccessToast: ToastMessage = {
    id: 't-1',
    type: 'success',
    title: 'Inquiry Confirmed',
    message: 'Your inquiry has been successfully transmitted.',
    duration: 3000,
  };

  const sampleErrorToast: ToastMessage = {
    id: 't-2',
    type: 'error',
    title: 'Submission Failed',
    message: 'Unable to connect to server. Please try again.',
    duration: 3000,
  };

  it('renders success toast with title and message', () => {
    render(<Toast toast={sampleSuccessToast} onDismiss={vi.fn()} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Inquiry Confirmed')).toBeInTheDocument();
    expect(
      screen.getByText('Your inquiry has been successfully transmitted.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('toast-success')).toBeInTheDocument();
  });

  it('renders error toast with error styling', () => {
    render(<Toast toast={sampleErrorToast} onDismiss={vi.fn()} />);

    expect(screen.getByTestId('toast-error')).toBeInTheDocument();
    expect(screen.getByText('Submission Failed')).toBeInTheDocument();
    expect(
      screen.getByText('Unable to connect to server. Please try again.')
    ).toBeInTheDocument();
  });

  it('triggers onDismiss when close button is clicked', async () => {
    vi.useRealTimers(); // User event works best with real timers
    const handleDismiss = vi.fn();
    render(<Toast toast={sampleSuccessToast} onDismiss={handleDismiss} />);

    const closeBtn = screen.getByRole('button', { name: /dismiss notification/i });
    await userEvent.click(closeBtn);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(handleDismiss).toHaveBeenCalledWith('t-1');
  });

  it('auto-dismisses after duration has elapsed', () => {
    const handleDismiss = vi.fn();
    render(<Toast toast={sampleSuccessToast} onDismiss={handleDismiss} />);

    expect(handleDismiss).not.toHaveBeenCalled();

    // Fast-forward time past 3000ms
    act(() => {
      vi.advanceTimersByTime(3100);
    });

    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(handleDismiss).toHaveBeenCalledWith('t-1');
  });

  it('renders multiple toasts in ToastContainer', () => {
    const toasts: ToastMessage[] = [
      sampleSuccessToast,
      sampleErrorToast,
      {
        id: 't-3',
        type: 'info',
        title: 'New Feature',
        message: 'Explore the 2026 luxury collection.',
      },
    ];

    render(<ToastContainer toasts={toasts} onDismiss={vi.fn()} />);

    expect(screen.getByText('Inquiry Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Submission Failed')).toBeInTheDocument();
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('returns null when ToastContainer has empty toasts array', () => {
    const { container } = render(
      <ToastContainer toasts={[]} onDismiss={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });
});
