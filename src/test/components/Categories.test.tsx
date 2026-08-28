import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryGrid } from '@/components/Categories/CategoryGrid';
import { CategoryCard } from '@/components/Categories/CategoryCard';
import { categories } from '@/data/travelioData';

describe('Categories Component', () => {
  it('renders "All Tours" and all 5 core category tabs with counts', () => {
    const handleSelect = vi.fn();
    render(
      <CategoryGrid
        selectedCategory="All"
        onSelectCategory={handleSelect}
        totalToursCount={19}
      />
    );

    // Header
    expect(screen.getByText(/Curated Journey Themes/i)).toBeInTheDocument();

    // Check All Tours pill
    expect(screen.getByRole('tab', { name: /all tours/i })).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();

    // Check each category pill
    categories.forEach((cat) => {
      expect(screen.getByRole('tab', { name: new RegExp(cat.name, 'i') })).toBeInTheDocument();
    });
  });

  it('triggers onSelectCategory when clicking different category pills', async () => {
    const handleSelect = vi.fn();
    render(
      <CategoryGrid
        selectedCategory="All"
        onSelectCategory={handleSelect}
      />
    );

    const adventurePill = screen.getByRole('tab', { name: /adventure/i });
    await userEvent.click(adventurePill);

    expect(handleSelect).toHaveBeenCalledWith('Adventure');
  });

  it('displays category description when a specific category is active', () => {
    render(
      <CategoryGrid
        selectedCategory="Nature"
        onSelectCategory={vi.fn()}
      />
    );

    const natureCategory = categories.find((c) => c.name === 'Nature')!;
    expect(screen.getByText(natureCategory.title)).toBeInTheDocument();
    expect(screen.getByText(natureCategory.description)).toBeInTheDocument();
  });

  it('renders CategoryCard in card variant with count and title', async () => {
    const handleClick = vi.fn();
    const cat = categories[0];

    render(
      <CategoryCard
        category={cat}
        isSelected={false}
        onClick={handleClick}
        variant="card"
      />
    );

    expect(screen.getByText(cat.title)).toBeInTheDocument();
    expect(screen.getByText(`${cat.count} Tours`)).toBeInTheDocument();

    const cardButton = screen.getByRole('button');
    await userEvent.click(cardButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
