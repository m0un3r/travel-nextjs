import React from 'react';
import {
  Building2,
  Mountain,
  Compass,
  HeartHandshake,
  Footprints,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Category } from '@/types';

export interface CategoryCardProps {
  category: Category | { id: string; name: string; count: number; icon?: string; description?: string; title?: string };
  isSelected: boolean;
  onClick: () => void;
  variant?: 'pill' | 'card';
  className?: string;
}

export const getCategoryIcon = (nameOrIcon: string, className = 'w-4 h-4') => {
  switch (nameOrIcon.toLowerCase()) {
    case 'cities':
    case 'building2':
      return <Building2 className={className} />;
    case 'nature':
    case 'mountain':
      return <Mountain className={className} />;
    case 'adventure':
    case 'compass':
      return <Compass className={className} />;
    case 'honeymoon':
    case 'hearthandshake':
      return <HeartHandshake className={className} />;
    case 'wildlife':
    case 'footprints':
      return <Footprints className={className} />;
    case 'all':
      return <Sparkles className={className} />;
    default:
      return <MapPin className={className} />;
  }
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onClick,
  variant = 'pill',
  className = '',
}) => {
  const iconElement = getCategoryIcon(category.icon || category.name);

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          group text-left p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer
          ${
            isSelected
              ? 'bg-travelio-dark-900 text-white border-travelio-gold-500 shadow-soft-md scale-[1.02]'
              : 'bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-300 shadow-soft-sm'
          }
          ${className}
        `.trim()}
      >
        <div className="flex items-center justify-between w-full">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-travelio-gold-500 text-white shadow-gold-glow'
                : 'bg-zinc-100 text-zinc-700 group-hover:bg-travelio-gold-50 group-hover:text-travelio-gold-600'
            }`}
          >
            {getCategoryIcon(category.icon || category.name, 'w-5 h-5')}
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              isSelected
                ? 'bg-white/15 text-travelio-gold-300'
                : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
            }`}
          >
            {category.count} Tours
          </span>
        </div>

        <div>
          <h4
            className={`font-serif font-bold text-base ${
              isSelected ? 'text-white' : 'text-travelio-dark-900 group-hover:text-travelio-gold-600'
            }`}
          >
            {category.title || category.name}
          </h4>
          {category.description && (
            <p
              className={`text-xs mt-1 line-clamp-2 ${
                isSelected ? 'text-zinc-300' : 'text-zinc-500'
              }`}
            >
              {category.description}
            </p>
          )}
        </div>
      </button>
    );
  }

  // Pill variant
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isSelected}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none
        ${
          isSelected
            ? 'bg-travelio-gold-500 text-white shadow-gold-glow scale-[1.02]'
            : 'bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/90 shadow-sm'
        }
        ${className}
      `.trim()}
    >
      <span className={isSelected ? 'text-white' : 'text-zinc-500'}>{iconElement}</span>
      <span>{category.name}</span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
          isSelected
            ? 'bg-black/20 text-white'
            : 'bg-zinc-100 text-zinc-600'
        }`}
      >
        {category.count}
      </span>
    </button>
  );
};

export default CategoryCard;
