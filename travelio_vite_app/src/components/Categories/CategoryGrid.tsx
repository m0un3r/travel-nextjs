import React from 'react';
import { Sparkles } from 'lucide-react';
import { categories as defaultCategories, tours } from '@/data/travelioData';
import { Category } from '@/types';
import { CategoryCard } from './CategoryCard';

export interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryList?: Category[];
  totalToursCount?: number;
  showDescription?: boolean;
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryList = defaultCategories,
  totalToursCount = tours.length,
  showDescription = true,
  className = '',
}) => {
  const activeCategoryObj =
    selectedCategory === 'All'
      ? null
      : categoryList.find(
          (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className={`space-y-6 ${className}`} data-testid="category-grid">
      {/* Header & Category Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-travelio-dark-900 tracking-tight">
            Curated Journey Themes
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Explore {totalToursCount} handcrafted journeys across {categoryList.length} unique travel styles
          </p>
        </div>

        {/* Category Pills Bar */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
          role="tablist"
          aria-label="Filter tours by category"
        >
          {/* All Tours Pill */}
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'All'}
            onClick={() => onSelectCategory('All')}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none shrink-0
              ${
                selectedCategory === 'All'
                  ? 'bg-travelio-dark-900 text-white shadow-soft-md scale-[1.02]'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/90 shadow-sm'
              }
            `.trim()}
          >
            <Sparkles className={`w-4 h-4 ${selectedCategory === 'All' ? 'text-travelio-gold-400' : 'text-zinc-500'}`} />
            <span>All Tours</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                selectedCategory === 'All'
                  ? 'bg-white/20 text-white'
                  : 'bg-zinc-100 text-zinc-600'
              }`}
            >
              {totalToursCount}
            </span>
          </button>

          {/* 5 Core Categories */}
          {categoryList.map((cat) => (
            <div key={cat.id} className="shrink-0">
              <CategoryCard
                category={cat}
                isSelected={
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                }
                onClick={() => onSelectCategory(cat.name)}
                variant="pill"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active Category Description Banner */}
      {showDescription && activeCategoryObj && (
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-travelio-gold-600">
                {activeCategoryObj.tagline || activeCategoryObj.title}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-travelio-dark-900">
              {activeCategoryObj.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-3xl leading-relaxed">
              {activeCategoryObj.description}
            </p>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-zinc-100 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-2xl font-bold font-serif text-travelio-dark-900">
              {activeCategoryObj.count}
            </span>
            <span className="text-xs text-zinc-500">Available Packages</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
