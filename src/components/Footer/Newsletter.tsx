import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export interface NewsletterProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  onSubscribe,
  className = '',
}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Simulate real subscription delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsSubscribed(true);
      if (onSubscribe) {
        onSubscribe(email.trim());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {isSubscribed ? (
        <div
          role="status"
          className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 flex items-start gap-3 animate-fade-in"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-emerald-300">
              Welcome to the Travelio Private Circle
            </p>
            <p className="text-emerald-400/90 leading-relaxed">
              We've sent a confirmation to <span className="font-medium text-white">{email}</span>. Look out for our quarterly collector's itinerary guide.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>

            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address..."
              disabled={isSubmitting}
              aria-label="Email address for newsletter"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className={`
                block w-full rounded-xl text-xs sm:text-sm pl-10 pr-24 py-2.5 bg-white/5 text-white placeholder:text-zinc-500
                border transition-all duration-200 focus:outline-none
                ${
                  error
                    ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-white/15 hover:border-white/25 focus:border-travelio-gold-500 focus:ring-2 focus:ring-travelio-gold-500/20'
                }
                disabled:opacity-60
              `}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-1 top-1 bottom-1 px-3.5 rounded-lg bg-travelio-gold-500 hover:bg-travelio-gold-600 active:bg-travelio-gold-700 text-travelio-dark-950 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-gold-glow"
              aria-label="Subscribe to newsletter"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {error && (
            <p id="newsletter-error" className="text-xs text-rose-400 font-medium pl-1">
              {error}
            </p>
          )}

          <p className="text-[11px] text-zinc-400 leading-normal pl-1">
            Weekly curated dispatches. Zero spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
