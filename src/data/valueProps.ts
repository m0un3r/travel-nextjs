export interface ValuePillar {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface JourneyStep {
  step: string;
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BrandMetadata {
  brandName: string;
  tagline: string;
  foundingYear: number;
  rating: number;
  reviewsCountWorldwide: string;
  happyTravelers: string;
  destinationsCount: string;
  packagesCount: string;
  satisfactionRate: string;
}

export interface DestinationLocation {
  slug: string;
  name: string;
  region: string;
  desc: string;
  toursCount: number;
  image: string;
}

export const brandMetadata: BrandMetadata = {
  brandName: 'Travelio',
  tagline: 'Travel Beyond the Ordinary',
  foundingYear: 2009,
  rating: 4.9,
  reviewsCountWorldwide: '2,000+',
  happyTravelers: '12,000+',
  destinationsCount: '80+',
  packagesCount: '60+',
  satisfactionRate: '99%',
};

export const valuePillars: ValuePillar[] = [
  {
    id: 'expert-guides',
    icon: 'Compass',
    title: 'Expert Local Guides',
    subtitle: 'Authentic Insider Access',
    description: 'Our certified local guides live and breathe the regions they showcase, unlocking hidden cultural gems and authentic connections.',
  },
  {
    id: 'travel-confidence',
    icon: 'ShieldCheck',
    title: 'Travel With Confidence',
    subtitle: '24/7 Dedicated Concierge',
    description: 'Enjoy guaranteed departures, transparent upfront pricing, flexible rescheduling policies, and 24/7 personalized on-trip support.',
  },
  {
    id: 'custom-trips',
    icon: 'Sparkles',
    title: 'Fully Custom Trips',
    subtitle: 'Tailored to Your Pace',
    description: 'Every journey is handcrafted around your schedule, preferred comfort level, and individual passions — zero cookie-cutter itineraries.',
  },
  {
    id: 'handpicked-destinations',
    icon: 'MapPin',
    title: '80+ Handpicked Destinations',
    subtitle: 'Curated Boutique Stays',
    description: 'From secluded overwater atolls to remote volcanic highlands, we only recommend destinations and lodges we have personally vetted.',
  },
];

export const journeySteps: JourneyStep[] = [
  {
    step: '01',
    number: 'Step 01',
    title: 'Tell Us Your Dream',
    description: 'Share where you want to go, what moves you, and how you love to travel. No rigid questionnaires — just an open, personalized conversation.',
    highlight: 'Personal travel consult',
  },
  {
    step: '02',
    number: 'Step 02',
    title: 'We Craft Your Custom Itinerary',
    description: 'Our dedicated destination specialists curate a day-by-day journey tailored precisely to your rhythm, interests, and style.',
    highlight: 'Tailored 24-48h proposal',
  },
  {
    step: '03',
    number: 'Step 03',
    title: 'Seamless Booking & Prep',
    description: 'We secure boutique accommodations, private transportation, domestic transit, and VIP permits with zero hassle on your end.',
    highlight: 'Guaranteed reservations',
  },
  {
    step: '04',
    number: 'Step 04',
    title: 'Travel Beyond the Ordinary',
    description: 'Step into the world with complete peace of mind, guided by our local insiders and supported 24/7 by our dedicated concierge.',
    highlight: '24/7 on-trip concierge',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the planning process work?',
    answer: 'Once you share your travel vision and preferences, our destination specialists prepare a personalized day-by-day draft. We collaborate closely to refine every detail until it fits your dream trip perfectly before finalizing reservations.',
    category: 'Planning',
  },
  {
    id: 'faq-2',
    question: 'How long does it take to receive a travel plan?',
    answer: 'You will typically receive an initial handcrafted travel itinerary proposal within 24 to 48 hours of submitting your inquiry.',
    category: 'Timing',
  },
  {
    id: 'faq-3',
    question: 'Can I customize any of the existing tour packages?',
    answer: 'Absolutely. Every tour package shown on Travelio is 100% customizable. You can adjust duration, upgrade accommodations, add private excursions, or change destinations to suit your exact schedule.',
    category: 'Customization',
  },
  {
    id: 'faq-4',
    question: 'Do you handle all bookings and transport reservations?',
    answer: 'Yes! We handle all boutique hotel bookings, private chauffeured transfers, domestic rail passes or charter flights, certified guides, and priority attraction tickets.',
    category: 'Logistics',
  },
  {
    id: 'faq-5',
    question: 'What if I need changes or assistance during my trip?',
    answer: 'Our 24/7 Travel Concierge is available around the clock via WhatsApp, phone, and email to assist with real-time adjustments, restaurant reservations, or itinerary modifications.',
    category: 'Support',
  },
];

export const destinationLocations: DestinationLocation[] = [
  {
    slug: 'japan',
    name: 'Japan',
    region: 'Asia · East Asia',
    desc: 'Quiet temples, neon-lit streets, and seasons shifting in perfect harmony.',
    toursCount: 3,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'morocco',
    name: 'Morocco',
    region: 'Africa · North Africa',
    desc: 'Vibrant medinas, spice-scented souks, and starlit Sahara dunes.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'iceland',
    name: 'Iceland',
    region: 'Europe · Nordic',
    desc: 'Glaciers, geothermal springs, black sand beaches, and Northern Lights.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    region: 'South Asia · Indian Ocean',
    desc: 'Overwater bungalows, crystal lagoons, and peaceful secluded atolls.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'china',
    name: 'China',
    region: 'Asia · East Asia',
    desc: 'Ancient dynasties meet futuristic skylines and karst mountain wonders.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'tanzania',
    name: 'Tanzania',
    region: 'East Africa',
    desc: 'The Great Migration, endless Serengeti plains, and majestic wildlife.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'brazil',
    name: 'Brazil',
    region: 'South America',
    desc: 'Rhythm of Rio, lush rainforests, and vibrant coastal culture.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'canada',
    name: 'Canada',
    region: 'North America',
    desc: 'Emerald alpine lakes, rugged Rockies, and cosmopolitan cityscapes.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'usa',
    name: 'USA',
    region: 'North America',
    desc: 'Iconic national parks, coast-to-coast wonders, and diverse cultural hubs.',
    toursCount: 2,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  },
];
