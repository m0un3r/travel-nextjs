# Travelio — Modern Travel & Tour Discovery Platform

A fast, modular, and responsive Single Page Application built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, fully compatible with **Google AI Studio** Build Mode.

## Features

- 🧭 **Curated Tour Catalog**: 19 hand-crafted tours across 5 core categories (Cities, Nature, Adventure, Honeymoon, Wildlife) with ratings, badges, pricing, and duration tags.
- 🔍 **Real-Time Multi-Field Search & Filter**: Live interactive searching by destination, duration, guest count, and category tabs with smooth empty-state recovery.
- 📖 **Interactive Tour Detail Modal**: Rich itineraries, day-by-day highlights, inclusions, and direct "Book This Tour" action triggers.
- 📝 **Plan a Bespoke Trip Booking Modal**: Multi-field booking inquiry form with strict client-side validation, error handling, loading states, and unique booking reference generation (`TRV-2026-XXXX`).
- 🌟 **Traveler Stories & Social Proof**: 8 verified traveler reviews, star ratings, and trust badges.
- 📱 **Fully Responsive Layout**: Desktop glassmorphism navigation, interactive mobile slide-out drawer, 4-column footer with newsletter subscription, and toast notifications.
- ⚡ **Zero Binary Bloat**: 100% lightweight SVGs (Lucide React) and optimized assets with ZERO tracked files > 1MB.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + JSDOM

## Quick Start

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Type Check & Build
```bash
npm run lint
npm run build
```

### Run Tests
```bash
npm test
```

### Pre-Push File Size Audit
```bash
npm run audit:sizes
```

## Repository Structure

```
├── public/                 # Static assets (favicon.svg)
├── scripts/                # Utility scripts (verify_file_sizes.mjs)
├── src/
│   ├── components/         # Modular UI components
│   │   ├── common/         # Button, Input, Select, Badge, Toast, StarRating
│   │   ├── Navbar/         # Header navigation & mobile drawer
│   │   ├── Hero/           # Hero headline, live stats, search bar
│   │   ├── Categories/     # Category pills and cards
│   │   ├── Tours/          # TourList, TourCard, TourDetailModal
│   │   ├── Stories/        # Traveler stories & reviews
│   │   ├── ValueProps/     # Brand promises, process steps, FAQ accordion
│   │   ├── Modal/          # BookingModal, BookingForm, BookingSuccess
│   │   └── Footer/         # 4-column footer, newsletter, social links
│   ├── data/               # Centralized TypeScript dataset
│   ├── hooks/              # Custom React hooks (filter, modal, toast)
│   ├── types/              # TypeScript interface definitions
│   ├── test/               # Comprehensive 5-tier test suite
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entrypoint
│   └── index.css           # Global styles and Tailwind imports
├── index.html              # HTML shell
├── package.json            # Project manifest and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```
