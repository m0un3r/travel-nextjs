import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '@/components/Hero/Hero';
import { SearchBar } from '@/components/Hero/SearchBar';

describe('Hero Component', () => {
  it('renders headline, brand badge, and value proposition', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /travel beyond the ordinary/i })).toBeInTheDocument();
    expect(screen.getByText(/Crafted Journeys Since 2009/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Handpicked destinations, curated itineraries/i)
    ).toBeInTheDocument();
  });

  it('renders all key social proof and trust stats', () => {
    render(<Hero />);
    expect(screen.getByTestId('hero-stats')).toBeInTheDocument();
    expect(screen.getByText(/5.0 Star Rating/i)).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText(/12,000\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Travelers/i)).toBeInTheDocument();
    expect(screen.getByText(/80\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Global Destinations/i)).toBeInTheDocument();
  });

  it('handles search input typing and submission callback', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const destinationInput = screen.getByPlaceholderText(/where to\?/i);
    const categorySelect = screen.getByLabelText(/category/i);
    const durationSelect = screen.getByLabelText(/duration/i);
    const submitButton = screen.getByRole('button', { name: /explore tours/i });

    // Type destination
    await userEvent.type(destinationInput, 'Japan');
    expect(destinationInput).toHaveValue('Japan');

    // Select category
    await userEvent.selectOptions(categorySelect, 'Adventure');
    expect(categorySelect).toHaveValue('Adventure');

    // Select duration
    await userEvent.selectOptions(durationSelect, 'short');
    expect(durationSelect).toHaveValue('short');

    // Submit form
    await userEvent.click(submitButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith({
      searchTerm: 'Japan',
      category: 'Adventure',
      duration: 'short',
    });
  });

  it('submits search with default values when submitted without changes', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const submitButton = screen.getByRole('button', { name: /explore tours/i });
    await userEvent.click(submitButton);

    expect(handleSearch).toHaveBeenCalledWith({
      searchTerm: '',
      category: 'All',
      duration: 'All',
    });
  });
});
