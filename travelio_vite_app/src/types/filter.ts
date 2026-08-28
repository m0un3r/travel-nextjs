import { TourCategory } from './tour';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'duration';

export interface FilterState {
  searchTerm: string;
  selectedCategory: TourCategory | 'All';
  selectedLocation?: string;
  priceRange?: [number, number];
  duration?: string;
  sortBy?: SortOption;
}
