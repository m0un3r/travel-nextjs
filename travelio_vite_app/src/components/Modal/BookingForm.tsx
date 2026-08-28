import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Compass,
  DollarSign,
  Clock,
  Mail,
  User,
  Phone,
  MessageSquare,
  Loader2,
  Check,
} from 'lucide-react';
import { Tour, PlanTripFormData, FormValidationErrors, BookingInquiry } from '@/types';
import { Button } from '@/components/common/Button';

export interface BookingFormProps {
  prefilledTour?: Tour | null;
  onSubmitSuccess: (inquiry: BookingInquiry) => void;
  onCancel: () => void;
}

const DESTINATION_OPTIONS = [
  { value: 'Japan', label: 'Japan (Tokyo, Kyoto, Mt. Fuji)' },
  { value: 'Morocco', label: 'Morocco (Marrakech, Sahara, Fes)' },
  { value: 'Maldives', label: 'Maldives (Private Atolls & Lagoons)' },
  { value: 'Iceland', label: 'Iceland (Glaciers & Northern Lights)' },
  { value: 'Tanzania', label: 'Tanzania (Serengeti Safari & Ngorongoro)' },
  { value: 'Canada', label: 'Canada (Banff & Canadian Rockies)' },
  { value: 'Brazil', label: 'Brazil (Rio de Janeiro & Amazon)' },
  { value: 'China', label: 'China (Dynasties & Guilin Karst)' },
  { value: 'USA', label: 'USA (Grand Canyon & Yellowstone)' },
  { value: 'Custom', label: 'Custom / Multiple Destinations' },
];

const CATEGORY_OPTIONS = [
  { value: 'Cities', label: 'Cities (Culture, Dining & Architecture)' },
  { value: 'Nature', label: 'Nature (Lakes, Fjords & Stargazing)' },
  { value: 'Adventure', label: 'Adventure (Glaciers, Treks & Safaris)' },
  { value: 'Honeymoon', label: 'Honeymoon (Overwater Villas & Romance)' },
  { value: 'Wildlife', label: 'Wildlife (Big Five & Marine Life)' },
];

const DURATION_OPTIONS = [
  { value: '3-5 Days', label: '3-5 Days (Short Escape)' },
  { value: '6-8 Days', label: '6-8 Days (Classic Journey)' },
  { value: '9-12 Days', label: '9-12 Days (Grand Expedition)' },
  { value: '13+ Days', label: '13+ Days (Immersive Odyssey)' },
];

const BUDGET_OPTIONS = [
  { value: '$1,500 - $2,500', label: '$1,500 - $2,500 per person' },
  { value: '$2,500 - $5,000', label: '$2,500 - $5,000 per person' },
  { value: '$5,000 - $7,500', label: '$5,000 - $7,500 per person' },
  { value: '$7,500 - $10,000', label: '$7,500 - $10,000 per person' },
  { value: '$10,000+', label: '$10,000+ per person (Ultra-Luxury)' },
];

