import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TourCard } from '@/components/Tours/TourCard';
import { tours } from '@/data/travelioData';
import { Tour } from '@/types';

describe('TourCard Component', () => {
  const mockTour: Tour = tours[0]; // Cherry Blossoms of Kyoto & Nara

  it('renders all key tour card information including title, location, duration, and price', () => {
    render(<TourCard tour={mockTour} />);

    // Title
    expect(screen.getByText(mockTour.title)).toBeInTheDocument();

    // Location
    expect(screen.getByText(mockTour.location)).toBeInTheDocument();

    // Duration
    expect(screen.getByText(mockTour.duration)).toBeInTheDocument();

    // Category Badge
    expect(screen.getByText(mockTour.category)).toBeInTheDocument();

    // Special badge pill
    if (mockTour.badge) {
      expect(screen.getByTestId('tour-badge-pill')).toHaveTextContent(mockTour.badge);
    }

    // Price formatting
    expect(screen.getByText(mockTour.priceFormatted)).toBeInTheDocument();
    expect(screen.getByText(mockTour.pricePer || '/person')).toBeInTheDocument();

    // Rating & reviews
    expect(screen.getByText(mockTour.rating.toFixed(1))).toBeInTheDocument();
    expect(screen.getByText(`(${mockTour.reviewsCount})`)).toBeInTheDocument();
  });

  it('triggers onViewDetails callback when "View Details" button or title is clicked', async () => {
    const handleViewDetails = vi.fn();
    render(<TourCard tour={mockTour} onViewDetails={handleViewDetails} />);

    const detailsButton = screen.getByRole('button', {
      name: new RegExp(`view details for ${mockTour.title}`, 'i'),
    });
    await userEvent.click(detailsButton);

    expect(handleViewDetails).toHaveBeenCalledTimes(1);
    expect(handleViewDetails).toHaveBeenCalledWith(mockTour);

    // Title click
    const titleHeading = screen.getByText(mockTour.title);
    await userEvent.click(titleHeading);
    expect(handleViewDetails).toHaveBeenCalledTimes(2);
  });

  it('triggers onBookNow callback when "Book Now" button is clicked', async () => {
    const handleBookNow = vi.fn();
    render(<TourCard tour={mockTour} onBookNow={handleBookNow} />);

    const bookButton = screen.getByRole('button', {
      name: new RegExp(`book ${mockTour.title} now`, 'i'),
    });
    await userEvent.click(bookButton);

    expect(handleBookNow).toHaveBeenCalledTimes(1);
    expect(handleBookNow).toHaveBeenCalledWith(mockTour);
  });
});
