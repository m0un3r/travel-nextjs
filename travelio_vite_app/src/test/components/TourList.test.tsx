import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TourList } from '@/components/Tours/TourList';
import { tours } from '@/data/travelioData';

describe('TourList Component', () => {
  it('renders tour count and tour cards', () => {
    render(
      <TourList
        tours={tours}
        totalCount={tours.length}
        selectedCategory="All"
      />
    );

    expect(screen.getByText(/All Handcrafted Journeys/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Showing ${tours.length} of ${tours.length} curated journeys`, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('tour-grid')).toBeInTheDocument();
  });

  it('renders category-specific title when category is selected', () => {
    const natureTours = tours.filter((t) => t.category === 'Nature');
    render(
      <TourList
        tours={natureTours}
        totalCount={tours.length}
        selectedCategory="Nature"
      />
    );

    expect(screen.getByText(/Nature Experiences/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Showing ${natureTours.length} of ${tours.length} curated journeys`, 'i'))).toBeInTheDocument();
  });

  it('renders empty state when no tours match and triggers reset filters', async () => {
    const handleReset = vi.fn();
    render(
      <TourList
        tours={[]}
        totalCount={tours.length}
        selectedCategory="Nature"
        searchQuery="non-existent place"
        onResetFilters={handleReset}
      />
    );

    expect(screen.getByTestId('tour-list-empty-state')).toBeInTheDocument();
    expect(screen.getByText(/No journeys found/i)).toBeInTheDocument();

    const resetButtons = screen.getAllByRole('button', { name: /reset filters/i });
    expect(resetButtons.length).toBeGreaterThan(0);
    await userEvent.click(resetButtons[0]);

    expect(handleReset).toHaveBeenCalled();
  });
});
