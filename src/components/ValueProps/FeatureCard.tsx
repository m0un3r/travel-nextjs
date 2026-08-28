import React from 'react';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  MapPin,
  HeartHandshake,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';
import { ValuePillar } from '@/data/valueProps';

const iconMap: Record<string, LucideIcon> = {
  Compass,
  ShieldCheck,
  Sparkles,
  MapPin,
  HeartHandshake,
  CheckCircle,
};

export interface FeatureCardProps {
  pillar: ValuePillar;
  index?: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  pillar,
  index,
  className = '',
}) => {
  const IconComponent = iconMap[pillar.icon] || Sparkles;

  return (
    <div
      data-testid={`feature-card-${pillar.id}`}
      className={`
        p-6 sm:p-7 rounded-3xl bg-travelio-sand-50/70 border border-travelio-sand-200/80 
        space-y-4 hover:shadow-soft-md hover:bg-white hover:border-travelio-gold-200 
        transition-all duration-300 flex flex-col justify-between group
        ${className}
      `.trim()}
    >
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-travelio-gold-500/10 text-travelio-gold-700 flex items-center justify-center group-hover:bg-travelio-gold-500 group-hover:text-white transition-colors duration-300 shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>

          {index !== undefined && (
            <span className="text-xs font-mono font-bold text-zinc-300 group-hover:text-travelio-gold-400 transition-colors">
              0{index + 1}
            </span>
          )}
        </div>

        <div>
          {pillar.subtitle && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-travelio-gold-600 block mb-1">
              {pillar.subtitle}
            </span>
          )}
          <h4 className="font-serif font-bold text-lg text-travelio-dark-900 group-hover:text-travelio-gold-700 transition-colors">
            {pillar.title}
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
          {pillar.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
