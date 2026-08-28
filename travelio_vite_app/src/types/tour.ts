export type TourCategory = 'Cities' | 'Nature' | 'Adventure' | 'Honeymoon' | 'Wildlife';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activity?: string;
  meals?: string;
  accommodation?: string;
}

export interface TourInclusion {
  icon?: string;
  title: string;
  description?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: TourCategory;
  location: string;
  country?: string;
  region?: string;
  price: number;
  priceFormatted: string;
  pricePer?: string;
  duration: string;
  days: number;
  nights: number;
  rating: number;
  reviewsCount: number;
  reviewCount?: number;
  badge?: string;
  featured?: boolean;
  tagline?: string;
  description: string;
  overview: string;
  note?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  image: string;
  gallery?: string[];
  images?: string[];
  itinerary: ItineraryDay[];
}
