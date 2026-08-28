import React from 'react';
import { MapPin, Clock, Star, Eye, CalendarCheck } from 'lucide-react';
import { Tour } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export interface TourCardProps {
  tour: Tour;
  onViewDetails?: (tour: Tour) => void;
  onBookNow?: (tour: Tour) => void;
  className?: string;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onViewDetails,
  onBookNow,
  className = '',
}) => {
  const reviews = tour.reviewsCount ?? tour.reviewCount ?? 0;
  const categoryVariant = tour.category.toLowerCase() as
    | 'cities'
    | 'nature'
    | 'adventure'
    | 'honeymoon'
    | 'wildlife';

  return (
    <article
      data-testid={`tour-card-${tour.id}`}
      className={`
        bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-soft-sm 
        hover:shadow-card-hover transition-all duration-300 flex flex-col group
        ${className}
      `.trim()}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5">
          <Badge
            variant={categoryVariant}
            size="md"
            className="bg-white/95 backdrop-blur-md shadow-sm font-semibold text-travelio-dark-900 border-white/60"
          >
            {tour.category}
          </Badge>
        </div>

        {/* Badge Pill (e.g., Seasonal highlights, remaining spots) */}
        {tour.badge && (
          <div className="absolute bottom-3.5 left-3.5 right-3.5">
            <span
              data-testid="tour-badge-pill"
              className="block px-3 py-1 text-xs font-medium rounded-lg bg-travelio-dark-900/85 backdrop-blur-md text-white truncate shadow-sm"
            >
              {tour.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata Row: Location & Duration */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1 font-medium truncate max-w-[60%]">
              <MapPin className="w-3.5 h-3.5 text-travelio-gold-500 shrink-0" />
              <span className="truncate">{tour.location}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {tour.duration}
            </span>
          </div>

          {/* Tour Title */}
          <h4
            className="text-lg font-serif font-bold text-travelio-dark-900 group-hover:text-travelio-gold-600 transition-colors line-clamp-1 cursor-pointer"
            onClick={() => onViewDetails?.(tour)}
          >
            {tour.title}
          </h4>

          {/* Tagline / Description */}
          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {tour.tagline || tour.description}
          </p>
        </div>

        {/* Pricing, Rating & Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-zinc-100">
          {/* Price & Rating Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-zinc-400 block font-medium">
                Starting from
              </span>
              <div className="text-xl font-bold text-travelio-dark-900 font-serif">
                {tour.priceFormatted || `$${tour.price.toLocaleString()}`}{' '}
                <span className="text-xs font-normal font-sans text-zinc-500">
                  {tour.pricePer || '/person'}
                </span>
              </div>
            </div>

            <div
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80"
              aria-label={`Rating: ${tour.rating.toFixed(1)} out of 5 stars from ${reviews} reviews`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>{tour.rating.toFixed(1)}</span>
              <span className="text-zinc-400">({reviews})</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 text-xs"
              onClick={() => onViewDetails?.(tour)}
              aria-label={`View details for ${tour.title}`}
            >
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              <span>View Details</span>
            </Button>
            <Button
              type="button"
              variant="gold"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 text-xs font-bold"
              onClick={() => onBookNow?.(tour)}
              aria-label={`Book ${tour.title} now`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TourCard;
