import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/useToast';
import { useBookingModal } from '@/hooks/useBookingModal';
import { useTourFilter } from '@/hooks/useTourFilter';
import { tours } from '@/data/travelioData';

describe('Custom React Hooks', () => {
  describe('useToast', () => {
    it('adds and removes toasts with convenience helpers', () => {
      const { result } = renderHook(() => useToast());

      expect(result.current.toasts).toHaveLength(0);

      let toastId = '';
      act(() => {
        toastId = result.current.success('Success message', 5000);
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].type).toBe('success');
      expect(result.current.toasts[0].message).toBe('Success message');

      act(() => {
        result.current.error('Error message');
      });

      expect(result.current.toasts).toHaveLength(2);

      act(() => {
        result.current.removeToast(toastId);
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].type).toBe('error');

      act(() => {
        result.current.clearToasts();
      });

      expect(result.current.toasts).toHaveLength(0);
    });
  });

  describe('useBookingModal', () => {
    it('manages modal open/close and prefilled tour state', () => {
      const { result } = renderHook(() => useBookingModal());

      expect(result.current.isOpen).toBe(false);
      expect(result.current.prefilledTour).toBeNull();

      act(() => {
        result.current.openModal(tours[0]);
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.prefilledTour).toEqual(tours[0]);

      act(() => {
        result.current.closeModal();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('useTourFilter', () => {
    it('filters tours by category', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: tours }));

      expect(result.current.filteredTours.length).toBe(tours.length);

      act(() => {
        result.current.setSelectedCategory('Wildlife');
      });

      expect(result.current.filteredTours.length).toBeGreaterThan(0);
      result.current.filteredTours.forEach((t) => {
        expect(t.category).toBe('Wildlife');
      });
    });

    it('filters tours by search query and resets filters', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: tours }));

      act(() => {
        result.current.setSearchTerm('Kyoto');
      });

      expect(result.current.filteredTours.length).toBeGreaterThan(0);
      result.current.filteredTours.forEach((t) => {
        const matches =
          t.title.toLowerCase().includes('kyoto') ||
          t.location.toLowerCase().includes('kyoto');
        expect(matches).toBe(true);
      });

      act(() => {
        result.current.resetFilters();
      });

      expect(result.current.searchTerm).toBe('');
      expect(result.current.selectedCategory).toBe('All');
      expect(result.current.filteredTours.length).toBe(tours.length);
    });
  });
});
