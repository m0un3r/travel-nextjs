import type { Tour, Category, TravelerStory } from '@/types';
import { tours } from './tours';
import { categories } from './categories';
import { stories } from './stories';
import { valuePillars, journeySteps, faqs, brandMetadata, destinationLocations } from './valueProps';

export type { Tour, Category, TravelerStory };

export {
  tours,
  categories,
  stories,
  stories as reviews,
  valuePillars,
  journeySteps,
  faqs,
  brandMetadata,
  destinationLocations,
};

// Helper lookup functions
export const getTourById = (id: string): Tour | undefined => {
  return tours.find(tour => tour.id === id || tour.slug === id);
};

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug || tour.id === slug);
};

export const getToursByCategory = (category: string): Tour[] => {
  if (!category || category === 'All') return tours;
  return tours.filter(tour => tour.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedTours = (): Tour[] => {
  return tours.filter(tour => tour.featured);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id || cat.slug === id || cat.name.toLowerCase() === id.toLowerCase());
};

export const searchTours = (
  term: string,
  category?: string,
  maxPrice?: number
): Tour[] => {
  let result = tours;

  if (category && category !== 'All') {
    result = result.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  if (term && term.trim() !== '') {
    const q = term.toLowerCase().trim();
    result = result.filter(
      t =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.region && t.region.toLowerCase().includes(q)) ||
        t.description.toLowerCase().includes(q) ||
        t.highlights.some(h => h.toLowerCase().includes(q))
    );
  }

  if (maxPrice && maxPrice > 0) {
    result = result.filter(t => t.price <= maxPrice);
  }

  return result;
};

export default {
  tours,
  categories,
  stories,
  valuePillars,
  journeySteps,
  faqs,
  brandMetadata,
  destinationLocations,
  getTourById,
  getTourBySlug,
  getToursByCategory,
  getFeaturedTours,
  getCategoryById,
  searchTours,
};
