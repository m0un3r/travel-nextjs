import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { tours, categories, valuePillars, journeySteps, faqs, stories } from '@/data/travelioData';

describe('App Integration Tests (Tiers 1, 2, and 3)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================================================
  // TIER 1: Smoke & Full Application Mount Tests
  // =========================================================================
  describe('Tier 1: Full App Mount & Layout Section Integrity', () => {
    it('renders the complete application shell without crashing', () => {
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders the sticky navigation bar with brand, links, and CTA button', () => {
      render(<App />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      // Brand Logo & Founding Tagline inside header
      expect(within(header).getByText('Travelio')).toBeInTheDocument();
      expect(within(header).getByText(/Since 2009/i)).toBeInTheDocument();

      // Navigation Links inside header
      expect(within(header).getByRole('link', { name: /^tours$/i })).toBeInTheDocument();
      expect(within(header).getByRole('link', { name: /^categories$/i })).toBeInTheDocument();
      expect(within(header).getByRole('link', { name: /^about us$/i })).toBeInTheDocument();
      expect(within(header).getByRole('link', { name: /^reviews$/i })).toBeInTheDocument();
      expect(within(header).getByRole('link', { name: /^faq$/i })).toBeInTheDocument();

      // Plan a Trip CTA in navbar
      const planTripButtons = screen.getAllByRole('button', { name: /plan a trip/i });
      expect(planTripButtons.length).toBeGreaterThan(0);
    });

    it('renders the hero section with headline, stats, and search bar', () => {
      render(<App />);

      const hero = screen.getByTestId('hero-section');
      expect(hero).toBeInTheDocument();

      // Hero Headline & Tagline
      expect(
        within(hero).getByRole('heading', { level: 1, name: /travel beyond the ordinary/i })
      ).toBeInTheDocument();
      expect(
        within(hero).getByText(/Handpicked destinations, curated itineraries, and boutique local expertise/i)
      ).toBeInTheDocument();

      // Social Proof & Trust Stats
      const heroStats = screen.getByTestId('hero-stats');
      expect(heroStats).toBeInTheDocument();
      expect(within(heroStats).getByText(/5\.0 Star Rating/i)).toBeInTheDocument();
      expect(within(heroStats).getByText(/12,000\+/i)).toBeInTheDocument();
      expect(within(heroStats).getByText(/80\+/i)).toBeInTheDocument();

      // Hero Search Controls
      expect(within(hero).getByPlaceholderText(/where to\?/i)).toBeInTheDocument();
      expect(within(hero).getByRole('button', { name: /explore tours/i })).toBeInTheDocument();
    });

    it('renders the category discovery section with all 5 core categories and counters', () => {
      render(<App />);

      expect(screen.getByText(/Curated Journey Themes/i)).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /all tours/i })).toBeInTheDocument();

      categories.forEach((cat) => {
        expect(screen.getByRole('tab', { name: new RegExp(cat.name, 'i') })).toBeInTheDocument();
      });
    });

    it('renders the curated tour catalog with initial 19 tours grid', () => {
      render(<App />);

      expect(screen.getByText('All Handcrafted Journeys')).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Showing ${tours.length} of ${tours.length} curated journeys`, 'i'))
      ).toBeInTheDocument();
      expect(screen.getByTestId('tour-grid')).toBeInTheDocument();

      // Verify individual tour cards exist
      tours.slice(0, 5).forEach((t) => {
        expect(screen.getByTestId(`tour-card-${t.id}`)).toBeInTheDocument();
      });
    });

    it('renders the brand value pillars and 4-step journey timeline sections', () => {
      render(<App />);

      expect(screen.getByTestId('value-props-section')).toBeInTheDocument();
      expect(screen.getByText('Our Promise to You')).toBeInTheDocument();
      expect(screen.getByTestId('value-pillars-grid')).toBeInTheDocument();
      expect(screen.getAllByText(valuePillars[0].title).length).toBeGreaterThan(0);

      expect(screen.getByTestId('process-steps-section')).toBeInTheDocument();
      expect(screen.getByText('How Your Bespoke Journey Unfolds')).toBeInTheDocument();
      expect(screen.getByTestId('journey-steps-grid')).toBeInTheDocument();
      expect(screen.getByText(journeySteps[0].title)).toBeInTheDocument();
    });

    it('renders traveler stories and FAQ accordion sections', () => {
      render(<App />);

      // Traveler Stories
      expect(screen.getByTestId('traveler-stories-section')).toBeInTheDocument();
      expect(screen.getByText('Real Stories From Real Journeys')).toBeInTheDocument();
      expect(screen.getByTestId('stories-grid')).toBeInTheDocument();
      expect(screen.getByText(stories[0].author || stories[0].name || '')).toBeInTheDocument();

      // FAQ Accordion
      expect(screen.getByTestId('faq-accordion-section')).toBeInTheDocument();
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByTestId('faq-list')).toBeInTheDocument();
      expect(screen.getByText(faqs[0].question)).toBeInTheDocument();
    });

    it('renders the 4-column rich footer with newsletter signup and navigation links', () => {
      render(<App />);

      expect(screen.getByText('Curated Destinations')).toBeInTheDocument();
      expect(screen.getByText('Travel Styles & Info')).toBeInTheDocument();
      expect(screen.getByText('Insider Dispatches')).toBeInTheDocument();
      expect(screen.getByLabelText(/email address for newsletter/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe to newsletter/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /plan a bespoke trip/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // TIER 2: Advanced Search, Filter & Boundary Combinations
  // =========================================================================
  describe('Tier 2: Advanced Filter and Search Boundary Combinations', () => {
    it('filters tours by country search query in Hero SearchBar', async () => {
      render(<App />);

      const destinationInput = screen.getByPlaceholderText(/where to\?/i);
      const submitSearchButton = screen.getByRole('button', { name: /explore tours/i });

      // Search for "Japan"
      await userEvent.type(destinationInput, 'Japan');
      await userEvent.click(submitSearchButton);

      // Verify filtered results
      const japanTours = tours.filter(
        (t) =>
          (t.country && t.country.toLowerCase().includes('japan')) ||
          (t.location && t.location.toLowerCase().includes('japan'))
      );
      expect(screen.getByText(new RegExp(`Showing ${japanTours.length} of ${tours.length}`, 'i'))).toBeInTheDocument();

      const tourGrid = screen.getByTestId('tour-grid');
      expect(within(tourGrid).getByText('Cherry Blossoms of Kyoto & Nara')).toBeInTheDocument();
      expect(within(tourGrid).getByText('Tokyo & Kyoto City Experience')).toBeInTheDocument();

      // Non-matching tour should not be in the grid
      expect(within(tourGrid).queryByText('Serengeti Great Migration Tour')).not.toBeInTheDocument();
    });

    it('handles search queries with no matching tours, displays empty state, and restores on Reset Filters', async () => {
      render(<App />);

      const destinationInput = screen.getByPlaceholderText(/where to\?/i);
      const submitSearchButton = screen.getByRole('button', { name: /explore tours/i });

      // Search for non-existent destination
      await userEvent.type(destinationInput, 'Atlantis Underwater Kingdom XYZ');
      await userEvent.click(submitSearchButton);

      // Verify empty state is displayed
      expect(screen.getByTestId('tour-list-empty-state')).toBeInTheDocument();
      expect(screen.getByText(/No journeys found/i)).toBeInTheDocument();
      expect(screen.getByText(/Showing 0 of 19 curated journeys/i)).toBeInTheDocument();

      // Click Reset Filters button
      const resetButtons = screen.getAllByRole('button', { name: /reset filters/i });
      expect(resetButtons.length).toBeGreaterThan(0);
      await userEvent.click(resetButtons[0]);

      // All 19 tours should be restored
      expect(screen.queryByTestId('tour-list-empty-state')).not.toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Showing ${tours.length} of ${tours.length} curated journeys`, 'i'))
      ).toBeInTheDocument();
      expect(screen.getByTestId('tour-grid')).toBeInTheDocument();
    });

    it('narrows tours by combining category selection and search query', async () => {
      render(<App />);

      // Step 1: Select "Nature" category tab
      const natureTab = screen.getByRole('tab', { name: /nature/i });
      await userEvent.click(natureTab);

      const natureTours = tours.filter((t) => t.category === 'Nature');
      expect(screen.getByText('Nature Experiences')).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`Showing ${natureTours.length} of 19`, 'i'))).toBeInTheDocument();

      // Step 2: In Hero search, type "Cherry" and search
      const destinationInput = screen.getByPlaceholderText(/where to\?/i);
      const submitSearchButton = screen.getByRole('button', { name: /explore tours/i });

      await userEvent.type(destinationInput, 'Cherry');
      await userEvent.click(submitSearchButton);

      const tourGrid = screen.getByTestId('tour-grid');
      // Only Kyoto Cherry Blossoms should match inside tour grid
      expect(within(tourGrid).getByText('Cherry Blossoms of Kyoto & Nara')).toBeInTheDocument();
      expect(within(tourGrid).queryByText('Iceland Northern Lights Trails')).not.toBeInTheDocument();
      expect(within(tourGrid).queryByText('Tokyo & Kyoto City Experience')).not.toBeInTheDocument();
    });

    it('filters catalog using Footer quick links for destinations and categories', async () => {
      render(<App />);

      // Click "Japan (Tokyo & Kyoto)" quick link in footer
      const japanFooterLink = screen.getByRole('button', { name: 'Japan (Tokyo & Kyoto)' });
      await userEvent.click(japanFooterLink);

      // Verify filtered catalog for Japan
      expect(screen.getByText(/matching "Japan"/i)).toBeInTheDocument();
      const tourGrid = screen.getByTestId('tour-grid');
      expect(within(tourGrid).getByText('Cherry Blossoms of Kyoto & Nara')).toBeInTheDocument();

      // Click "Wildlife & Safari" category quick link in footer
      const wildlifeFooterLink = screen.getByRole('button', { name: 'Wildlife & Safari' });
      await userEvent.click(wildlifeFooterLink);

      // Verify Wildlife category is active and only 2 wildlife tours shown
      expect(screen.getByText('Wildlife Experiences')).toBeInTheDocument();
      const updatedGrid = screen.getByTestId('tour-grid');
      expect(within(updatedGrid).getByText('Serengeti Great Migration Tour')).toBeInTheDocument();
      expect(screen.getByText(/Showing 2 of 19 curated journeys/i)).toBeInTheDocument();
    });

    it('handles adversarial search inputs containing symbols, spaces, and casing gracefully', async () => {
      render(<App />);

      const destinationInput = screen.getByPlaceholderText(/where to\?/i);
      const submitSearchButton = screen.getByRole('button', { name: /explore tours/i });

      // Special characters & spacing: "   jApAn   "
      await userEvent.type(destinationInput, '   jApAn   ');
      await userEvent.click(submitSearchButton);

      const tourGrid = screen.getByTestId('tour-grid');
      expect(within(tourGrid).getByText('Cherry Blossoms of Kyoto & Nara')).toBeInTheDocument();
      expect(within(tourGrid).getByText('Tokyo & Kyoto City Experience')).toBeInTheDocument();

      // Clear and type non-existent symbols: "<script>alert('hack')</script>"
      await userEvent.clear(destinationInput);
      await userEvent.type(destinationInput, "<script>alert('hack')</script>");
      await userEvent.click(submitSearchButton);

      expect(screen.getByTestId('tour-list-empty-state')).toBeInTheDocument();
      expect(screen.getByText(/No journeys found/i)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // TIER 3: Cross-Feature Modal & Component Interactions
  // =========================================================================
  describe('Tier 3: Cross-Feature Interactions and Modal Synchronization', () => {
    it('opens BookingModal via Navbar CTA without prefilled tour and closes cleanly', async () => {
      render(<App />);

      const planTripButtons = screen.getAllByRole('button', { name: /plan a trip/i });
      await userEvent.click(planTripButtons[0]);

      // Verify modal is open and has default fields
      const modal = screen.getByRole('dialog', { name: /plan your dream journey/i });
      expect(modal).toBeInTheDocument();
      expect(screen.getByText('Personalized bespoke travel planning crafted by experts')).toBeInTheDocument();

      // Close modal using Cancel button
      const cancelButton = within(modal).getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);

      expect(screen.queryByRole('dialog', { name: /plan your dream journey/i })).not.toBeInTheDocument();
    });

    it('opens TourDetailModal when clicking "View Details" on a TourCard and displays full itinerary', async () => {
      render(<App />);

      const kyotoCard = screen.getByTestId('tour-card-cherry-blossoms-kyoto-nara');
      const viewDetailsBtn = within(kyotoCard).getByRole('button', {
        name: /view details for cherry blossoms of kyoto & nara/i,
      });

      await userEvent.click(viewDetailsBtn);

      // Verify TourDetailModal is open
      const detailModal = screen.getByTestId('tour-detail-modal');
      expect(detailModal).toBeInTheDocument();
      expect(within(detailModal).getAllByText('Cherry Blossoms of Kyoto & Nara').length).toBeGreaterThan(0);
      expect(within(detailModal).getByText(/Private early-morning access to Fushimi Inari/i)).toBeInTheDocument();
      expect(within(detailModal).getByText('Arrival in Kyoto & Gion Lantern Walk')).toBeInTheDocument();

      // Close TourDetailModal via close button
      const closeBtn = within(detailModal).getByRole('button', { name: /close modal/i });
      await userEvent.click(closeBtn);

      expect(screen.queryByTestId('tour-detail-modal')).not.toBeInTheDocument();
    });

    it('transitions seamlessly from TourDetailModal to BookingModal with prefilled tour data when clicking "Book This Tour"', async () => {
      render(<App />);

      // Open detail modal for Maldives
      const maldivesCard = screen.getByTestId('tour-card-maldives-island-getaway');
      const viewDetailsBtn = within(maldivesCard).getByRole('button', {
        name: /view details for maldives island getaway/i,
      });
      await userEvent.click(viewDetailsBtn);

      const detailModal = screen.getByTestId('tour-detail-modal');
      expect(detailModal).toBeInTheDocument();

      // Click "Book This Tour" inside detail modal
      const bookThisTourBtn = within(detailModal).getByRole('button', { name: /book this tour/i });
      await userEvent.click(bookThisTourBtn);

      // TourDetailModal should be closed and BookingModal should be open with Maldives prefilled
      expect(screen.queryByTestId('tour-detail-modal')).not.toBeInTheDocument();

      const bookingModal = screen.getByRole('dialog', { name: /plan your dream journey/i });
      expect(bookingModal).toBeInTheDocument();
      expect(within(bookingModal).getByText('Selected Itinerary')).toBeInTheDocument();
      expect(within(bookingModal).getAllByText('Maldives Island Getaway').length).toBeGreaterThan(0);

      // Destination should be prefilled to Maldives
      const destSelect = within(bookingModal).getByLabelText(/destination/i) as HTMLSelectElement;
      expect(destSelect.value).toBe('Maldives');
    });

    it('prefills BookingModal directly when clicking "Book Now" on a TourCard', async () => {
      render(<App />);

      const icelandCard = screen.getByTestId('tour-card-iceland-northern-lights-trails');
      const bookNowBtn = within(icelandCard).getByRole('button', {
        name: /book iceland northern lights trails now/i,
      });

      await userEvent.click(bookNowBtn);

      const bookingModal = screen.getByRole('dialog', { name: /plan your dream journey/i });
      expect(bookingModal).toBeInTheDocument();
      expect(within(bookingModal).getByText('Selected Itinerary')).toBeInTheDocument();
      expect(within(bookingModal).getAllByText('Iceland Northern Lights Trails').length).toBeGreaterThan(0);
    });

    it('opens BookingModal when clicking "Plan a Bespoke Trip" in Footer', async () => {
      render(<App />);

      const footerPlanTripBtn = screen.getByRole('button', { name: /plan a bespoke trip/i });
      await userEvent.click(footerPlanTripBtn);

      expect(screen.getByRole('dialog', { name: /plan your dream journey/i })).toBeInTheDocument();
    });
  });
});
