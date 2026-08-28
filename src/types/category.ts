import { TourCategory } from './tour';

export interface Category {
  id: string;
  name: TourCategory;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  count: number;
  toursCount?: number;
  image: string;
  color?: string;
  badgeColor: string;
  icon?: string;
}
