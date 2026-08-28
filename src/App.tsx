import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/Categories';
import { TourList, TourDetailModal } from '@/components/Tours';
import { ValueProps, ProcessSteps, FaqAccordion } from '@/components/ValueProps';
import { TravelerStories } from '@/components/Stories';
import { BookingModal } from '@/components/Modal';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/components/common';
import { useToast, useTourFilter, useBookingModal } from '@/hooks';
import {
  tours,
  stories,
  valuePillars,
  journeySteps,
  faqs,
} from '@/data/travelioData';
import { Tour, BookingInquiry } from '@/types';

export const App: React.FC = () => {
  // Toast notifications hook
  const { toasts, removeToast, success: toastSuccess, info: toastInfo } = useToast();

  // Global search and filtering hook
  const {
    searchTerm,
    selectedCategory,
    filteredTours,
    totalCount,
    setSearchTerm,
    setSelectedCategory,
    resetFilters,
    handleHeroSearch,
  } = useTourFilter({ initialTours: tours });

  // Plan a Trip Modal hook
  const {
    isOpen: isBookingModalOpen,
    prefilledTour,
    openModal: openBookingModal,
    closeModal: closeBookingModal,
  } = useBookingModal();

  // Quick-view tour detail modal state
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<Tour | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Open tour detail modal
  const handleViewDetails = (tour: Tour) => {
    setSelectedTourForDetail(tour);
    setIsDetailModalOpen(true);
  };

  // Close tour detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTourForDetail(null);
  };

  // Book now handler (opens booking modal pre-configured with tour)
  const handleBookNow = (tour: Tour) => {
    // If detail modal is open, close it first
    if (isDetailModalOpen) {
      setIsDetailModalOpen(false);
    }
    openBookingModal(tour);
  };

  // Inquiry submitted callback
  const handleBookingSuccess = (inquiry: BookingInquiry) => {
    toastSuccess(
      `Inquiry ${inquiry.referenceNumber} received! Our travel specialist will contact you within 24 hours.`,
      6000,
      'Inquiry Confirmed'
    );
  };

  // Destination quick link click from footer
  const handleDestinationClick = (destination: string) => {
    setSearchTerm(destination);
    setSelectedCategory('All');
    toastInfo(`Filtered catalog for "${destination}"`, 3000);
  };

  // Category quick link click from footer
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
    toastInfo(`Showing ${category} itineraries`, 3000);
  };

  // Newsletter subscribe callback
  const handleNewsletterSubscribe = (email: string) => {
    toastSuccess(
      `Thank you for subscribing! Privilege dossiers sent to ${email}`,
      5000,
      'Newsletter Subscribed'
    );
  };

  return (
    <div className="min-h-screen bg-travelio-cream text-travelio-dark-900 flex flex-col font-sans selection:bg-travelio-gold-500 selection:text-white">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} position="bottom-right" />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        onPlanTripClick={() => {
          openBookingModal(null);
        }}
      />

      {/* Hero Section with Live Search & Statistics */}
      <Hero
        onSearch={handleHeroSearch}
        onExploreClick={() => {
          const toursSection = document.getElementById('tours');
          if (toursSection) {
            toursSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        {/* Category Discovery Section */}
        <section id="categories" className="space-y-8 scroll-mt-24">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            totalToursCount={totalCount}
          />
        </section>

        {/* Tour Catalog Section */}
        <section id="tours" className="scroll-mt-24">
          <TourList
            tours={filteredTours}
            totalCount={totalCount}
            selectedCategory={selectedCategory}
            searchQuery={searchTerm}
            onResetFilters={resetFilters}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />
        </section>

        {/* Value Pillars Showcase */}
        <ValueProps pillars={valuePillars} />

        {/* 4-Step Journey Timeline */}
        <ProcessSteps steps={journeySteps} />

        {/* Traveler Stories Testimonials */}
        <TravelerStories storiesList={stories} />

        {/* FAQ Accordion Section */}
        <FaqAccordion items={faqs} />
      </main>

      {/* Quick-View Tour Detail Modal */}
      <TourDetailModal
        tour={selectedTourForDetail}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onBookNow={handleBookNow}
      />

      {/* Interactive 'Plan a Trip' Inquiry Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        prefilledTour={prefilledTour}
        onSuccess={handleBookingSuccess}
      />

      {/* 4-Column Rich Luxury Footer */}
      <Footer
        onCategoryClick={handleCategoryClick}
        onDestinationClick={handleDestinationClick}
        onNewsletterSubscribe={handleNewsletterSubscribe}
        onPlanTripClick={() => openBookingModal(null)}
      />
    </div>
  );
};

export default App;
