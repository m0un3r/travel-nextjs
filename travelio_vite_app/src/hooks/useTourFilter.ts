import { useState, useMemo, useCallback } from 'react';
import { Tour, TourCategory, SortOption } from '@/types';
import { tours as defaultTours } from '@/data/travelioData';

export interface UseTourFilterOptions {
  initialTours?: Tour[];
  initialCategory?: TourCategory | 'All' | string;
  initialSearch?: string;
  initialDuration?: string;
  initialPriceRange?: [number, number];
  initialSortBy?: SortOption;
}

export interface UseTourFilterReturn {
  searchTerm: string;
  selectedCategory: string;
  selectedDuration: string;
  priceRange: [number, number];
  sortBy: SortOption;
  filteredTours: Tour[];
  totalCount: number;
  filteredCount: number;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedDuration: (duration: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  handleHeroSearch: (params: {
    searchTerm: string;
    category: string;
    duration: string;
  }) => void;
}

export const useTourFilter = (
  options: UseTourFilterOptions = {}
): UseTourFilterReturn => {
  const {
    initialTours = defaultTours,
    initialCategory = 'All',
    initialSearch = '',
    initialDuration = 'All',
    initialPriceRange = [0, 15000],
    initialSortBy = 'featured',
  } = options;

  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDuration, setSelectedDuration] = useState<string>(initialDuration);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialPriceRange);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDuration('All');
    setPriceRange(initialPriceRange);
    setSortBy('featured');
  }, [initialPriceRange]);

  const handleHeroSearch = useCallback(
    (params: { searchTerm: string; category: string; duration: string }) => {
      setSearchTerm(params.searchTerm || '');
      setSelectedCategory(params.category || 'All');
      setSelectedDuration(params.duration || 'All');

      const catalogElement = document.getElementById('tours');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  const filteredTours = useMemo(() => {
    let result = initialTours.filter((tour) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' ||
        tour.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search term match across title, location, country, region, category, description, and highlights
      const q = searchTerm.toLowerCase().trim();
      const searchMatch =
        !q ||
        tour.title.toLowerCase().includes(q) ||
        tour.location.toLowerCase().includes(q) ||
        (tour.country && tour.country.toLowerCase().includes(q)) ||
        (tour.region && tour.region.toLowerCase().includes(q)) ||
        tour.category.toLowerCase().includes(q) ||
        tour.description.toLowerCase().includes(q) ||
        (tour.tagline && tour.tagline.toLowerCase().includes(q)) ||
        tour.highlights.some((h) => h.toLowerCase().includes(q));

      // Duration match
      let durationMatch = true;
      const dur = selectedDuration.toLowerCase().trim();
      if (dur === 'short' || dur === '3-5 days' || dur === '3-5') {
        durationMatch = tour.days <= 5;
      } else if (dur === 'medium' || dur === '6-8 days' || dur === '6-8' || dur === '6-9') {
        durationMatch = tour.days >= 6 && tour.days <= 9;
      } else if (dur === 'long' || dur === '9-12 days' || dur === '9-12' || dur === '10-14') {
        durationMatch = tour.days >= 10 && tour.days <= 14;
      } else if (dur === 'extended' || dur === '13+ days' || dur === '13+' || dur === '15+') {
        durationMatch = tour.days >= 15;
      }

      // Price range match
      const priceMatch =
        tour.price >= priceRange[0] && tour.price <= priceRange[1];

      return categoryMatch && searchMatch && durationMatch && priceMatch;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      result = [...result].sort((a, b) => a.days - b.days);
    } else if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [
    initialTours,
    selectedCategory,
    searchTerm,
    selectedDuration,
    priceRange,
    sortBy,
  ]);

  return {
    searchTerm,
    selectedCategory,
    selectedDuration,
    priceRange,
    sortBy,
    filteredTours,
    totalCount: initialTours.length,
    filteredCount: filteredTours.length,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDuration,
    setPriceRange,
    setSortBy,
    resetFilters,
    handleHeroSearch,
  };
};

export default useTourFilter;