export const BookingForm: React.FC<BookingFormProps> = ({
  prefilledTour,
  onSubmitSuccess,
  onCancel,
}) => {
  const getInitialDestination = (tour?: Tour | null): string => {
    if (!tour) return 'Japan';
    if (tour.country) {
      const match = DESTINATION_OPTIONS.find(
        (d) => d.value.toLowerCase() === tour.country?.toLowerCase()
      );
      if (match) return match.value;
    }
    return tour.location || 'Custom';
  };

  const getInitialCategory = (tour?: Tour | null): string => {
    if (!tour) return 'Cities';
    return tour.category || 'Cities';
  };

  const getInitialDuration = (tour?: Tour | null): string => {
    if (!tour) return '6-8 Days';
    if (tour.days <= 5) return '3-5 Days';
    if (tour.days <= 8) return '6-8 Days';
    if (tour.days <= 12) return '9-12 Days';
    return '13+ Days';
  };

  const getInitialBudget = (tour?: Tour | null): string => {
    if (!tour) return '$2,500 - $5,000';
    if (tour.price <= 2500) return '$1,500 - $2,500';
    if (tour.price <= 5000) return '$2,500 - $5,000';
    if (tour.price <= 7500) return '$5,000 - $7,500';
    if (tour.price <= 10000) return '$7,500 - $10,000';
    return '$10,000+';
  };

  const [formData, setFormData] = useState<PlanTripFormData>({
    fullName: '',
    email: '',
    phone: '',
    destination: getInitialDestination(prefilledTour),
    category: getInitialCategory(prefilledTour),
    travelDate: '',
    duration: getInitialDuration(prefilledTour),
    guests: 2,
    budget: getInitialBudget(prefilledTour),
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync state when prefilledTour changes
  useEffect(() => {
    if (prefilledTour) {
      setFormData((prev) => ({
        ...prev,
        destination: getInitialDestination(prefilledTour),
        category: getInitialCategory(prefilledTour),
        duration: getInitialDuration(prefilledTour),
        budget: getInitialBudget(prefilledTour),
      }));
    }
  }, [prefilledTour]);

  const validateField = (name: keyof PlanTripFormData, value: any): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Full name is required (at least 2 characters)';
        }
        return undefined;

      case 'email': {
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com)';
        }
        return undefined;
      }

      case 'phone': {
        if (value && typeof value === 'string' && value.trim()) {
          const cleanPhone = value.replace(/[\s\-\(\)\+]/g, '');
          if (cleanPhone.length < 7 || !/^\d+$/.test(cleanPhone)) {
            return 'Please enter a valid phone number (at least 7 digits)';
          }
        }
        return undefined;
      }

      case 'destination':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Please select a destination';
        }
        return undefined;

      case 'travelDate':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Please select your preferred travel date';
        }
        return undefined;

      case 'guests':
        if (typeof value !== 'number' || value < 1 || isNaN(value)) {
          return 'Number of guests must be at least 1';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const finalValue = name === 'guests' ? Math.max(1, parseInt(value, 10) || 1) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (touched[name]) {
      const errorMsg = validateField(name as keyof PlanTripFormData, finalValue);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof PlanTripFormData, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleGuestIncrement = () => {
    const nextVal = Math.min(20, (formData.guests || 1) + 1);
    setFormData((prev) => ({ ...prev, guests: nextVal }));
  };

  const handleGuestDecrement = () => {
    const nextVal = Math.max(1, (formData.guests || 1) - 1);
    setFormData((prev) => ({ ...prev, guests: nextVal }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {
      fullName: true,
      email: true,
      phone: true,
      destination: true,
      category: true,
      travelDate: true,
      duration: true,
      guests: true,
      budget: true,
      specialRequests: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormValidationErrors = {};
    (Object.keys(formData) as Array<keyof PlanTripFormData>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
      }
    });

    setErrors(newErrors);

    // If any validation errors, abort
    if (Object.values(newErrors).some((val) => Boolean(val))) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real async request delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const referenceNumber = `TRV-2026-${randomSuffix}`;

      const inquiry: BookingInquiry = {
        id: `inquiry-${Date.now()}`,
        referenceNumber,
        formData: { ...formData },
        tourId: prefilledTour?.id,
        tourTitle: prefilledTour?.title,
        submittedAt: new Date().toISOString(),
        status: 'received',
      };

      onSubmitSuccess(inquiry);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Prefilled Tour Banner */}
      {prefilledTour && (
        <div className="p-3.5 rounded-2xl bg-travelio-gold-50 border border-travelio-gold-200/80 flex items-center gap-3.5 shadow-sm">
          <img
            src={prefilledTour.image}
            alt={prefilledTour.title}
            className="w-12 h-12 rounded-xl object-cover border border-travelio-gold-300/50 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-travelio-gold-800 bg-travelio-gold-200/70 px-2 py-0.5 rounded-md">
                Selected Itinerary
              </span>
              <span className="text-xs font-semibold text-travelio-dark-900 truncate">
                {prefilledTour.duration}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-serif font-bold text-travelio-dark-900 truncate">
              {prefilledTour.title}
            </h4>
            <p className="text-[11px] text-zinc-600 truncate">
              {prefilledTour.location} · {prefilledTour.priceFormatted} per person
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Full Name <span className="text-travelio-gold-600">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Eleanor Vance"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`
                block w-full rounded-xl text-sm pl-10 pr-3.5 py-2.5 bg-white text-zinc-900 placeholder:text-zinc-400 border transition-all duration-200
                ${
                  errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400
              `}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-600 font-medium">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Email Address <span className="text-travelio-gold-600">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="eleanor@example.com"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`
                block w-full rounded-xl text-sm pl-10 pr-3.5 py-2.5 bg-white text-zinc-900 placeholder:text-zinc-400 border transition-all duration-200
                ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400
              `}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-red-600 font-medium">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Phone Number <span className="text-zinc-400 font-normal normal-case">(Optional)</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 234-5678"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`
                block w-full rounded-xl text-sm pl-10 pr-3.5 py-2.5 bg-white text-zinc-900 placeholder:text-zinc-400 border transition-all duration-200
                ${
                  errors.phone
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400
              `}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-600 font-medium">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Destination / Country */}
        <div className="space-y-1.5">
          <label
            htmlFor="destination"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Destination <span className="text-travelio-gold-600">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.destination)}
              aria-describedby={errors.destination ? 'destination-error' : undefined}
              className={`
                block w-full rounded-xl text-sm pl-10 pr-8 py-2.5 bg-white text-zinc-900 border transition-all duration-200 appearance-none cursor-pointer
                ${
                  errors.destination
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400
              `}
            >
              {DESTINATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {errors.destination && (
            <p id="destination-error" className="text-xs text-red-600 font-medium">
              {errors.destination}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category Selector */}
        <div className="space-y-1.5">
          <label
            htmlFor="category"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Travel Style / Category
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Compass className="w-4 h-4" />
            </div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full rounded-xl text-sm pl-10 pr-8 py-2.5 bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Travel Date */}
        <div className="space-y-1.5">
          <label
            htmlFor="travelDate"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Preferred Travel Date <span className="text-travelio-gold-600">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.travelDate)}
              aria-describedby={errors.travelDate ? 'travelDate-error' : undefined}
              className={`
                block w-full rounded-xl text-sm pl-10 pr-3.5 py-2.5 bg-white text-zinc-900 border transition-all duration-200
                ${
                  errors.travelDate
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400
              `}
            />
          </div>
          {errors.travelDate && (
            <p id="travelDate-error" className="text-xs text-red-600 font-medium">
              {errors.travelDate}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Duration */}
        <div className="space-y-1.5">
          <label
            htmlFor="duration"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Trip Duration
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Clock className="w-4 h-4" />
            </div>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full rounded-xl text-sm pl-10 pr-8 py-2.5 bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
            >
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Number of Guests */}
        <div className="space-y-1.5">
          <label
            htmlFor="guests"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Guests
          </label>
          <div className="relative rounded-xl flex items-center border border-zinc-200 hover:border-zinc-300 focus-within:border-travelio-gold-500 focus-within:ring-2 focus-within:ring-travelio-gold-500/20 bg-white">
            <div className="pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Users className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full text-center py-2.5 text-sm bg-transparent text-zinc-900 focus:outline-none"
            />
            <div className="flex items-center pr-1.5 gap-1">
              <button
                type="button"
                onClick={handleGuestDecrement}
                disabled={isSubmitting || formData.guests <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-40 text-xs font-bold transition-colors"
                aria-label="Decrease guest count"
              >
                -
              </button>
              <button
                type="button"
                onClick={handleGuestIncrement}
                disabled={isSubmitting || formData.guests >= 20}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-40 text-xs font-bold transition-colors"
                aria-label="Increase guest count"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Budget Per Person */}
        <div className="space-y-1.5 sm:col-span-1">
          <label
            htmlFor="budget"
            className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
          >
            Budget / Person
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full rounded-xl text-sm pl-10 pr-8 py-2.5 bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1.5">
        <label
          htmlFor="specialRequests"
          className="block text-xs font-semibold text-zinc-700 tracking-wider uppercase"
        >
          Special Requests & Passions <span className="text-zinc-400 font-normal normal-case">(Optional)</span>
        </label>
        <div className="relative rounded-xl">
          <div className="absolute top-3 left-3.5 pointer-events-none text-zinc-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Tell us about special occasions (honeymoon, anniversary), dietary preferences, activity passions, or mobility needs..."
            disabled={isSubmitting}
            className="block w-full rounded-xl text-sm pl-10 pr-3.5 py-2.5 bg-white text-zinc-900 placeholder:text-zinc-400 border border-zinc-200 hover:border-zinc-300 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20 focus:outline-none resize-none transition-all duration-200 disabled:bg-zinc-50"
          />
        </div>
      </div>

      {/* Form Action Footer */}
      <div className="pt-3 border-t border-zinc-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <Sparkles className="w-4 h-4 text-travelio-gold-500 shrink-0" />
          <span>No commitment required · 100% bespoke consult</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="gold"
            size="md"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[170px]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
