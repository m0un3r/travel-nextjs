# Project: Travelio React + Vite Web Application

## Architecture
- Single Page Application built with React 18 + TypeScript + Vite + Tailwind CSS + Lucide React.
- Modular component hierarchy:
  - **Layout & Navigation**: Navbar (desktop glassmorphism + mobile slide-out drawer), Footer (newsletter signup, 4-column navigation, social links).
  - **Landing & Discovery**: Hero (headline, background, search bar, live stats), CategoryTabs (5 core categories: Cities, Nature, Adventure, Honeymoon, Wildlife with counters), ValueProps (promise pillars & 4-step journey process), FAQ accordion.
  - **Catalog & Views**: TourList, TourCard (pricing, duration, ratings, badges), TourDetailModal (overview, highlights, day-by-day itinerary, inclusions).
  - **Social Proof**: TravelerStories (8 authentic reviews, avatars, 5.0 ratings, quotes), Trust badges.
  - **Interactive Actions**: PlanTripModal (booking inquiry modal with full form validation, error states, booking reference confirmation), Search & Category filter state hook, Toast notification system.
- State Management: Custom React hooks (`useTourFilter`, `useBookingModal`, `useToast`).
- Data Store: Centralized TypeScript store in `src/data/travelioData.ts` (19 tours, 5 categories, 8 reviews, value props, FAQs).
- Zero binary bloat: No files >1MB tracked in git. Modern lightweight SVGs (Lucide) and optimized responsive images.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | App Scaffolding & Configuration | Vite, React 18, TypeScript, Tailwind CSS, Lucide icons, Vitest setup | M1 | Survey |
| 2 | Data Models & Centralized Store | 19 curated tours, 5 categories, 8 stories, value props, FAQs, TypeScript types | M1 | Survey |
| 3 | Responsive Navigation & Mobile Drawer | Sticky header, brand logo, nav links, CTA trigger, mobile drawer with Esc/backdrop | M2 | Survey |
| 4 | Hero Section & Multi-field Search Bar | Headline, value proposition, search bar (destination, category, duration, guests), live stats | M2 | Survey |
| 5 | Category Filter Pills & Counters | 5 categories (Cities, Nature, Adventure, Honeymoon, Wildlife) with active state & tour counts | M2 | Survey |
| 6 | Curated Tour Cards & Grid | 19 tour cards with badges, pricing, duration, ratings, category tags, responsive layout | M3 | Survey |
| 7 | Quick-View Tour Detail Modal | Detailed itinerary, highlights, inclusions, day-by-day plan, direct "Book This Tour" CTA | M3 | Survey |
| 8 | Traveler Stories & Testimonials | 8 real testimonials with traveler avatar, destination, 5-star ratings, quotes | M3 | Survey |
| 9 | Brand Value Propositions & Process | 4 value pillars, 4-step journey roadmap, FAQ accordion | M3 | Survey |
| 10 | Interactive 'Plan a Trip' Modal & Form | Multi-step booking form with name, email, dates, guests, budget, destination, notes | M4 | Survey |
| 11 | Form Validation & Submission State | Strict client-side validation, error messaging, booking reference generation, confirmation screen | M4 | Survey |
| 12 | Global Search, Filter & Toast Feedback | Real-time filtering by search query & category, empty state handling, interactive toast alerts | M4 | Survey |
| 13 | Comprehensive E2E & Component Test Suite | 5 tiers of tests (Tiers 1-4 opaque-box + Tier 5 adversarial) verifying 100% pass | M5 | Survey |
| 14 | Git Hygiene, AI Studio Setup & Remote Push | Zero files >1MB, clean root structure, push to remote origin main branch | M6 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Scaffolding, Theme & Mock Data | Vite + TS + Tailwind + Vitest + Data Store & Types in `travelio_vite_app` | none | DONE |
| M2 | Navigation, Hero & Category Filter | Navbar, Mobile Drawer, Hero, SearchBar, CategoryTabs | M1 | DONE |
| M3 | Tour Cards, Detail Modal & Social Proof | TourCard, TourList, TourDetailModal, TravelerStories, ValueProps, FAQs | M2 | DONE |
| M4 | 'Plan a Trip' Modal, Validation & State | BookingModal, BookingForm, BookingSuccess, Toast system, global filter hook | M3 | DONE |
| M5 | E2E Testing Suite & Adversarial Hardening | Full 5-tier test suite in Vitest + React Testing Library | M4 | IN_PROGRESS (32d19386-efb1-4f48-bb90-f61b13c732f5) |
| M6 | Git Hygiene, Clean Root & Remote Deployment | Size linter (<1MB check), commit, push to GitHub origin main | M5 | PLANNED |

## Interface Contracts
### Data Store ↔ UI Components
- `Tour`: `{ id, slug, title, category, location, country, price, duration, days, nights, rating, reviewCount, badge, image, tagline, description, highlights, inclusions, itinerary }`
- `Category`: `{ id, name, slug, title, description, count, badgeColor, icon }`
- `Review`: `{ id, name, location, tourName, category, rating, quote, story, avatar }`
- `PlanTripFormData`: `{ fullName, email, phone, destination, category, travelDate, duration, guests, budget, specialRequests }`
- `FilterState`: `{ searchTerm, selectedCategory, priceRange, duration }`

## Code Layout
- Target Directory: `c:\Users\GLYTSHU\Desktop\MuseSpark\travelio_vite_app`
- Config & Root: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`
- Source Code:
  - `src/main.tsx` & `src/App.tsx` & `src/index.css`
  - `src/types/` (`tour.ts`, `category.ts`, `story.ts`, `booking.ts`, `filter.ts`)
  - `src/data/` (`travelioData.ts`, `tours.ts`, `categories.ts`, `stories.ts`, `valueProps.ts`, `navLinks.ts`)
  - `src/hooks/` (`useTourFilter.ts`, `useBookingModal.ts`, `useToast.ts`)
  - `src/components/Navbar/` (`Navbar.tsx`, `NavLinks.tsx`, `MobileMenu.tsx`)
  - `src/components/Hero/` (`Hero.tsx`, `SearchBar.tsx`, `HeroStats.tsx`)
  - `src/components/Categories/` (`CategoryGrid.tsx`, `CategoryCard.tsx`)
  - `src/components/Tours/` (`TourList.tsx`, `TourCard.tsx`, `TourDetailModal.tsx`)
  - `src/components/Stories/` (`TravelerStories.tsx`, `StoryCard.tsx`)
  - `src/components/ValueProps/` (`ValueProps.tsx`, `FeatureCard.tsx`, `ProcessSteps.tsx`, `FaqAccordion.tsx`)
  - `src/components/Modal/` (`BookingModal.tsx`, `BookingForm.tsx`, `BookingSuccess.tsx`)
  - `src/components/Footer/` (`Footer.tsx`, `Newsletter.tsx`, `SocialLinks.tsx`)
  - `src/components/common/` (`Button.tsx`, `Input.tsx`, `Select.tsx`, `Badge.tsx`, `StarRating.tsx`, `Toast.tsx`)
  - `src/test/` (`setup.ts`, `components/`, `integration/`)
