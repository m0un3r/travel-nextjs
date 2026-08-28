import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Tour, BookingInquiry } from '@/types';
import { BookingForm } from './BookingForm';
import { BookingSuccess } from './BookingSuccess';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledTour?: Tour | null;
  onSuccess?: (inquiry: BookingInquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledTour,
  onSuccess,
}) => {
  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Reset submitted inquiry whenever modal opens/closes
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setSubmittedInquiry(null);

      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFormSubmitSuccess = (inquiry: BookingInquiry) => {
    setSubmittedInquiry(inquiry);
    if (onSuccess) {
      onSuccess(inquiry);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={handleBackdropClick}
      data-testid="booking-modal-overlay"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-zinc-200 my-auto animate-scale-up outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {!submittedInquiry && (
          <div className="flex items-center justify-between border-b border-zinc-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-travelio-gold-600 to-travelio-gold-400 text-white flex items-center justify-center shadow-gold-glow shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3
                  id="booking-modal-title"
                  className="text-xl sm:text-2xl font-serif font-bold text-travelio-dark-900 leading-snug"
                >
                  Plan Your Dream Journey
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  {prefilledTour
                    ? `Inquire for ${prefilledTour.title}`
                    : 'Personalized bespoke travel planning crafted by experts'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-travelio-gold-500/30"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Body: Form or Success */}
        {submittedInquiry ? (
          <BookingSuccess
            inquiry={submittedInquiry}
            onClose={onClose}
            onExploreMore={onClose}
          />
        ) : (
          <BookingForm
            prefilledTour={prefilledTour}
            onSubmitSuccess={handleFormSubmitSuccess}
            onCancel={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default BookingModal;
