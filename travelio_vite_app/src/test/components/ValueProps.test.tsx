import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ValueProps } from '@/components/ValueProps/ValueProps';
import { ProcessSteps } from '@/components/ValueProps/ProcessSteps';
import { FaqAccordion } from '@/components/ValueProps/FaqAccordion';
import { valuePillars, journeySteps, faqs } from '@/data/travelioData';

describe('ValueProps & Process Components', () => {
  it('renders all 4 brand value pillars with titles and descriptions', () => {
    render(<ValueProps pillars={valuePillars} />);

    expect(screen.getByText(/The Travelio Standard/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Promise to You/i)).toBeInTheDocument();

    valuePillars.forEach((pillar) => {
      expect(screen.getByText(pillar.title)).toBeInTheDocument();
      expect(screen.getByText(pillar.description)).toBeInTheDocument();
    });
  });

  it('renders all 4 journey timeline steps', () => {
    render(<ProcessSteps steps={journeySteps} />);

    expect(screen.getByText(/How Your Bespoke Journey Unfolds/i)).toBeInTheDocument();

    journeySteps.forEach((step) => {
      expect(screen.getByText(step.step)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      if (step.highlight) {
        expect(screen.getByText(step.highlight)).toBeInTheDocument();
      }
    });
  });

  it('renders FAQ accordion and toggles questions on click', async () => {
    render(<FaqAccordion items={faqs} />);

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();

    // Check all questions are present
    faqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });

    // First FAQ answer should be visible by default
    expect(screen.getByText(faqs[0].answer)).toBeInTheDocument();

    // Second FAQ answer should be hidden or when clicked becomes visible
    const secondFaqButton = screen.getByText(faqs[1].question);
    await userEvent.click(secondFaqButton);

    expect(screen.getByText(faqs[1].answer)).toBeInTheDocument();
  });
});
