import React, { useState } from 'react';
import { Search, MapPin, Compass, Clock } from 'lucide-react';
import { categories } from '@/data/travelioData';
import { Button } from '@/components/common/Button';

export interface SearchState {
  searchTerm: string;
  category: string;
  duration: string;
}

export interface SearchBarProps {
  onSearch?: (searchState: SearchState) => void;
  initialSearchTerm?: string;
  initialCategory?: string;
  initialDuration?: string;
  className?: string;
}

const DURATION_OPTIONS = [
  { value: 'All', label: 'Any Duration' },
  { value: 'short', label: '1 - 5 Days' },
  { value: 'medium', label: '6 - 9 Days' },
  { value: 'long', label: '10 - 14 Days' },
  { value: 'extended', label: '15+ Days' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialSearchTerm = '',
  initialCategory = 'All',
  initialDuration = 'All',
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [category, setCategory] = useState(initialCategory);
  const [duration, setDuration] = useState(initialDuration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ searchTerm, category, duration });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-soft-xl border border-white/20 transition-all ${className}`}
      data-testid="hero-search-bar"
      role="search"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Destination Field */}
        <div className="lg:col-span-4 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 focus-within:border-travelio-gold-500 focus-within:ring-2 focus-within:ring-travelio-gold-500/20 transition-all">
          <MapPin className="w-5 h-5 text-travelio-gold-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label
              htmlFor="hero-destination-input"
              className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left"
            >
              Destination
            </label>
            <input
              id="hero-destination-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Where to? (e.g. Japan, Paris, Alps)"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 font-medium focus:outline-none truncate"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 focus-within:border-travelio-gold-500 focus-within:ring-2 focus-within:ring-travelio-gold-500/20 transition-all">
          <Compass className="w-5 h-5 text-travelio-gold-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label
              htmlFor="hero-category-select"
              className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left"
            >
              Category
            </label>
            <select
              id="hero-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-900 font-medium focus:outline-none cursor-pointer truncate"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration Picker */}
        <div className="lg:col-span-3 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 focus-within:border-travelio-gold-500 focus-within:ring-2 focus-within:ring-travelio-gold-500/20 transition-all">
          <Clock className="w-5 h-5 text-travelio-gold-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label
              htmlFor="hero-duration-select"
              className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left"
            >
              Duration
            </label>
            <select
              id="hero-duration-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-900 font-medium focus:outline-none cursor-pointer truncate"
            >
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="lg:col-span-2">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            fullWidth
            icon={<Search className="w-4 h-4" />}
            className="h-full py-3.5 sm:py-3"
          >
            Explore Tours
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
