import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { Tour } from '@/types';
import { TourCard } from './TourCard';
import { Button } from '@/components/common/Button';

export interface TourListProps {
  tours: Tour[];
  totalCount?: number;
  selectedCategory?: string;
  searchQuery?: string;
  onResetFilters?: () => void;
  onViewDetails?: (tour: Tour) => void;
  onBookNow?: (tour: Tour) => void;
  className?: string;
}

export const TourList: React.FC<TourListProps> = ({
  tours,
  totalCount = 19,
  selectedCategory = 'All',
  searchQuery = '',
  onResetFilters,
  onViewDetails,
  onBookNow,
  className = '',
}) => {
  const isFiltered = selectedCategory !== 'All' || Boolean(searchQuery && searchQuery.trim() !== '');

  return (
    <section className={`space-y-6 scroll-mt-24 ${className}`} data-testid="tour-list-section">
      {/* Header with Results Count & Reset Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-travelio-dark-900">
            {selectedCategory === 'All'
              ? 'All Handcrafted Journeys'
              : `${selectedCategory} Experiences`}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Showing {tours.length} of {totalCount} curated journeys
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        </div>

        {isFiltered && onResetFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </Button>
        )}
      </div>

      {/* Empty State */}
      {tours.length === 0 ? (
        <div
          data-testid="tour-list-empty-state"
          className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-4 max-w-lg mx-auto shadow-soft-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-bold text-travelio-dark-900">
              No journeys found
            </h4>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              We couldn't find any trips matching your filter criteria. Try adjusting your destination, category, or duration.
            </p>
          </div>
          {onResetFilters && (
            <Button
              type="button"
              variant="gold"
              size="md"
              onClick={onResetFilters}
              className="font-semibold shadow-gold-glow"
            >
              Reset Filters & View All
            </Button>
          )}
        </div>
      ) : (
        /* Tour Cards Grid */
        <div
          data-testid="tour-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TourList;
