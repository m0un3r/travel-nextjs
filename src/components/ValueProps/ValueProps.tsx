import React from 'react';
import { Sparkles } from 'lucide-react';
import { valuePillars as defaultValuePillars, ValuePillar } from '@/data/valueProps';
import { FeatureCard } from './FeatureCard';

export interface ValuePropsProps {
  pillars?: ValuePillar[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ValueProps: React.FC<ValuePropsProps> = ({
  pillars = defaultValuePillars,
  title = 'Our Promise to You',
  subtitle = 'Crafted with precision, delivered with authentic hospitality, and protected by comprehensive guarantees.',
  className = '',
}) => {
  return (
    <section
      id="about"
      className={`bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-zinc-200 shadow-soft-sm space-y-12 scroll-mt-24 ${className}`}
      data-testid="value-props-section"
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-travelio-gold-50 text-travelio-gold-800 border border-travelio-gold-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-travelio-gold-600" />
          <span>The Travelio Standard</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-travelio-dark-900 tracking-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div
        data-testid="value-pillars-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {pillars.map((pillar, idx) => (
          <FeatureCard key={pillar.id} pillar={pillar} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
