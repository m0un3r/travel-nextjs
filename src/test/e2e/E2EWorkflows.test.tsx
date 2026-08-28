import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { tours } from '@/data/travelioData';

describe('Tier 4 Real-World End-to-End User Workflows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================================================
  // WORKFLOW A: Search -> Filter -> Detail Modal -> Booking Form -> Confirmation
  // =========================================================================
  it('Workflow A: Search "Japan" -> Select "Nature" -> Open Kyoto detail modal -> Book tour -> Fill inquiry -> Verify TRV-2026-XXXX -> Dismiss', async () => {
    render(<App />);

    // Step 1: In Hero search bar, search for "Japan"
    const destinationInput = screen.getByPlaceholderText(/where to\?/i);
    const exploreToursBtn = screen.getByRole('button', { name: /explore tours/i });

    fireEvent.change(destinationInput, { target: { value: 'Japan' } });
    await userEvent.click(exploreToursBtn);

    // Step 2: Filter by "Nature" category tab
    const natureCategoryTab = screen.getByRole('tab', { name: /nature/i });
    await userEvent.click(natureCategoryTab);

    // Verify Kyoto Cherry Blossoms is in the filtered grid
    const tourGrid = screen.getByTestId('tour-grid');
    expect(within(tourGrid).getByText('Cherry Blossoms of Kyoto & Nara')).toBeInTheDocument();
    // Tokyo City Experience is in Cities, so shouldn't appear under Nature
    expect(within(tourGrid).queryByText('Tokyo & Kyoto City Experience')).not.toBeInTheDocument();

    // Step 3: Open Kyoto Cherry Blossoms Quick-View Detail Modal
    const kyotoCard = screen.getByTestId('tour-card-cherry-blossoms-kyoto-nara');
    const viewDetailsBtn = within(kyotoCard).getByRole('button', {
      name: /view details for cherry blossoms of kyoto & nara/i,
    });
    await userEvent.click(viewDetailsBtn);

    // Step 4: Verify Detail Modal opened with itinerary & highlights
    const detailModal = screen.getByTestId('tour-detail-modal');
    expect(detailModal).toBeInTheDocument();
    expect(within(detailModal).getAllByText('Cherry Blossoms of Kyoto & Nara').length).toBeGreaterThan(0);
    expect(within(detailModal).getByText(/Private early-morning access to Fushimi Inari/i)).toBeInTheDocument();
    expect(within(detailModal).getByText('Arrival in Kyoto & Gion Lantern Walk')).toBeInTheDocument();

    // Step 5: Click "Book This Tour" inside detail modal
    const bookThisTourBtn = within(detailModal).getByRole('button', { name: /book this tour/i });
    await userEvent.click(bookThisTourBtn);

    // Detail modal closes, BookingModal opens
    expect(screen.queryByTestId('tour-detail-modal')).not.toBeInTheDocument();
    const bookingModal = screen.getByRole('dialog', { name: /plan your dream journey/i });
    expect(bookingModal).toBeInTheDocument();

    // Step 6: Verify prefilled tour info banner
    expect(within(bookingModal).getByText('Selected Itinerary')).toBeInTheDocument();
    expect(within(bookingModal).getAllByText('Cherry Blossoms of Kyoto & Nara').length).toBeGreaterThan(0);

    // Step 7: Fill all required and optional form fields
    const nameInput = within(bookingModal).getByLabelText(/full name/i);
    const emailInput = within(bookingModal).getByLabelText(/email address/i);
    const dateInput = within(bookingModal).getByLabelText(/preferred travel date/i);
    const budgetSelect = within(bookingModal).getByLabelText(/budget \/ person/i);
    const specialRequestsInput = within(bookingModal).getByLabelText(/special requests/i);
    const increaseGuestsBtn = within(bookingModal).getByRole('button', { name: /increase guest count/i });

    fireEvent.change(nameInput, { target: { value: 'Dr. Alistair Sterling' } });
    fireEvent.change(emailInput, { target: { value: 'alistair.sterling@oxford.edu' } });
    fireEvent.change(dateInput, { target: { value: '2026-09-18' } });
    await userEvent.click(increaseGuestsBtn); // Increment guests from 2 to 3
    fireEvent.change(budgetSelect, { target: { value: '$5,000 - $7,500' } });
    fireEvent.change(specialRequestsInput, {
      target: { value: 'Private tea master consultation in Gion and garden-view ryokan room.' },
    });

    // Step 8: Submit the inquiry form
    const submitBtn = within(bookingModal).getByRole('button', { name: /submit inquiry/i });
    await userEvent.click(submitBtn);

    // Step 9: Wait for confirmation screen transition
    await waitFor(
      () => {
        expect(within(bookingModal).getByText(/your journey awaits/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Step 10: Verify Booking Reference Number generated with standard format
    const referenceElement = within(bookingModal).getByText(/TRV-2026-\d{4}/i);
    expect(referenceElement).toBeInTheDocument();
    const referenceText = referenceElement.textContent?.trim() || '';
    expect(referenceText).toMatch(/^TRV-2026-\d{4}$/);

    // Verify summary details on confirmation screen
    expect(within(bookingModal).getByText('Inquiry Confirmed')).toBeInTheDocument();
    expect(within(bookingModal).getByText('Dr. Alistair Sterling')).toBeInTheDocument();
    expect(within(bookingModal).getByText('alistair.sterling@oxford.edu')).toBeInTheDocument();
    expect(within(bookingModal).getByText('2026-09-18')).toBeInTheDocument();
    expect(within(bookingModal).getByText('3 Guests')).toBeInTheDocument();
    expect(within(bookingModal).getByText('$5,000 - $7,500')).toBeInTheDocument();
    expect(within(bookingModal).getByText(/What Happens Next\?/i)).toBeInTheDocument();

    // Verify Toast notification appeared in document
    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`Inquiry ${referenceText} received`, 'i'))
      ).toBeInTheDocument();
    });

    // Step 11: Dismiss confirmation modal via Close button
    const closeConfirmationBtn = within(bookingModal).getByRole('button', { name: /close/i });
    await userEvent.click(closeConfirmationBtn);

    // Verify BookingModal is now closed and removed from DOM
    expect(screen.queryByRole('dialog', { name: /plan your dream journey/i })).not.toBeInTheDocument();
  });

  // =========================================================================
  // WORKFLOW B: Mobile Drawer -> Section Navigation -> Form Validation -> Submit
  // =========================================================================
  it('Workflow B: Mobile drawer flow -> open drawer -> trigger validation error -> fill form -> submit -> verify success', async () => {
    render(<App />);

    // Step 1: Trigger mobile menu toggle button (hamburger)
    const mobileMenuToggle = screen.getByRole('button', { name: /open menu/i });
    expect(mobileMenuToggle).toBeInTheDocument();
    await userEvent.click(mobileMenuToggle);

    // Step 2: Verify mobile navigation drawer dialog is open
    const mobileDrawer = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(mobileDrawer).toBeInTheDocument();

    // Step 3: Click mobile "Plan a Trip" CTA button inside drawer
    const mobilePlanTripBtn = within(mobileDrawer).getByRole('button', { name: /plan a trip/i });
    await userEvent.click(mobilePlanTripBtn);

    // Verify mobile drawer closed and BookingModal opened
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
    const bookingModal = screen.getByRole('dialog', { name: /plan your dream journey/i });
    expect(bookingModal).toBeInTheDocument();

    // Step 4: Attempt submission on empty form to trigger validation errors
    const submitBtn = within(bookingModal).getByRole('button', { name: /submit inquiry/i });
    await userEvent.click(submitBtn);

    // Verify all mandatory validation error messages appear
    expect(within(bookingModal).getByText(/full name is required/i)).toBeInTheDocument();
    expect(within(bookingModal).getByText(/email address is required/i)).toBeInTheDocument();
    expect(within(bookingModal).getByText(/please select your preferred travel date/i)).toBeInTheDocument();

    // Step 5: Test invalid email format validation error
    const emailInput = within(bookingModal).getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email-no-at-domain' } });
    await userEvent.click(submitBtn);
    expect(within(bookingModal).getByText(/please enter a valid email address/i)).toBeInTheDocument();

    // Step 6: Fill all required fields with valid data
    const nameInput = within(bookingModal).getByLabelText(/full name/i);
    const dateInput = within(bookingModal).getByLabelText(/preferred travel date/i);
    const destinationSelect = within(bookingModal).getByLabelText(/destination/i);
    const categorySelect = within(bookingModal).getByLabelText(/travel style \/ category/i);

    fireEvent.change(nameInput, { target: { value: 'Lady Genevieve Vance' } });
    fireEvent.change(emailInput, { target: { value: 'genevieve.vance@voyager.co.uk' } });
    fireEvent.change(dateInput, { target: { value: '2026-11-15' } });
    fireEvent.change(destinationSelect, { target: { value: 'Morocco' } });
    fireEvent.change(categorySelect, { target: { value: 'Adventure' } });

    // Step 7: Submit valid form
    await userEvent.click(submitBtn);

    // Step 8: Verify success transition and confirmation
    await waitFor(
      () => {
        expect(within(bookingModal).getByText(/your journey awaits/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(within(bookingModal).getByText('Inquiry Confirmed')).toBeInTheDocument();
    expect(within(bookingModal).getByText('Lady Genevieve Vance')).toBeInTheDocument();
    expect(within(bookingModal).getByText('Morocco')).toBeInTheDocument();
    expect(within(bookingModal).getByText('Adventure')).toBeInTheDocument();

    // Dismiss modal
    const exploreMoreBtn = within(bookingModal).getByRole('button', { name: /explore more tours/i });
    await userEvent.click(exploreMoreBtn);

    expect(screen.queryByRole('dialog', { name: /plan your dream journey/i })).not.toBeInTheDocument();
  });

  // =========================================================================
  // WORKFLOW C: Multi-Category Browsing and Exact Tour Count Verification
  // =========================================================================
  it('Workflow C: Category browsing flow (Cities -> Nature -> Adventure -> Honeymoon -> Wildlife), verifying tour counts match each category badge', async () => {
    render(<App />);

    const tourGrid = screen.getByTestId('tour-grid');
    expect(tourGrid).toBeInTheDocument();

    // 1. Initial / All Tours: 19 tours
    expect(screen.getByText('All Handcrafted Journeys')).toBeInTheDocument();
    expect(screen.getByText(/Showing 19 of 19 curated journeys/i)).toBeInTheDocument();
    const allPill = screen.getByRole('tab', { name: /all tours/i });
    expect(within(allPill).getByText('19')).toBeInTheDocument();

    // 2. Browse "Cities" category (6 tours)
    const citiesTab = screen.getByRole('tab', { name: /cities/i });
    expect(within(citiesTab).getByText('6')).toBeInTheDocument();
    await userEvent.click(citiesTab);

    expect(screen.getByText('Cities Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Showing 6 of 19 curated journeys/i)).toBeInTheDocument();
    const cityTours = tours.filter((t) => t.category === 'Cities');
    cityTours.forEach((t) => {
      expect(within(tourGrid).getByText(t.title)).toBeInTheDocument();
    });

    // 3. Browse "Nature" category (5 tours)
    const natureTab = screen.getByRole('tab', { name: /nature/i });
    expect(within(natureTab).getByText('5')).toBeInTheDocument();
    await userEvent.click(natureTab);

    expect(screen.getByText('Nature Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Showing 5 of 19 curated journeys/i)).toBeInTheDocument();
    const natureTours = tours.filter((t) => t.category === 'Nature');
    natureTours.forEach((t) => {
      expect(within(tourGrid).getByText(t.title)).toBeInTheDocument();
    });

    // 4. Browse "Adventure" category (4 tours)
    const adventureTab = screen.getByRole('tab', { name: /adventure/i });
    expect(within(adventureTab).getByText('4')).toBeInTheDocument();
    await userEvent.click(adventureTab);

    expect(screen.getByText('Adventure Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Showing 4 of 19 curated journeys/i)).toBeInTheDocument();
    const adventureTours = tours.filter((t) => t.category === 'Adventure');
    adventureTours.forEach((t) => {
      expect(within(tourGrid).getByText(t.title)).toBeInTheDocument();
    });

    // 5. Browse "Honeymoon" category (2 tours)
    const honeymoonTab = screen.getByRole('tab', { name: /honeymoon/i });
    expect(within(honeymoonTab).getByText('2')).toBeInTheDocument();
    await userEvent.click(honeymoonTab);

    expect(screen.getByText('Honeymoon Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Showing 2 of 19 curated journeys/i)).toBeInTheDocument();
    const honeymoonTours = tours.filter((t) => t.category === 'Honeymoon');
    honeymoonTours.forEach((t) => {
      expect(within(tourGrid).getByText(t.title)).toBeInTheDocument();
    });

    // 6. Browse "Wildlife" category (2 tours)
    const wildlifeTab = screen.getByRole('tab', { name: /wildlife/i });
    expect(within(wildlifeTab).getByText('2')).toBeInTheDocument();
    await userEvent.click(wildlifeTab);

    expect(screen.getByText('Wildlife Experiences')).toBeInTheDocument();
    expect(screen.getByText(/Showing 2 of 19 curated journeys/i)).toBeInTheDocument();
    const wildlifeTours = tours.filter((t) => t.category === 'Wildlife');
    wildlifeTours.forEach((t) => {
      expect(within(tourGrid).getByText(t.title)).toBeInTheDocument();
    });

    // 7. Return to "All Tours"
    await userEvent.click(allPill);
    expect(screen.getByText('All Handcrafted Journeys')).toBeInTheDocument();
    expect(screen.getByText(/Showing 19 of 19 curated journeys/i)).toBeInTheDocument();
  });

  // =========================================================================
  // WORKFLOW D: Footer Newsletter Subscription Flow & Validation
  // =========================================================================
  it('Workflow D: Newsletter subscription flow -> invalid email formats -> valid email submission -> toast confirmation', async () => {
    render(<App />);

    const newsletterInput = screen.getByLabelText(/email address for newsletter/i);
    const subscribeBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

    // Step 1: Submit empty email input
    await userEvent.click(subscribeBtn);
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();

    // Step 2: Submit malformed email inputs (missing @, missing domain)
    fireEvent.change(newsletterInput, { target: { value: 'invalid-user-email' } });
    await userEvent.click(subscribeBtn);
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();

    // Step 3: Clear and submit valid luxury subscriber email
    fireEvent.change(newsletterInput, { target: { value: 'curator@travelio.luxury' } });
    await userEvent.click(subscribeBtn);

    // Step 4: Verify newsletter container updates with VIP welcome state
    await waitFor(() => {
      expect(
        screen.getByText(/welcome to the travelio private circle/i)
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Privilege dossiers sent to curator@travelio.luxury/i)
    ).toBeInTheDocument();

    // Step 5: Verify global Toast alert was fired
    expect(
      screen.getByText(/Thank you for subscribing! Privilege dossiers sent to curator@travelio.luxury/i)
    ).toBeInTheDocument();
  });

  // =========================================================================
  // WORKFLOW E: Keyboard Accessibility & Resilience
  // =========================================================================
  it('Workflow E: Closes modals via Escape key and backdrop overlay clicks', async () => {
    render(<App />);

    // 1. Open TourDetailModal
    const firstTour = tours[0];
    const tourCard = screen.getByTestId(`tour-card-${firstTour.id}`);
    const viewDetailsBtn = within(tourCard).getByRole('button', {
      name: new RegExp(`view details for ${firstTour.title}`, 'i'),
    });
    await userEvent.click(viewDetailsBtn);

    expect(screen.getByTestId('tour-detail-modal')).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByTestId('tour-detail-modal')).not.toBeInTheDocument();

    // 2. Open BookingModal via Navbar
    const planTripButtons = screen.getAllByRole('button', { name: /plan a trip/i });
    await userEvent.click(planTripButtons[0]);

    const bookingModal = screen.getByRole('dialog', { name: /plan your dream journey/i });
    expect(bookingModal).toBeInTheDocument();

    // Close via backdrop click
    const backdrop = screen.getByTestId('booking-modal-overlay');
    await userEvent.click(backdrop);

    expect(screen.queryByRole('dialog', { name: /plan your dream journey/i })).not.toBeInTheDocument();
  });
});
