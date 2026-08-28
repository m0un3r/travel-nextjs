import { TourCategory } from './tour';

export interface TravelerStory {
  id: string;
  author: string;
  name?: string;
  location: string;
  tourTitle: string;
  tour?: string;
  tourName?: string;
  category: TourCategory;
  rating: number;
  quote: string;
  story: string;
  avatar: string;
  image?: string;
}

export type Review = TravelerStory;
