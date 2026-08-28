import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { TravelerStory } from '@/types';

export interface StoryCardProps {
  story: TravelerStory;
  className?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, className = '' }) => {
  const authorName = story.author || story.name || 'Verified Traveler';
  const tourName = story.tourTitle || story.tourName || story.tour;

  return (
    <article
      data-testid={`story-card-${story.id}`}
      className={`
        bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-soft-sm 
        flex flex-col justify-between space-y-4 hover:shadow-card-hover hover:border-zinc-300 
        transition-all duration-300 group
        ${className}
      `.trim()}
    >
      <div className="space-y-3.5">
        {/* Star Rating & Tour Tag */}
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-1 text-amber-500"
            aria-label={`${story.rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < story.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-200'
                }`}
              />
            ))}
          </div>

          {tourName && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-travelio-sand-100 text-travelio-sand-900 truncate max-w-[150px]">
              {tourName}
            </span>
          )}
        </div>

        {/* Quote */}
        <blockquote className="text-sm font-serif font-semibold text-travelio-dark-900 leading-snug">
          "{story.quote}"
        </blockquote>

        {/* Full Narrative Story */}
        <p className="text-xs text-zinc-600 leading-relaxed font-sans line-clamp-4 group-hover:line-clamp-none transition-all">
          {story.story}
        </p>
      </div>

      {/* Author Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
        <img
          src={story.avatar}
          alt={authorName}
          className="w-11 h-11 rounded-full object-cover border-2 border-travelio-gold-100 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h5 className="text-xs font-bold text-travelio-dark-900 truncate">
            {authorName}
          </h5>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 truncate mt-0.5">
            <MapPin className="w-3 h-3 text-travelio-gold-500 shrink-0" />
            <span className="truncate">{story.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
