import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from '@/components/Footer/Footer';
import { Newsletter } from '@/components/Footer/Newsletter';
import { SocialLinks } from '@/components/Footer/SocialLinks';
import { brandMetadata } from '@/data/travelioData';

describe('Footer, Newsletter & SocialLinks Components', () => {
  it('renders 4-column rich footer with brand logo, founding tagline and trust indicators', () => {
    render(<Footer />);

    // Brand and tagline
    expect(screen.getAllByText(brandMetadata.brandName).length).toBeGreaterThan(0);
    expect(
      screen.getByText(`Crafted Journeys Since ${brandMetadata.foundingYear}`)
    ).toBeInTheDocument();

    // Trust indicators
    expect(screen.getByText('100% Protected & Vetted')).toBeInTheDocument();
    expect(screen.getByText('24/7 VIP Concierge')).toBeInTheDocument();
    expect(screen.getByText('4.9/5 Star Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Bespoke Itineraries')).toBeInTheDocument();

    // Section headings
    expect(screen.getByText('Curated Destinations')).toBeInTheDocument();
    expect(screen.getByText('Travel Styles & Info')).toBeInTheDocument();
    expect(screen.getByText('Insider Dispatches')).toBeInTheDocument();
  });

  it('renders all social media links with accessible labels', () => {
    render(<SocialLinks />);

    expect(screen.getByLabelText(/follow travelio on instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/follow travelio on twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/follow travelio on facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subscribe to travelio on youtube/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/connect with travelio on linkedin/i)).toBeInTheDocument();
  });

  it('triggers onDestinationClick when clicking destination links', async () => {
    const handleDestinationClick = vi.fn();
    render(<Footer onDestinationClick={handleDestinationClick} />);

    const japanButton = screen.getByText('Japan (Tokyo & Kyoto)');
    await userEvent.click(japanButton);

    expect(handleDestinationClick).toHaveBeenCalledTimes(1);
    expect(handleDestinationClick).toHaveBeenCalledWith('Japan');
  });

  it('triggers onCategoryClick when clicking category links', async () => {
    const handleCategoryClick = vi.fn();
    render(<Footer onCategoryClick={handleCategoryClick} />);

    const safariButton = screen.getByText('Wildlife & Safari');
    await userEvent.click(safariButton);

    expect(handleCategoryClick).toHaveBeenCalledTimes(1);
    expect(handleCategoryClick).toHaveBeenCalledWith('Wildlife');
  });

  it('triggers onPlanTripClick when clicking the Plan a Bespoke Trip button in footer', async () => {
    const handlePlanTripClick = vi.fn();
    render(<Footer onPlanTripClick={handlePlanTripClick} />);

    const planBtn = screen.getByRole('button', { name: /plan a bespoke trip/i });
    await userEvent.click(planBtn);

    expect(handlePlanTripClick).toHaveBeenCalledTimes(1);
  });

  it('validates newsletter email input with invalid and empty formats', async () => {
    render(<Newsletter />);

    const submitBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    // Submit empty
    await userEvent.click(submitBtn);
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();

    // Submit invalid email
    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    await userEvent.type(emailInput, 'notanemail');
    await userEvent.click(submitBtn);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits valid email in newsletter and displays success state', async () => {
    const handleSubscribe = vi.fn();
    render(<Newsletter onSubscribe={handleSubscribe} />);

    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    const submitBtn = screen.getByRole('button', { name: /subscribe to newsletter/i });

    await userEvent.type(emailInput, 'curator@luxurytravel.com');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/welcome to the travelio private circle/i)
      ).toBeInTheDocument();
    });

    expect(handleSubscribe).toHaveBeenCalledTimes(1);
    expect(handleSubscribe).toHaveBeenCalledWith('curator@luxurytravel.com');
  });
});
