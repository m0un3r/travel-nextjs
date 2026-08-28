import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/Navbar/Navbar';
import { MobileMenu } from '@/components/Navbar/MobileMenu';

describe('Navbar Component', () => {
  it('renders brand logo and founding badge', () => {
    render(<Navbar />);
    expect(screen.getByText('Travelio')).toBeInTheDocument();
    expect(screen.getByText(/Since 2009/i)).toBeInTheDocument();
  });

  it('renders all desktop navigation links', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /tours/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /categories/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reviews/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
  });

  it('triggers onPlanTripClick when desktop CTA button is clicked', async () => {
    const handlePlanTrip = vi.fn();
    render(<Navbar onPlanTripClick={handlePlanTrip} />);

    const planTripButtons = screen.getAllByRole('button', { name: /plan a trip/i });
    expect(planTripButtons.length).toBeGreaterThan(0);

    await userEvent.click(planTripButtons[0]);
    expect(handlePlanTrip).toHaveBeenCalledTimes(1);
  });

  it('opens and closes mobile menu drawer via hamburger and close button', async () => {
    render(<Navbar />);

    // Mobile menu drawer is initially closed (not in document or hidden)
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();

    // Click hamburger button
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    await userEvent.click(menuButton);

    // Mobile menu should now be open
    const drawer = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(drawer).toBeInTheDocument();

    // Click close button inside drawer
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    await userEvent.click(closeButton);

    // Drawer should be removed
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });

  it('closes mobile menu on backdrop click and on Escape key', async () => {
    const handleClose = vi.fn();
    const { rerender } = render(<MobileMenu isOpen={true} onClose={handleClose} />);

    // Click backdrop
    const backdrop = screen.getByTestId('mobile-menu-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);

    // When isOpen is false, nothing is rendered
    rerender(<MobileMenu isOpen={false} onClose={handleClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('triggers onPlanTripClick and closes drawer when mobile CTA is clicked', async () => {
    const handlePlanTrip = vi.fn();
    const handleClose = vi.fn();
    render(
      <MobileMenu
        isOpen={true}
        onClose={handleClose}
        onPlanTripClick={handlePlanTrip}
      />
    );

    const mobileCta = screen.getByRole('button', { name: /plan a trip/i });
    await userEvent.click(mobileCta);

    expect(handleClose).toHaveBeenCalled();
    expect(handlePlanTrip).toHaveBeenCalled();
  });
});
