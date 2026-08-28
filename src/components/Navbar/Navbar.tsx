import React, { useState, useEffect } from 'react';
import { Compass, Menu } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/common/Button';
import { brandMetadata } from '@/data/travelioData';

export interface NavbarProps {
  onPlanTripClick?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPlanTripClick,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-travelio-dark-900/95 backdrop-blur-md shadow-soft-md border-b border-white/10'
            : 'bg-travelio-dark-900/90 backdrop-blur-sm border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-travelio-gold-500 rounded-xl"
            aria-label="Travelio Home"
          >
            <div className="w-10 h-10 rounded-xl bg-travelio-gold-500 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif">
                {brandMetadata.brandName}
              </span>
              <span className="hidden sm:inline-block ml-3 px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/10 text-travelio-gold-300 border border-white/10">
                Since {brandMetadata.foundingYear}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLinks activeSection={activeSection} />
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="md"
              onClick={onPlanTripClick}
              className="hidden sm:inline-flex"
            >
              Plan a Trip
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-travelio-gold-500 transition-colors"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onPlanTripClick={onPlanTripClick}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
