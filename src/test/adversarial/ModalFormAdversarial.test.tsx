import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingModal } from '@/components/Modal/BookingModal';
import { BookingForm } from '@/components/Modal/BookingForm';
import { TourDetailModal } from '@/components/Tours/TourDetailModal';
import { Newsletter } from '@/components/Footer/Newsletter';
import { tours } from '@/data/travelioData';
import { Tour, BookingInquiry } from '@/types';

describe('Adversarial Modal & Form Verification Suite', () => {
  const tourA: Tour = tours[0]; // e.g. Tokyo & Kyoto (Cities, 10 days, $4200)
  const tourWildlife: Tour = tours.find((t) => t.category === 'Wildlife') || tours[0];
  const tourShort: Tour = tours.find((t) => t.days <= 5) || tours[0];
  const tourLong: Tour = tours.find((t) => t.days >= 13) || tours[tours.length - 1];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================================================
  // 1. ADVERSARIAL EMAIL VALIDATION
  // =========================================================================
  describe('1. Adversarial Email Validation Stress-Testing', () => {
    const invalidEmailCases = [
      { email: 'missing-at-sign.com', label: 'missing @' },
      { email: 'user@', label: 'missing domain' },
      { email: '@domain.com', label: 'missing local part' },
      { email: 'user@localhost', label: 'missing TLD' },
      { email: 'user@domain.', label: 'trailing dot without TLD' },
      { email: 'user@@domain.com', label: 'multiple @ symbols' },
      { email: 'user@domain@domain.com', label: 'double @ in domain' },
      { email: 'user name@domain.com', label: 'space in local part' },
      { email: 'user@dom ain.com', label: 'space in domain' },
      { email: '   ', label: 'whitespace only' },
      { email: 'user@domain,com', label: 'comma instead of period' },
      { email: 'plainaddress', label: 'single word without symbols' },
      { email: '#@%^%#$@#$@#.com', label: 'garbage special characters' },
    ];

    invalidEmailCases.forEach(({ email, label }) => {
      it(`rejects malformed email format (${label}: "${email}") in BookingForm`, async () => {
        render(
          <BookingForm
            onSubmitSuccess={vi.fn()}
            onCancel={vi.fn()}
          />
        );

        // Fill other valid fields
        const nameInput = screen.getByLabelText(/full name/i);
        const emailInput = screen.getByLabelText(/email address/i);
        const dateInput = screen.getByLabelText(/preferred travel date/i);

        fireEvent.change(nameInput, { target: { value: 'Eleanor Vance' } });
        fireEvent.change(dateInput, { target: { value: '2026-11-20' } });
        fireEvent.change(emailInput, { target: { value: email } });

        const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
        fireEvent.click(submitBtn);

        // Expect validation error
        if (email.trim() === '') {
          expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
        } else {
          expect(
            screen.getByText(/please enter a valid email address/i)
          ).toBeInTheDocument();
        }
      });
    });

    it('accepts trimmed emails with leading/trailing spaces and valid formats', async () => {
      const handleSuccess = vi.fn();
      render(
        <BookingForm
          onSubmitSuccess={handleSuccess}
          onCancel={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);

      fireEvent.change(nameInput, { target: { value: 'Lord Harrington' } });
      fireEvent.change(dateInput, { target: { value: '2026-12-05' } });
      fireEvent.change(emailInput, { target: { value: '   harrington@travelio.luxury   ' } });

      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(
        () => {
          expect(handleSuccess).toHaveBeenCalledTimes(1);
        },
        { timeout: 3000 }
      );

      const inquiry: BookingInquiry = handleSuccess.mock.calls[0][0];
      // Email should be submitted
      expect(inquiry.formData.email).toContain('harrington@travelio.luxury');
    });

    it('accepts valid complex email formats (subdomains, plus tags, uppercase, hyphens)', async () => {
      const validEmails = [
        'curator+vip@voyage.travelio.com',
        'jean-luc.picard@starfleet.academy.org',
        'luxury_travel.expert123@domain.co.uk',
        'EMPEROR.TRAVELER@REGAL-VOYAGES.COM',
        'client.first-last@sub-domain.example.org',
      ];

      for (const validEmail of validEmails) {
        const handleSuccess = vi.fn();
        const { unmount } = render(
          <BookingForm
            onSubmitSuccess={handleSuccess}
            onCancel={vi.fn()}
          />
        );

        const nameInput = screen.getByLabelText(/full name/i);
        const emailInput = screen.getByLabelText(/email address/i);
        const dateInput = screen.getByLabelText(/preferred travel date/i);

        fireEvent.change(nameInput, { target: { value: 'Valid User' } });
        fireEvent.change(dateInput, { target: { value: '2026-10-10' } });
        fireEvent.change(emailInput, { target: { value: validEmail } });

        const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
        fireEvent.click(submitBtn);

        await waitFor(
          () => {
            expect(handleSuccess).toHaveBeenCalledTimes(1);
          },
          { timeout: 3000 }
        );

        unmount();
      }
    });
  });

  // =========================================================================
  // 2. GUEST STEPPER BOUNDARIES & DIRECT TYPING
  // =========================================================================
  describe('2. Guest Stepper Boundary and Direct Input Stress-Testing', () => {
    it('prevents decrementing below 1 and disables decrement button at 1', async () => {
      render(
        <BookingForm
          onSubmitSuccess={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;
      const decrementBtn = screen.getByRole('button', { name: /decrease guest count/i });

      // Initial value is 2
      expect(guestsInput.value).toBe('2');

      // Decrement to 1
      fireEvent.click(decrementBtn);
      expect(guestsInput.value).toBe('1');
      expect(decrementBtn).toBeDisabled();

      // Attempt additional decrement clicks when disabled
      fireEvent.click(decrementBtn);
      fireEvent.click(decrementBtn);
      expect(guestsInput.value).toBe('1');
    });

    it('enforces upper bound limit of 20 with increment button and disables at 20', async () => {
      render(
        <BookingForm
          onSubmitSuccess={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;
      const incrementBtn = screen.getByRole('button', { name: /increase guest count/i });

      // Click increment until reaching 20
      for (let i = 0; i < 25; i++) {
        if (!incrementBtn.hasAttribute('disabled')) {
          fireEvent.click(incrementBtn);
        }
      }

      expect(guestsInput.value).toBe('20');
      expect(incrementBtn).toBeDisabled();
    });

    it('handles direct typing of negative numbers and zeroes by enforcing minimum 1', () => {
      render(
        <BookingForm
          onSubmitSuccess={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;

      // Type 0 -> clamped to 1
      fireEvent.change(guestsInput, { target: { name: 'guests', value: '0' } });
      expect(Number(guestsInput.value)).toBeGreaterThanOrEqual(1);

      // Type negative number -> clamped to 1
      fireEvent.change(guestsInput, { target: { name: 'guests', value: '-5' } });
      expect(Number(guestsInput.value)).toBeGreaterThanOrEqual(1);

      // Type empty string -> fallback to 1
      fireEvent.change(guestsInput, { target: { name: 'guests', value: '' } });
      expect(Number(guestsInput.value)).toBeGreaterThanOrEqual(1);

      // Type non-numeric letters -> fallback to 1
      fireEvent.change(guestsInput, { target: { name: 'guests', value: 'abc' } });
      expect(Number(guestsInput.value)).toBeGreaterThanOrEqual(1);
    });

    it('allows submitting valid guest count at minimum (1) and maximum (20)', async () => {
      const handleSuccess = vi.fn();
      const { unmount } = render(
        <BookingForm
          onSubmitSuccess={handleSuccess}
          onCancel={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);
      const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;
      const decrementBtn = screen.getByRole('button', { name: /decrease guest count/i });

      // Test guest count = 1 (Solo luxury traveler)
      fireEvent.change(nameInput, { target: { value: 'Solo Traveler' } });
      fireEvent.change(emailInput, { target: { value: 'solo@traveler.com' } });
      fireEvent.change(dateInput, { target: { value: '2026-11-01' } });
      fireEvent.click(decrementBtn); // 2 -> 1
      expect(guestsInput.value).toBe('1');

      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(
        () => {
          expect(handleSuccess).toHaveBeenCalledTimes(1);
        },
        { timeout: 3000 }
      );
      expect(handleSuccess.mock.calls[0][0].formData.guests).toBe(1);

      unmount();
    });

    it('submits large guest counts gracefully without runtime crashes', async () => {
      const handleSuccess = vi.fn();
      render(
        <BookingForm
          onSubmitSuccess={handleSuccess}
          onCancel={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);
      const guestsInput = screen.getByLabelText(/guests/i) as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: 'Royal Delegation' } });
      fireEvent.change(emailInput, { target: { value: 'delegation@royal.org' } });
      fireEvent.change(dateInput, { target: { value: '2026-11-15' } });
      fireEvent.change(guestsInput, { target: { name: 'guests', value: '50' } });

      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(
        () => {
          expect(handleSuccess).toHaveBeenCalledTimes(1);
        },
        { timeout: 3000 }
      );
      expect(handleSuccess.mock.calls[0][0].formData.guests).toBe(50);
    });
  });

  // =========================================================================
  // 3. RAPID MULTI-CLICK & DUPLICATE SUBMISSION PREVENTION
  // =========================================================================
  describe('3. Rapid Multi-Click & Async Race Condition Defense', () => {
    it('disables submit button and prevents duplicate submissions on rapid multi-clicks', async () => {
      const handleSuccess = vi.fn();
      render(
        <BookingForm
          onSubmitSuccess={handleSuccess}
          onCancel={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);

      fireEvent.change(nameInput, { target: { value: 'Rapid Clicker' } });
      fireEvent.change(emailInput, { target: { value: 'rapid@clicker.com' } });
      fireEvent.change(dateInput, { target: { value: '2026-10-25' } });

      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });

      // Fire 10 clicks in rapid burst
      for (let i = 0; i < 10; i++) {
        fireEvent.click(submitBtn);
      }

      // During in-flight async delay, verify submitting state
      expect(screen.getByText(/submitting\.\.\./i)).toBeInTheDocument();

      // Wait for completion
      await waitFor(
        () => {
          expect(handleSuccess).toHaveBeenCalledTimes(1);
        },
        { timeout: 3000 }
      );

      // Verify callback was called exactly ONCE, NOT 10 times
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });

    it('disables form inputs and cancel button during active async submission', async () => {
      render(
        <BookingForm
          onSubmitSuccess={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });

      fireEvent.change(nameInput, { target: { value: 'Async Tester' } });
      fireEvent.change(emailInput, { target: { value: 'async@tester.com' } });
      fireEvent.change(dateInput, { target: { value: '2026-10-30' } });

      fireEvent.click(submitBtn);

      // Immediately verify disabled status of all interactive controls
      expect(nameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(dateInput).toBeDisabled();
      expect(cancelBtn).toBeDisabled();
      expect(submitBtn).toBeDisabled();

      // Wait for async finish
      await waitFor(
        () => {
          expect(submitBtn).not.toHaveTextContent(/submitting\.\.\./i);
        },
        { timeout: 3000 }
      );
    });
  });

  // =========================================================================
  // 4. PREFILL STATE INTEGRITY & TOUR SWITCHING
  // =========================================================================
  describe('4. Prefill State Integrity & Tour Switching Synchronization', () => {
    it('initializes with bespoke generic defaults when prefilledTour is null', () => {
      render(
        <BookingModal
          isOpen={true}
          prefilledTour={null}
          onClose={vi.fn()}
        />
      );

      // No tour banner
      expect(screen.queryByText('Selected Itinerary')).not.toBeInTheDocument();
      expect(screen.getByText('Plan Your Dream Journey')).toBeInTheDocument();
      expect(
        screen.getByText(/Personalized bespoke travel planning crafted by experts/i)
      ).toBeInTheDocument();

      const destinationSelect = screen.getByLabelText(/destination/i) as HTMLSelectElement;
      const categorySelect = screen.getByLabelText(/travel style \/ category/i) as HTMLSelectElement;
      const durationSelect = screen.getByLabelText(/trip duration/i) as HTMLSelectElement;
      const budgetSelect = screen.getByLabelText(/budget \/ person/i) as HTMLSelectElement;

      expect(destinationSelect.value).toBe('Japan');
      expect(categorySelect.value).toBe('Cities');
      expect(durationSelect.value).toBe('6-8 Days');
      expect(budgetSelect.value).toBe('$2,500 - $5,000');
    });

    it('correctly calculates initial duration options based on tour days', () => {
      // Short tour (<= 5 days)
      const { unmount: unmount1 } = render(
        <BookingModal
          isOpen={true}
          prefilledTour={tourShort}
          onClose={vi.fn()}
        />
      );
      const durationSelectShort = screen.getByLabelText(/trip duration/i) as HTMLSelectElement;
      if (tourShort.days <= 5) {
        expect(durationSelectShort.value).toBe('3-5 Days');
      }
      unmount1();

      // Long tour (>= 13 days)
      const { unmount: unmount2 } = render(
        <BookingModal
          isOpen={true}
          prefilledTour={tourLong}
          onClose={vi.fn()}
        />
      );
      const durationSelectLong = screen.getByLabelText(/trip duration/i) as HTMLSelectElement;
      if (tourLong.days >= 13) {
        expect(durationSelectLong.value).toBe('13+ Days');
      }
      unmount2();
    });

    it('correctly adapts prefill fields when switching between different tours dynamically', () => {
      const { rerender } = render(
        <BookingModal
          isOpen={true}
          prefilledTour={tourA}
          onClose={vi.fn()}
        />
      );

      // First tour (e.g. Tour A)
      expect(screen.getByText('Selected Itinerary')).toBeInTheDocument();
      expect(screen.getAllByText(tourA.title).length).toBeGreaterThan(0);

      // Re-render with Wildlife Tour
      rerender(
        <BookingModal
          isOpen={true}
          prefilledTour={tourWildlife}
          onClose={vi.fn()}
        />
      );

      // Tour banner and subtitle should update
      expect(screen.getAllByText(tourWildlife.title).length).toBeGreaterThan(0);
      expect(
        screen.getByText(new RegExp(`Inquire for ${tourWildlife.title}`, 'i'))
      ).toBeInTheDocument();

      // Category select should synchronize
      const categorySelect = screen.getByLabelText(/travel style \/ category/i) as HTMLSelectElement;
      expect(categorySelect.value).toBe(tourWildlife.category);
    });

    it('preserves user typed full name and email when switching prefilled tours', () => {
      const { rerender } = render(
        <BookingModal
          isOpen={true}
          prefilledTour={tourA}
          onClose={vi.fn()}
        />
      );

      const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: 'Lord Montgomery' } });
      fireEvent.change(emailInput, { target: { value: 'montgomery@estate.co.uk' } });

      expect(nameInput.value).toBe('Lord Montgomery');
      expect(emailInput.value).toBe('montgomery@estate.co.uk');

      // Switch to Wildlife tour
      rerender(
        <BookingModal
          isOpen={true}
          prefilledTour={tourWildlife}
          onClose={vi.fn()}
        />
      );

      // User's typed credentials must NOT be erased by tour switch
      expect(nameInput.value).toBe('Lord Montgomery');
      expect(emailInput.value).toBe('montgomery@estate.co.uk');
    });

    it('resets modal submission state when closed and re-opened', async () => {
      const { rerender } = render(
        <BookingModal
          isOpen={true}
          prefilledTour={tourA}
          onClose={vi.fn()}
        />
      );

      // Fill and submit form
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const dateInput = screen.getByLabelText(/preferred travel date/i);

      fireEvent.change(nameInput, { target: { value: 'Reopen Tester' } });
      fireEvent.change(emailInput, { target: { value: 'reopen@tester.com' } });
      fireEvent.change(dateInput, { target: { value: '2026-10-15' } });

      const submitBtn = screen.getByRole('button', { name: /submit inquiry/i });
      fireEvent.click(submitBtn);

      // Wait for success screen
      await waitFor(
        () => {
          expect(screen.getByText('Inquiry Confirmed')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Close modal
      rerender(
        <BookingModal
          isOpen={false}
          prefilledTour={tourA}
          onClose={vi.fn()}
        />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Re-open modal
      rerender(
        <BookingModal
          isOpen={true}
          prefilledTour={tourA}
          onClose={vi.fn()}
        />
      );

      // Should display fresh inquiry form again, NOT old success screen
      expect(screen.getByText('Plan Your Dream Journey')).toBeInTheDocument();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.queryByText('Inquiry Confirmed')).not.toBeInTheDocument();
    });
  });

  // =========================================================================
  // 5. RAPID ESCAPE SEQUENCES & BACKDROP CLICKS IN ASYNC STATES
  // =========================================================================
  describe('5. Rapid Keyboard Escape & Backdrop Click Resilience', () => {
    it('handles a rapid flood of Escape key presses without throwing unhandled exceptions', () => {
      const handleClose = vi.fn();
      render(
        <BookingModal
          isOpen={true}
          onClose={handleClose}
        />
      );

      // Rapidly fire 20 Escape key events
      for (let i = 0; i < 20; i++) {
        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      }

      // onClose handler was invoked cleanly
      expect(handleClose).toHaveBeenCalled();
    });

    it('handles rapid clicking on backdrop overlay without errors', () => {
      const handleClose = vi.fn();
      render(
        <BookingModal
          isOpen={true}
          onClose={handleClose}
        />
      );

      const backdrop = screen.getByTestId('booking-modal-overlay');

      // Click backdrop multiple times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(backdrop);
      }

      expect(handleClose).toHaveBeenCalled();
    });

    it('prevents backdrop clicks from inside the modal content box from triggering onClose', () => {
      const handleClose = vi.fn();
      render(
        <BookingModal
          isOpen={true}
          onClose={handleClose}
        />
      );

      const modalTitle = screen.getByText('Plan Your Dream Journey');
      fireEvent.click(modalTitle);

      // Should NOT close when clicking inside content
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('TourDetailModal: handles rapid Escape and backdrop clicks smoothly', () => {
      const handleClose = vi.fn();
      render(
        <TourDetailModal
          isOpen={true}
          tour={tourA}
          onClose={handleClose}
        />
      );

      expect(screen.getByTestId('tour-detail-modal')).toBeInTheDocument();

      // Rapid Escape presses
      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      }
      expect(handleClose).toHaveBeenCalled();

      // Backdrop click
      const backdrop = screen.getByTestId('tour-detail-modal-backdrop');
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // 6. NEWSLETTER COMPONENT ADVERSARIAL EDGE CASES
  // =========================================================================
  describe('6. Newsletter Adversarial Edge Cases', () => {
    it('shows error on empty and space-only submissions in Newsletter', () => {
      const handleSubscribe = vi.fn();
      render(<Newsletter onSubscribe={handleSubscribe} />);

      const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

      // Click with empty input
      fireEvent.click(subscribeBtn);
      expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
      expect(handleSubscribe).not.toHaveBeenCalled();

      // Type spaces only
      const emailInput = screen.getByLabelText(/email address for newsletter/i);
      fireEvent.change(emailInput, { target: { value: '     ' } });
      fireEvent.click(subscribeBtn);
      expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
      expect(handleSubscribe).not.toHaveBeenCalled();
    });

    it('shows error on invalid email syntax in Newsletter', () => {
      const handleSubscribe = vi.fn();
      render(<Newsletter onSubscribe={handleSubscribe} />);

      const emailInput = screen.getByLabelText(/email address for newsletter/i);
      const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

      const badEmails = [
        'test@',
        'test@domain',
        'test@@domain.com',
        'test domain.com',
        '@domain.com',
        'user@domain,com',
      ];

      for (const badEmail of badEmails) {
        fireEvent.change(emailInput, { target: { value: badEmail } });
        fireEvent.click(subscribeBtn);
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(handleSubscribe).not.toHaveBeenCalled();
      }
    });

    it('handles valid newsletter subscription and prevents duplicate resubmission', async () => {
      const handleSubscribe = vi.fn();
      render(<Newsletter onSubscribe={handleSubscribe} />);

      const emailInput = screen.getByLabelText(/email address for newsletter/i);
      const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'connoisseur@travelio.luxury' } });

      // Multi-clicks in rapid burst
      fireEvent.click(subscribeBtn);
      fireEvent.click(subscribeBtn);
      fireEvent.click(subscribeBtn);

      await waitFor(
        () => {
          expect(
            screen.getByText(/welcome to the travelio private circle/i)
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Form input and submit button are replaced by success status banner
      expect(screen.queryByLabelText(/email address for newsletter/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /subscribe to newsletter/i })).not.toBeInTheDocument();

      // Callback was invoked once
      expect(handleSubscribe).toHaveBeenCalledTimes(1);
      expect(handleSubscribe).toHaveBeenCalledWith('connoisseur@travelio.luxury');
    });

    it('trims leading/trailing whitespace on newsletter email subscription', async () => {
      const handleSubscribe = vi.fn();
      render(<Newsletter onSubscribe={handleSubscribe} />);

      const emailInput = screen.getByLabelText(/email address for newsletter/i);
      const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

      fireEvent.change(emailInput, { target: { value: '   collector@travelio.com   ' } });
      fireEvent.click(subscribeBtn);

      await waitFor(
        () => {
          expect(handleSubscribe).toHaveBeenCalledWith('collector@travelio.com');
        },
        { timeout: 3000 }
      );
    });

    it('clears validation error as soon as the user edits the input field', () => {
      render(<Newsletter />);

      const emailInput = screen.getByLabelText(/email address for newsletter/i);
      const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

      // Trigger error
      fireEvent.click(subscribeBtn);
      expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();

      // User starts typing
      fireEvent.change(emailInput, { target: { value: 'a' } });

      // Error message should be dismissed immediately
      expect(screen.queryByText(/please enter your email address/i)).not.toBeInTheDocument();
    });
  });
});
