import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { SearchBar, SearchState } from './SearchBar';
import { HeroStats } from './HeroStats';
import { brandMetadata } from '@/data/travelioData';

export interface HeroProps {
  onSearch?: (searchState: SearchState) => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreClick }) => {
  const handleScrollToTours = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const toursSection = document.getElementById('tours');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className="relative bg-travelio-dark-950 text-white min-h-[90vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Imagery with Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Travel Landscape"
          className="w-full h-full object-cover object-center opacity-25 scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-travelio-dark-950/90 via-travelio-dark-950/80 to-travelio-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(#FA8F21_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8 my-auto">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-travelio-gold-300 text-xs sm:text-sm font-medium animate-slide-down">
          <Sparkles className="w-4 h-4 text-travelio-gold-400 shrink-0" />
          <span>Crafted Journeys Since {brandMetadata.foundingYear}</span>
        </div>

        {/* Hero Title & Subheading */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
            {brandMetadata.tagline}
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-300 text-base sm:text-xl font-light leading-relaxed">
            Handpicked destinations, curated itineraries, and boutique local expertise so every journey feels made just for you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="pt-2 max-w-4xl mx-auto w-full">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Hero Stats */}
        <div className="pt-8">
          <HeroStats />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 pt-8 mt-auto flex flex-col items-center">
        <button
          type="button"
          onClick={handleScrollToTours}
          className="group flex flex-col items-center gap-1.5 text-zinc-400 hover:text-travelio-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-travelio-gold-500 rounded-lg p-1"
          aria-label="Scroll to tours"
        >
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 group-hover:text-travelio-gold-400 transition-colors">
            Discover Experiences
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-travelio-gold-400 transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
