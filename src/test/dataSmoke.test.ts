import { describe, it, expect } from 'vitest';
import {
  tours,
  categories,
  stories,
  valuePillars,
  journeySteps,
  faqs,
  brandMetadata,
  getTourById,
  getToursByCategory,
  getFeaturedTours,
  searchTours,
} from '@/data/travelioData';

describe('Travelio Centralized Data Store Smoke Tests', () => {
  it('loads all 19 curated tours with full schemas', () => {
    expect(tours).toHaveLength(19);
    tours.forEach(tour => {
      expect(tour.id).toBeTruthy();
      expect(tour.title).toBeTruthy();
      expect(tour.category).toBeTruthy();
      expect(tour.price).toBeGreaterThan(0);
      expect(tour.days).toBeGreaterThan(0);
      expect(tour.nights).toBeGreaterThan(0);
      expect(tour.rating).toBeGreaterThanOrEqual(4.5);
      expect(tour.highlights.length).toBeGreaterThan(0);
      expect(tour.inclusions.length).toBeGreaterThan(0);
      expect(tour.image).toMatch(/^https?:\/\//);
      expect(tour.itinerary.length).toBeGreaterThan(0);
    });
  });

  it('loads the 5 core categories', () => {
    expect(categories).toHaveLength(5);
    const categoryNames = categories.map(c => c.name);
    expect(categoryNames).toEqual(
      expect.arrayContaining(['Cities', 'Nature', 'Adventure', 'Honeymoon', 'Wildlife'])
    );
  });

  it('loads 8 authentic traveler stories with 5.0 ratings', () => {
    expect(stories).toHaveLength(8);
    stories.forEach(story => {
      expect(story.author).toBeTruthy();
      expect(story.location).toBeTruthy();
      expect(story.tourTitle).toBeTruthy();
      expect(story.quote).toBeTruthy();
      expect(story.story).toBeTruthy();
      expect(story.rating).toBe(5);
    });
  });

  it('loads value propositions and journey steps', () => {
    expect(valuePillars).toHaveLength(4);
    expect(journeySteps).toHaveLength(4);
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(brandMetadata.brandName).toBe('Travelio');
    expect(brandMetadata.foundingYear).toBe(2009);
  });

  it('verifies helper lookup and search functions', () => {
    const kyotoTour = getTourById('cherry-blossoms-kyoto-nara');
    expect(kyotoTour).toBeDefined();
    expect(kyotoTour?.location).toBe('Japan');

    const natureTours = getToursByCategory('Nature');
    expect(natureTours.length).toBe(5);

    const featuredTours = getFeaturedTours();
    expect(featuredTours.length).toBeGreaterThan(0);

    const searchResults = searchTours('Iceland');
    expect(searchResults.length).toBe(2);
  });
});
