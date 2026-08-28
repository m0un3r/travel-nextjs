import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqs as defaultFaqs, FaqItem } from '@/data/valueProps';

export interface FaqAccordionProps {
  items?: FaqItem[];
  faqList?: FaqItem[];
  title?: string;
  subtitle?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  faqList,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about planning your next bespoke journey with Travelio.',
  allowMultiple = false,
  className = '',
}) => {
  const faqData = items || faqList || defaultFaqs;
  // Default first FAQ open
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <section
      id="faq"
      className={`bg-travelio-sand-50/80 rounded-3xl p-8 sm:p-12 md:p-16 border border-zinc-200/90 space-y-10 scroll-mt-24 ${className}`}
      data-testid="faq-accordion-section"
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-travelio-gold-50 text-travelio-gold-800 border border-travelio-gold-200 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-travelio-gold-600" />
          <span>Clear Answers</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-travelio-dark-900 tracking-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Accordion Items */}
      <div className="max-w-3xl mx-auto space-y-3.5" data-testid="faq-list">
        {faqData.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={faq.id || index}
              data-testid={`faq-item-${faq.id || index}`}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-soft-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id || index}`}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50/80 transition-colors gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {faq.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 shrink-0">
                      {faq.category}
                    </span>
                  )}
                  <h4 className="text-sm sm:text-base font-bold text-travelio-dark-900 font-sans">
                    {faq.question}
                  </h4>
                </div>

                <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 shrink-0 transition-transform duration-200">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-travelio-gold-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id || index}`}
                  className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-fade-in"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqAccordion;
