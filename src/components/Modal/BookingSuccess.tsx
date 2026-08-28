import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Users,
  MapPin,
  Compass,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { BookingInquiry } from '@/types';
import { Button } from '@/components/common/Button';

export interface BookingSuccessProps {
  inquiry: BookingInquiry;
  onClose: () => void;
  onExploreMore?: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({
  inquiry,
  onClose,
  onExploreMore,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { formData, referenceNumber, tourTitle, submittedAt } = inquiry;

  const handleCopyReference = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExplore = () => {
    if (onExploreMore) {
      onExploreMore();
    } else {
      onClose();
      const toursSection = document.getElementById('tours');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 animate-fade-in text-travelio-dark-900">
      {/* Header with Luxury Badge & Title */}
      <div className="text-center space-y-3 pt-2">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-scale-up">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-travelio-gold-100 text-travelio-gold-800 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-travelio-gold-600" />
            Inquiry Confirmed
          </div>
          <h3
            id="booking-modal-title"
            className="text-2xl sm:text-3xl font-serif font-bold text-travelio-dark-900"
          >
            Your Journey Awaits
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
            Thank you, <strong className="text-travelio-dark-900">{formData.fullName}</strong>. We've received your bespoke travel request.
          </p>
        </div>
      </div>

      {/* Booking Reference Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-travelio-dark-900 to-travelio-dark-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/10">
        <div className="text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-travelio-gold-400 block">
            Booking Reference ID
          </span>
          <span className="text-lg sm:text-xl font-mono font-bold tracking-wider text-white">
            {referenceNumber}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyReference}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors border border-white/10 active:scale-95"
          aria-label="Copy booking reference number"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-300" />
              <span>Copy ID</span>
            </>
          )}
        </button>
      </div>

      {/* Inquiry Summary Grid */}
      <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-4 sm:p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3">
          <h4 className="font-semibold text-zinc-800 uppercase tracking-wider text-[11px]">
            Inquiry Summary
          </h4>
          <span className="text-zinc-500 text-[11px]">Submitted {formattedDate}</span>
        </div>

        {tourTitle && (
          <div className="pb-3 border-b border-zinc-200/60 flex items-center justify-between">
            <span className="text-zinc-500 font-medium">Selected Itinerary:</span>
            <span className="font-semibold text-travelio-dark-900 text-right truncate max-w-[220px]">
              {tourTitle}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Destination</span>
              <span className="font-semibold text-zinc-800">{formData.destination}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Category</span>
              <span className="font-semibold text-zinc-800">{formData.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Travel Date</span>
              <span className="font-semibold text-zinc-800">{formData.travelDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Duration</span>
              <span className="font-semibold text-zinc-800">{formData.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Travelers</span>
              <span className="font-semibold text-zinc-800">
                {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-travelio-gold-600 shrink-0">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wide">Target Budget</span>
              <span className="font-semibold text-zinc-800">{formData.budget}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-600 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{formData.email}</span>
          </div>
          {formData.phone && (
            <div className="flex items-center gap-1.5 truncate">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{formData.phone}</span>
            </div>
          )}
        </div>

        {formData.specialRequests && (
          <div className="pt-2 border-t border-zinc-200/60 text-zinc-600">
            <span className="text-zinc-500 font-medium block text-[10px] uppercase tracking-wide mb-1">
              Special Passions / Notes:
            </span>
            <p className="italic bg-white p-2.5 rounded-xl border border-zinc-200 text-zinc-700 leading-relaxed">
              "{formData.specialRequests}"
            </p>
          </div>
        )}
      </div>

      {/* Next Steps Card */}
      <div className="p-4 rounded-2xl bg-travelio-gold-50 border border-travelio-gold-200/80 space-y-2 text-xs">
        <h5 className="font-serif font-bold text-travelio-dark-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-travelio-gold-600" />
          What Happens Next?
        </h5>
        <p className="text-zinc-600 leading-relaxed">
          A Travelio destination specialist will contact you within <strong>24 hours</strong> with a tailored proposal, recommended boutique stays, and personalized excursion options.
        </p>
        <div className="pt-1 text-[11px] text-zinc-500 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Concierge: concierge@travelio.luxury</span>
          <span>Phone: +1 (800) 555-TRAVEL</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Close
        </Button>
        <Button
          type="button"
          variant="gold"
          size="md"
          onClick={handleExplore}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <span>Explore More Tours</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccess;
