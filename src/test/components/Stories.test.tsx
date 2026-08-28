import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TravelerStories } from '@/components/Stories/TravelerStories';
import { StoryCard } from '@/components/Stories/StoryCard';
import { stories } from '@/data/travelioData';

describe('TravelerStories Component', () => {
  it('renders section header and rating average badge', () => {
    render(<TravelerStories storiesList={stories} />);

    // Section title
    expect(screen.getByText(/Real Stories From Real Journeys/i)).toBeInTheDocument();

    // Rating average badge
    expect(screen.getByTestId('rating-average-badge')).toBeInTheDocument();
    expect(screen.getByText(/5\.0 ★ from 2,000\+ reviews/i)).toBeInTheDocument();
  });

  it('renders individual StoryCard with avatar, name, location, tour, quote, and narrative', () => {
    const firstStory = stories[0];
    render(<StoryCard story={firstStory} />);

    expect(screen.getByText(firstStory.author || firstStory.name!)).toBeInTheDocument();
    expect(screen.getByText(firstStory.location)).toBeInTheDocument();
    expect(screen.getByText(`"${firstStory.quote}"`)).toBeInTheDocument();
    expect(screen.getByText(firstStory.story)).toBeInTheDocument();

    const avatar = screen.getByRole('img', {
      name: firstStory.author || firstStory.name,
    });
    expect(avatar).toHaveAttribute('src', firstStory.avatar);
  });

  it('filters stories when clicking category filter pills', async () => {
    render(<TravelerStories storiesList={stories} />);

    // Honeymoon filter button
    const honeymoonButton = screen.getByRole('button', { name: /honeymoon/i });
    await userEvent.click(honeymoonButton);

    const honeymoonStories = stories.filter((s) => s.category === 'Honeymoon');
    honeymoonStories.forEach((s) => {
      expect(screen.getByText(s.author || s.name!)).toBeInTheDocument();
    });
  });
});
