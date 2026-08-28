import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingModal } from '@/components/Modal/BookingModal';
import { BookingForm } from '@/components/Modal/BookingForm';
import { BookingSuccess } from '@/components/Modal/BookingSuccess';
import { tours } from '@/data/travelioData';
import { Tour, BookingInquiry } from '@/types';

describe('BookingModal & BookingForm Components', () => {
  const mockTour: Tour = tours[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render modal when isOpen is false', () => {
    render(
      <BookingModal
        isOpen={false}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog and all key inquiry fields when isOpen is true', () => {
    render(
      <BookingModal
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Dialog presence
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Plan Your Dream Journey')).toBeInTheDocument();

    // Form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/travel style \/ category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred travel date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trip duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget \/ person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();

    // Action buttons
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit inquiry/i })).toBeInTheDocument();
  });

  it('prefills destination, category, and shows tour banner when prefilledTour is provided', () => {
    render(
      <BookingModal
        isOpen={true}
        prefilledTour={mockTour}
        onClose={vi.fn()}
      />
    );

    // Prefilled tour banner
    expect(screen.getByText('Selected Itinerary')).toBeInTheDocument();
    expect(screen.getAllByText(mockTour.title).length).toBeGreaterThan(0);
    expect(screen.getByText(mockTour.duration)).toBeInTheDocument();
  });

  it('displays real-time inline validation errors when submitting empty form', async () => {
    render(
      <BookingModal
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit inquiry/i });
    await userEvent.click(submitButton);

    // Name error
    expect(
      screen.getByText(/full name is required/i)
    ).toBeInTheDocument();

    // Email error
    expect(
      screen.getByText(/email address is required/i)
    ).toBeInTheDocument();

    // Date error
    expect(
      screen.getByText(/please select your preferred travel date/i)
    ).toBeInTheDocument();
  });

  it('validates invalid email formats correctly', async () => {
    render(
      <BookingModal
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const emailInput = screen.getByLabelText(/email address/i);
    await userEvent.type(emailInput, 'invalid-email-address');

    const submitButton = screen.getByRole('button', { name: /submit inquiry/i });
    await userEvent.click(submitButton);

    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it('handles guest count increment and decrement with boundary limits', async () => {
    render(
      <BookingModal
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;
    expect(guestsInput.value).toBe('2');

    const incrementButton = screen.getByRole('button', { name: /increase guest count/i });
    const decrementButton = screen.getByRole('button', { name: /decrease guest count/i });

    // Increment
    await userEvent.click(incrementButton);
    expect(guestsInput.value).toBe('3');

    // Decrement twice
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);
    expect(guestsInput.value).toBe('1');

    // Should be disabled at minimum 1
    expect(decrementButton).toBeDisabled();
  });

  it('submits valid form, shows loading state, and transitions to BookingSuccess confirmation', async () => {
    const handleSuccess = vi.fn();
    render(
      <BookingModal
        isOpen={true}
        prefilledTour={mockTour}
        onSuccess={handleSuccess}
        onClose={vi.fn()}
      />
    );

    // Fill out form
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const dateInput = screen.getByLabelText(/preferred travel date/i);

    await userEvent.type(nameInput, 'Lady Genevieve');
    await userEvent.type(emailInput, 'genevieve@luxurytravel.com');
    fireEvent.change(dateInput, { target: { value: '2026-10-15' } });

    const submitButton = screen.getByRole('button', { name: /submit inquiry/i });
    await userEvent.click(submitButton);

    // Wait for submission and confirmation screen
    await waitFor(
      () => {
        expect(screen.getByText(/your journey awaits/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check confirmation screen elements
    expect(screen.getByText('Inquiry Confirmed')).toBeInTheDocument();
    expect(screen.getByText(/TRV-2026-/i)).toBeInTheDocument();
    expect(screen.getByText(/Lady Genevieve/i)).toBeInTheDocument();
    expect(screen.getByText(/genevieve@luxurytravel.com/i)).toBeInTheDocument();
    expect(screen.getByText(/2026-10-15/i)).toBeInTheDocument();
    expect(screen.getByText(/What Happens Next\?/i)).toBeInTheDocument();
    expect(screen.getByText(/24 hours/i)).toBeInTheDocument();

    // Verify callback was called with valid inquiry object
    expect(handleSuccess).toHaveBeenCalledTimes(1);
    const passedInquiry: BookingInquiry = handleSuccess.mock.calls[0][0];
    expect(passedInquiry.formData.fullName).toBe('Lady Genevieve');
    expect(passedInquiry.formData.email).toBe('genevieve@luxurytravel.com');
    expect(passedInquiry.referenceNumber).toMatch(/^TRV-2026-\d{4}$/);
  });

  it('allows copying booking reference ID to clipboard', async () => {
    const mockInquiry: BookingInquiry = {
      id: 'inq-123',
      referenceNumber: 'TRV-2026-8888',
      formData: {
        fullName: 'Alexander Wright',
        email: 'alex@example.com',
        phone: '+1 555-0199',
        destination: 'Morocco',
        category: 'Adventure',
        travelDate: '2026-11-01',
        duration: '6-8 Days',
        guests: 2,
        budget: '$5,000 - $7,500',
        specialRequests: 'Sahara luxury camp sunset trek',
      },
      submittedAt: new Date().toISOString(),
      status: 'received',
    };

    // Mock clipboard writeText
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <BookingSuccess
        inquiry={mockInquiry}
        onClose={vi.fn()}
      />
    );

    const copyBtn = screen.getByRole('button', { name: /copy booking reference number/i });
    await userEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('TRV-2026-8888');
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('triggers onClose when clicking Cancel button or Close button (X)', async () => {
    const handleClose = vi.fn();
    render(
      <BookingModal
        isOpen={true}
        onClose={handleClose}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    const closeDialogButton = screen.getByRole('button', { name: /close dialog/i });
    await userEvent.click(closeDialogButton);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('triggers onClose when pressing Escape key', () => {
    const handleClose = vi.fn();
    render(
      <BookingModal
        isOpen={true}
        onClose={handleClose}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when clicking the modal backdrop overlay', async () => {
    const handleClose = vi.fn();
    render(
      <BookingModal
        isOpen={true}
        onClose={handleClose}
      />
    );

    const backdrop = screen.getByTestId('booking-modal-overlay');
    await userEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders BookingForm directly and handles cancel action', async () => {
    const handleCancel = vi.fn();
    render(
      <BookingForm
        onSubmitSuccess={vi.fn()}
        onCancel={handleCancel}
      />
    );

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});

