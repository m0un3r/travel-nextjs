import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TourDetailModal } from '@/components/Tours/TourDetailModal';
import { tours } from '@/data/travelioData';
import { Tour } from '@/types';

describe('TourDetailModal Component', () => {
  const mockTour: Tour = tours[0]; // Cherry Blossoms of Kyoto & Nara

  it('does not render modal when isOpen is false', () => {
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={false}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByTestId('tour-detail-modal')).not.toBeInTheDocument();
  });

  it('renders complete tour information when isOpen is true', () => {
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Dialog presence
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Title in header
    expect(screen.getAllByText(mockTour.title).length).toBeGreaterThan(0);

    // Location & Category
    expect(screen.getByText(mockTour.location, { exact: false })).toBeInTheDocument();
    expect(screen.getAllByText(mockTour.category).length).toBeGreaterThan(0);

    // Price & Duration
    expect(screen.getAllByText(mockTour.priceFormatted).length).toBeGreaterThan(0);
    expect(screen.getByText(mockTour.duration)).toBeInTheDocument();

    // Overview & Description
    expect(screen.getByText(mockTour.overview || mockTour.description)).toBeInTheDocument();

    // Highlights
    mockTour.highlights.forEach((h) => {
      expect(screen.getByText(h)).toBeInTheDocument();
    });

    // Inclusions & Exclusions
    mockTour.inclusions.forEach((inc) => {
      expect(screen.getByText(inc)).toBeInTheDocument();
    });
    mockTour.exclusions.forEach((exc) => {
      expect(screen.getByText(exc)).toBeInTheDocument();
    });
  });

  it('renders and toggles day-by-day itinerary accordion items', async () => {
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Check Day 1 title
    const day1 = mockTour.itinerary[0];
    expect(screen.getByText(day1.title)).toBeInTheDocument();
    expect(screen.getByText(day1.description)).toBeInTheDocument();

    // Day 2 description might be collapsed by default
    const day2 = mockTour.itinerary[1];
    expect(screen.getByText(day2.title)).toBeInTheDocument();

    // Toggle Day 2
    const day2Button = screen.getByText(day2.title);
    await userEvent.click(day2Button);
    expect(screen.getByText(day2.description)).toBeInTheDocument();
  });

  it('triggers onClose when clicking close button', async () => {
    const handleClose = vi.fn();
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={handleClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when pressing Escape key', () => {
    const handleClose = vi.fn();
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={handleClose}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when clicking the backdrop overlay', async () => {
    const handleClose = vi.fn();
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={handleClose}
      />
    );

    const backdrop = screen.getByTestId('tour-detail-modal-backdrop');
    await userEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onBookNow callback when clicking "Book This Tour" CTA', async () => {
    const handleBookNow = vi.fn();
    const handleClose = vi.fn();
    render(
      <TourDetailModal
        tour={mockTour}
        isOpen={true}
        onClose={handleClose}
        onBookNow={handleBookNow}
      />
    );

    const bookCTA = screen.getByRole('button', { name: /book this tour/i });
    await userEvent.click(bookCTA);

    expect(handleBookNow).toHaveBeenCalledTimes(1);
    expect(handleBookNow).toHaveBeenCalledWith(mockTour);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
