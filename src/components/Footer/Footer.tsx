import React from 'react';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Headphones,
  Star,
  MapPin,
} from 'lucide-react';
import { brandMetadata, tours, categories, stories } from '@/data/travelioData';
import { Newsletter } from './Newsletter';
import { SocialLinks } from './SocialLinks';

export interface FooterProps {
  onCategoryClick?: (category: string) => void;
  onDestinationClick?: (destination: string) => void;
  onNewsletterSubscribe?: (email: string) => void;
  onPlanTripClick?: () => void;
}

const DESTINATION_LINKS = [
  { name: 'Japan (Tokyo & Kyoto)', value: 'Japan' },
  { name: 'Morocco (Sahara & Marrakech)', value: 'Morocco' },
  { name: 'Iceland (Glaciers & Fjords)', value: 'Iceland' },
  { name: 'Maldives (Private Atolls)', value: 'Maldives' },
  { name: 'Tanzania (Serengeti Safari)', value: 'Tanzania' },
  { name: 'Canada (Banff Rockies)', value: 'Canada' },
  { name: 'Brazil (Rio & Amazon)', value: 'Brazil' },
  { name: 'China (Dynasties & Karst)', value: 'China' },
  { name: 'USA (Grand Canyon & West)', value: 'USA' },
];

const CATEGORY_LINKS = [
  { name: 'Cities & Culture', value: 'Cities' },
  { name: 'Nature & Landscapes', value: 'Nature' },
  { name: 'Adventure & Treks', value: 'Adventure' },
  { name: 'Honeymoon & Luxury', value: 'Honeymoon' },
  { name: 'Wildlife & Safari', value: 'Wildlife' },
];

const COMPANY_LINKS = [
  { name: 'Our Promise & Story', href: '#about' },
  { name: '4-Step Journey Process', href: '#process' },
  { name: 'Traveler Stories & Reviews', href: '#reviews' },
  { name: 'Frequently Asked Questions', href: '#faq' },
  { name: 'Sustainability & Conservation', href: '#about' },
  { name: '24/7 Dedicated Concierge', href: '#about' },
];

export const Footer: React.FC<FooterProps> = ({
  onCategoryClick,
  onDestinationClick,
  onNewsletterSubscribe,
  onPlanTripClick,
}) => {
  const handleDestinationClick = (
    e: React.MouseEvent,
    destinationValue: string
  ) => {
    e.preventDefault();
    if (onDestinationClick) {
      onDestinationClick(destinationValue);
    }
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryLinkClick = (
    e: React.MouseEvent,
    categoryValue: string
  ) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(categoryValue);
    }
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-travelio-dark-950 text-zinc-400 border-t border-white/10 mt-24">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-white/10 bg-travelio-dark-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-travelio-gold-500/10 border border-travelio-gold-500/20 flex items-center justify-center text-travelio-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                100% Protected & Vetted
              </h5>
              <p className="text-[11px] text-zinc-400">
                Guaranteed departures and verified boutique lodges
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-travelio-gold-500/10 border border-travelio-gold-500/20 flex items-center justify-center text-travelio-gold-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                24/7 VIP Concierge
              </h5>
              <p className="text-[11px] text-zinc-400">
                Dedicated personal point of contact on every trip
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-travelio-gold-500/10 border border-travelio-gold-500/20 flex items-center justify-center text-travelio-gold-400 shrink-0">
              <Star className="w-5 h-5 fill-travelio-gold-400 text-travelio-gold-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                4.9/5 Star Satisfaction
              </h5>
              <p className="text-[11px] text-zinc-400">
                Over 2,000+ verified luxury travelers worldwide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-travelio-gold-500/10 border border-travelio-gold-500/20 flex items-center justify-center text-travelio-gold-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Bespoke Itineraries
              </h5>
              <p className="text-[11px] text-zinc-400">
                Zero cookie-cutter tours; 100% custom crafted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-travelio-gold-600 to-travelio-gold-400 flex items-center justify-center text-white shadow-gold-glow">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {brandMetadata.brandName}
              </span>
            </div>

            <p className="text-xs font-semibold text-travelio-gold-400 uppercase tracking-wider">
              Crafted Journeys Since {brandMetadata.foundingYear}
            </p>

            <p className="text-xs leading-relaxed text-zinc-400">
              Curating authentic, high-comfort journeys to the world's most extraordinary destinations. Rooted in local mastery, uncompromising safety, and rare cultural access.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase font-bold text-zinc-300 tracking-wider block mb-2.5">
                Connect With Us
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Column 2: Curated Destinations */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
              <MapPin className="w-4 h-4 text-travelio-gold-400" />
              <span>Curated Destinations</span>
            </h4>

            <ul className="space-y-2.5 text-xs">
              {DESTINATION_LINKS.map((dest) => (
                <li key={dest.value}>
                  <button
                    type="button"
                    onClick={(e) => handleDestinationClick(e, dest.value)}
                    className="hover:text-travelio-gold-400 transition-colors text-left flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-travelio-gold-400 transition-colors" />
                    <span>{dest.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Travel Styles & Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
              <Compass className="w-4 h-4 text-travelio-gold-400" />
              <span>Travel Styles & Info</span>
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2">
                  Themes & Styles
                </span>
                <ul className="space-y-2">
                  {CATEGORY_LINKS.map((cat) => (
                    <li key={cat.value}>
                      <button
                        type="button"
                        onClick={(e) => handleCategoryLinkClick(e, cat.value)}
                        className="hover:text-travelio-gold-400 transition-colors text-left flex items-center gap-1.5 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-travelio-gold-400 transition-colors" />
                        <span>{cat.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2">
                  Trust & Support
                </span>
                <ul className="space-y-1.5">
                  {COMPANY_LINKS.slice(0, 3).map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Concierge Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-travelio-gold-400" />
              <span>Insider Dispatches</span>
            </h4>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive secret departure announcements, luxury lodge debuts, and insider travel dossiers directly from our curators.
            </p>

            <Newsletter onSubscribe={onNewsletterSubscribe} />

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                24/7 Dedicated Concierge
              </span>
              <div className="space-y-1 text-zinc-300">
                <p className="font-mono text-travelio-gold-400 font-semibold">
                  concierge@travelio.luxury
                </p>
                <p>+1 (800) 555-TRAVEL</p>
              </div>

              {onPlanTripClick && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onPlanTripClick}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-travelio-gold-500/20 text-travelio-gold-400 hover:text-travelio-gold-300 border border-travelio-gold-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plan a Bespoke Trip</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar / Copyright */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 bg-travelio-dark-950/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <p>© 2009–2026 Travelio Inc. All rights reserved.</p>
            <a href="#about" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#about" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <a href="#about" className="hover:text-zinc-300 transition-colors">
              Cookie Preferences
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
              {tours.length} Curated Tours
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
              {categories.length} Categories
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
              {stories.length} Verified Stories
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
              80+ Global Destinations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
