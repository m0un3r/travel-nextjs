## 2026-08-28T10:23:13Z

Scope for Milestone 4 (M4: 'Plan a Trip' Modal, Validation & State, Footer & Toast System):
1. Build Modal components in `travelio_vite_app/src/components/Modal/`:
   - `BookingModal.tsx`: Accessible dialog with focus trap, backdrop blur, Escape key and backdrop click dismiss, smooth transition animations, and prefilled tour support.
   - `BookingForm.tsx`: Multi-field inquiry & booking form:
     - Full Name (required, validation)
     - Email (required, regex validation)
     - Phone (optional/validated)
     - Destination / Country selector (Japan, Morocco, Maldives, Iceland, Tanzania, Canada, Brazil, China, USA, Custom)
     - Category selector (Cities, Nature, Adventure, Honeymoon, Wildlife)
     - Preferred Travel Date (required, date input)
     - Duration selector (3-5 Days, 6-8 Days, 9-12 Days, 13+ Days)
     - Number of Guests (1 to 10+ with stepper or select)
     - Budget Per Person ($1,500 - $10,000+ selector/slider)
     - Special Requests (textarea)
     - Real-time client-side validation errors displayed inline
     - Submitting loading state
   - `BookingSuccess.tsx`: Confirmation state rendering Booking Reference ID (e.g. `TRV-2026-XXXX`), summary of submission details, next steps ("A Travelio destination specialist will contact you within 24 hours"), and "Close" / "Explore More Tours" actions.
   - `index.ts`: Unified module exports.
2. Build Footer components in `travelio_vite_app/src/components/Footer/`:
   - `Footer.tsx`: 4-column rich footer with brand logo, founding tagline ("Crafted Journeys Since 2009"), curated destination quick links, category links, company & trust info, copyright, and newsletter section.
   - `Newsletter.tsx`: Interactive newsletter subscription form with email validation, loading state, and toast alert feedback.
   - `SocialLinks.tsx`: Social icons (Instagram, Twitter/X, Facebook, YouTube, LinkedIn).
   - `index.ts`: Unified module exports.
3. Build Toast notification system and custom hooks:
   - `src/components/common/Toast.tsx`: Toast container and toast item with success, error, and info styles, auto-dismiss, and manual close.
   - `src/hooks/useToast.ts`: Toast management hook with `showToast(type, message, duration)`.
   - `src/hooks/useTourFilter.ts`: Filter hook managing search term, selected category, price range, duration, and filtered tours result.
   - `src/hooks/useBookingModal.ts`: Booking modal hook managing isOpen, prefilledTour, openModal, closeModal.
4. Build Component & Integration Tests in `travelio_vite_app/src/test/components/`:
   - `BookingModal.test.tsx`: Tests opening modal, prefilling tour data, validating required fields (name, email, date), displaying validation errors, submitting valid form, displaying booking reference, and resetting/closing.
   - `Footer.test.tsx`: Tests rendering footer sections, navigation links, newsletter submission with valid/invalid email.
   - `Toast.test.tsx`: Tests toast rendering, message display, and dismiss action.
5. Integrate all state and components into `src/App.tsx`:
   - Navbar, Hero, TourCard, TourDetailModal, and Footer all trigger the booking modal and toast notifications smoothly.
6. Verify:
   - Run `npm run test` (all tests passing).
   - Run `npm run build` (0 errors).
   - Run `npm run lint` (0 errors).
7. Document all commands and results in `c:\Users\GLYTSHU\Desktop\MuseSpark\.agents\worker_m4\handoff.md`.
8. Send a message to parent when done.
