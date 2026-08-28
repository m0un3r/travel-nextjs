import React from 'react';
import { Star, Users, Globe2, ShieldCheck } from 'lucide-react';
import { brandMetadata, tours } from '@/data/travelioData';

export interface HeroStatsProps {
  className?: string;
}

export const HeroStats: React.FC<HeroStatsProps> = ({ className = '' }) => {
  const stats = [
    {
      id: 'rating',
      icon: <Star className="w-5 h-5 fill-travelio-gold-400 text-travelio-gold-400" />,
      value: `${brandMetadata.rating}`,
      label: '5.0 Star Rating',
      sublabel: '2,000+ Reviews',
      accentColor: 'text-travelio-gold-400',
    },
    {
      id: 'travelers',
      icon: <Users className="w-5 h-5 text-sky-400" />,
      value: brandMetadata.happyTravelers,
      label: 'Happy Travelers',
      sublabel: 'Across 6 Continents',
      accentColor: 'text-white',
    },
    {
      id: 'destinations',
      icon: <Globe2 className="w-5 h-5 text-emerald-400" />,
      value: brandMetadata.destinationsCount,
      label: 'Global Destinations',
      sublabel: `${tours.length}+ Curated Tours`,
      accentColor: 'text-white',
    },
    {
      id: 'satisfaction',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      value: brandMetadata.satisfactionRate,
      label: 'Satisfaction Rate',
      sublabel: 'Verified Feedback',
      accentColor: 'text-white',
    },
  ];

  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mx-auto ${className}`}
      data-testid="hero-stats"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 text-center flex flex-col items-center justify-center space-y-1"
        >
          <div className="flex items-center justify-center gap-1.5">
            {stat.icon}
            <span className={`text-2xl sm:text-3xl font-bold font-serif ${stat.accentColor}`}>
              {stat.value}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-zinc-200">{stat.label}</p>
          <p className="text-[11px] text-zinc-400 font-light">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
