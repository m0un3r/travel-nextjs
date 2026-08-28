import { useState, useCallback } from 'react';
import { Tour, BookingInquiry } from '@/types';

export interface UseBookingModalReturn {
  isOpen: boolean;
  prefilledTour: Tour | null;
  isSuccess: boolean;
  lastInquiry: BookingInquiry | null;
  openModal: (tour?: Tour | null) => void;
  closeModal: () => void;
  setInquirySuccess: (inquiry: BookingInquiry) => void;
  resetModal: () => void;
}

export const useBookingModal = (initialOpen = false): UseBookingModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [prefilledTour, setPrefilledTour] = useState<Tour | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastInquiry, setLastInquiry] = useState<BookingInquiry | null>(null);

  const openModal = useCallback((tour?: Tour | null) => {
    setPrefilledTour(tour || null);
    setIsSuccess(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Slight delay before clearing prefilledTour to avoid layout jump during transition
    setTimeout(() => {
      setPrefilledTour(null);
      setIsSuccess(false);
    }, 200);
  }, []);

  const setInquirySuccess = useCallback((inquiry: BookingInquiry) => {
    setLastInquiry(inquiry);
    setIsSuccess(true);
  }, []);

  const resetModal = useCallback(() => {
    setIsSuccess(false);
    setLastInquiry(null);
    setPrefilledTour(null);
  }, []);

  return {
    isOpen,
    prefilledTour,
    isSuccess,
    lastInquiry,
    openModal,
    closeModal,
    setInquirySuccess,
    resetModal,
  };
};

export default useBookingModal;
