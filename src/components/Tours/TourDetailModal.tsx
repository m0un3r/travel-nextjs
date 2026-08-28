import React, { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Compass,
  Calendar,
  Layers,
} from 'lucide-react';
import { Tour } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export interface TourDetailModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: (tour: Tour) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });

  // Reset state when tour changes
  useEffect(() => {
    setActiveImageIndex(0);
    setExpandedDays({ 1: true });
  }, [tour?.id]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tour) return null;

  const gallery = tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : tour.images && tour.images.length > 0
    ? tour.images
    : [tour.image];

  const currentImage = gallery[activeImageIndex] || tour.image;
  const reviews = tour.reviewsCount ?? tour.reviewCount ?? 0;
  const categoryVariant = tour.category.toLowerCase() as
    | 'cities'
    | 'nature'
    | 'adventure'
    | 'honeymoon'
    | 'wildlife';

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const toggleAllDays = (expand: boolean) => {
    const nextState: Record<number, boolean> = {};
    tour.itinerary.forEach((item) => {
      nextState[item.day] = expand;
    });
    setExpandedDays(nextState);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-detail-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      data-testid="tour-detail-modal-backdrop"
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden animate-slide-up relative my-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="tour-detail-modal"
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3 truncate pr-4">
            <Badge
              variant={categoryVariant}
              size="sm"
              className="font-semibold text-travelio-dark-900 shrink-0"
            >
              {tour.category}
            </Badge>
            <h3
              id="tour-detail-modal-title"
              className="text-base sm:text-lg font-serif font-bold text-travelio-dark-900 truncate"
            >
              {tour.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-6 space-y-8 flex-1">
          {/* Hero Gallery Section */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={currentImage}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Badges Over Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-travelio-dark-900 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-travelio-gold-500" />
                  {tour.location}
                  {tour.country && tour.country !== tour.location ? `, ${tour.country}` : ''}
                </span>

                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{tour.rating.toFixed(1)}</span>
                  <span className="text-zinc-300">({reviews} reviews)</span>
                </span>
              </div>

              {tour.badge && (
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3.5 py-1.5 rounded-xl bg-travelio-dark-900/90 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-lg">
                    {tour.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnail Selector */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`
                      relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer
                      ${
                        activeImageIndex === idx
                          ? 'border-travelio-gold-500 ring-2 ring-travelio-gold-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }
                    `}
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-travelio-sand-50/70 border border-travelio-sand-200/80">
            <div>
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">
                Duration
              </span>
              <div className="flex items-center gap-1.5 font-bold text-sm text-travelio-dark-900 mt-0.5">
                <Clock className="w-4 h-4 text-travelio-gold-500" />
                <span>{tour.duration}</span>
              </div>
              <span className="text-[11px] text-zinc-500">
                {tour.days} Days / {tour.nights} Nights
              </span>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">
                Price From
              </span>
              <div className="font-serif font-bold text-lg text-travelio-dark-900">
                {tour.priceFormatted || `$${tour.price.toLocaleString()}`}
              </div>
              <span className="text-[11px] text-zinc-500">{tour.pricePer || '/person'}</span>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">
                Travel Style
              </span>
              <div className="flex items-center gap-1.5 font-bold text-sm text-travelio-dark-900 mt-0.5">
                <Compass className="w-4 h-4 text-travelio-gold-500" />
                <span>{tour.category}</span>
              </div>
              <span className="text-[11px] text-zinc-500">Curated Boutique</span>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">
                Region
              </span>
              <div className="font-bold text-sm text-travelio-dark-900 truncate mt-0.5">
                {tour.region || tour.location}
              </div>
              <span className="text-[11px] text-zinc-500">Verified Itinerary</span>
            </div>
          </div>

          {/* Tour Overview & Description */}
          <div className="space-y-3">
            <h4 className="text-base font-serif font-bold text-travelio-dark-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-travelio-gold-500" />
              <span>Journey Overview</span>
            </h4>
            <p className="text-sm text-zinc-700 leading-relaxed font-sans">
              {tour.overview || tour.description}
            </p>
            {tour.note && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 italic font-serif leading-relaxed">
                "{tour.note}"
              </div>
            )}
          </div>

          {/* Key Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-base font-serif font-bold text-travelio-dark-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-travelio-gold-500" />
                <span>Key Highlights</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tour.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Day-by-Day Itinerary Accordion */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-serif font-bold text-travelio-dark-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-travelio-gold-500" />
                  <span>Day-by-Day Itinerary</span>
                  <span className="text-xs font-sans font-normal text-zinc-500">
                    ({tour.itinerary.length} Days)
                  </span>
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleAllDays(true)}
                    className="text-travelio-gold-700 hover:underline font-medium"
                  >
                    Expand All
                  </button>
                  <span className="text-zinc-300">|</span>
                  <button
                    type="button"
                    onClick={() => toggleAllDays(false)}
                    className="text-zinc-500 hover:underline font-medium"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {tour.itinerary.map((item) => {
                  const isExpanded = !!expandedDays[item.day];
                  return (
                    <div
                      key={item.day}
                      className="border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDay(item.day)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left bg-zinc-50/70 hover:bg-zinc-100/70 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-travelio-dark-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {item.day}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-travelio-dark-900">
                            {item.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white border-t border-zinc-100 text-xs text-zinc-600 space-y-2 leading-relaxed animate-fade-in">
                          <p>{item.description}</p>
                          {(item.activity || item.meals || item.accommodation) && (
                            <div className="pt-2 flex flex-wrap gap-3 text-[11px] text-zinc-500 border-t border-zinc-100">
                              {item.activity && (
                                <span className="flex items-center gap-1 font-medium text-travelio-dark-900">
                                  <Layers className="w-3 h-3 text-travelio-gold-500" />
                                  {item.activity}
                                </span>
                              )}
                              {item.meals && <span>🍽️ {item.meals}</span>}
                              {item.accommodation && <span>🏨 {item.accommodation}</span>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What's Included
                </h5>
                <ul className="space-y-1.5">
                  {tour.inclusions.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-600"
                    >
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  What's Not Included
                </h5>
                <ul className="space-y-1.5">
                  {tour.exclusions.map((exc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-500"
                    >
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer with CTA and Close */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="hidden sm:block">
            <span className="text-xs text-zinc-400 block font-medium">All-Inclusive Journey</span>
            <div className="text-xl font-bold font-serif text-travelio-dark-900">
              {tour.priceFormatted || `$${tour.price.toLocaleString()}`}{' '}
              <span className="text-xs font-normal font-sans text-zinc-500">
                {tour.pricePer || '/person'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="w-1/2 sm:w-auto"
            >
              Close
            </Button>
            <Button
              type="button"
              variant="gold"
              size="md"
              className="w-1/2 sm:w-auto font-bold flex items-center justify-center gap-2"
              onClick={() => {
                onClose();
                onBookNow?.(tour);
              }}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book This Tour</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailModal;
