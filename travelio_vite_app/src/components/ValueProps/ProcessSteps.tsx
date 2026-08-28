import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { journeySteps as defaultSteps, JourneyStep } from '@/data/valueProps';

export interface ProcessStepsProps {
  steps?: JourneyStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  steps = defaultSteps,
  title = 'How Your Bespoke Journey Unfolds',
  subtitle = 'From your very first spark of inspiration to your journey home, here is how we bring your dream voyage to life.',
  className = '',
}) => {
  return (
    <section
      id="process"
      className={`space-y-12 scroll-mt-24 ${className}`}
      data-testid="process-steps-section"
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-travelio-gold-50 text-travelio-gold-800 border border-travelio-gold-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-travelio-gold-600" />
          <span>Simple 4-Step Process</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-travelio-dark-900 tracking-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 4 Steps Timeline Grid */}
      <div
        data-testid="journey-steps-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
      >
        {steps.map((step, idx) => (
          <div
            key={step.step || idx}
            data-testid={`journey-step-${step.step || idx + 1}`}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-soft-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-5 relative group"
          >
            <div className="space-y-4">
              {/* Step Number & Connector */}
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-travelio-dark-900 text-white font-serif font-bold text-lg flex items-center justify-center shadow-soft-sm group-hover:bg-travelio-gold-600 transition-colors">
                  {step.step}
                </span>

                {step.highlight && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-travelio-sand-100 text-travelio-sand-900 border border-travelio-sand-200">
                    {step.highlight}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-serif font-bold text-travelio-dark-900 group-hover:text-travelio-gold-700 transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-travelio-gold-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 0{idx + 1} of 0{steps.length}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
