import React, { useState } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { TravelerStory } from '@/types';
import { stories as defaultStories } from '@/data/travelioData';
import { StoryCard } from './StoryCard';

export interface TravelerStoriesProps {
  storiesList?: TravelerStory[];
  title?: string;
  subtitle?: string;
  ratingAverage?: string;
  reviewsCount?: string;
  className?: string;
}

export const TravelerStories: React.FC<TravelerStoriesProps> = ({
  storiesList = defaultStories,
  title = 'Real Stories From Real Journeys',
  subtitle = 'Real reflections from travelers who explored the world’s most breathtaking places with Travelio.',
  ratingAverage = '5.0',
  reviewsCount = '2,000+',
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(storiesList.map((s) => s.category)))];

  const filteredStories =
    selectedCategory === 'All'
      ? storiesList
      : storiesList.filter(
          (s) => s.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section
      id="reviews"
      className={`space-y-10 scroll-mt-24 ${className}`}
      data-testid="traveler-stories-section"
    >
      {/* Header with Title & Social Proof Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-travelio-gold-50 text-travelio-gold-800 border border-travelio-gold-200 text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5 text-travelio-gold-600" />
            <span>Verified Guest Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-travelio-dark-900 tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Rating Average Badge Pill */}
        <div
          data-testid="rating-average-badge"
          className="shrink-0 flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-soft-sm self-start md:self-auto"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-serif font-bold text-xl">
            {ratingAverage}
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs font-semibold text-travelio-dark-900 mt-0.5">
              5.0 ★ from {reviewsCount} reviews
            </div>
          </div>
        </div>
      </div>

      {/* Optional Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap
                ${
                  selectedCategory === cat
                    ? 'bg-travelio-dark-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }
              `}
            >
              {cat} {cat !== 'All' && `(${storiesList.filter((s) => s.category === cat).length})`}
            </button>
          ))}
        </div>
      )}

      {/* Stories Grid */}
      <div
        data-testid="stories-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};

export default TravelerStories;
