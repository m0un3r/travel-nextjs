import React, { useEffect } from 'react';
import { X, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from './NavLinks';
import { Button } from '@/components/common/Button';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanTripClick?: () => void;
  activeSection?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onPlanTripClick,
  activeSection,
}) => {
  // Close drawer on Escape key
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        data-testid="mobile-menu-backdrop"
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-travelio-dark-900 text-white shadow-2xl border-l border-white/10 flex flex-col justify-between p-6 z-10 animate-slide-up">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-travelio-gold-500 flex items-center justify-center shadow-gold-glow">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif tracking-tight text-white">
                  Travelio
                </span>
                <span className="block text-[10px] uppercase font-semibold text-travelio-gold-400 tracking-wider">
                  Luxury Journeys
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-travelio-gold-500"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id || activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    onClose();
                  }}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all
                    ${
                      isActive
                        ? 'bg-travelio-gold-500/20 text-travelio-gold-300 font-semibold border border-travelio-gold-500/30'
                        : 'text-zinc-200 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-1 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-travelio-gold-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Travel Planning</span>
            </div>
            <p className="text-xs text-zinc-400">
              Speak with a destination specialist today
            </p>
          </div>

          <Button
            variant="gold"
            size="lg"
            fullWidth
            onClick={() => {
              onClose();
              if (onPlanTripClick) {
                onPlanTripClick();
              }
            }}
          >
            Plan a Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
