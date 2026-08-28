import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';

describe('Common UI Components', () => {
  describe('Button', () => {
    it('renders button with text and triggers onClick', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);

      const btn = screen.getByRole('button', { name: /click me/i });
      expect(btn).toBeInTheDocument();

      await userEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles loading state and disables interaction', async () => {
      const handleClick = vi.fn();
      render(<Button isLoading onClick={handleClick}>Loading Action</Button>);

      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();

      await userEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders variants and custom classes', () => {
      render(
        <Button variant="gold" size="lg" className="custom-class">
          Gold Button
        </Button>
      );
      const btn = screen.getByRole('button', { name: /gold button/i });
      expect(btn).toHaveClass('bg-travelio-gold-500');
      expect(btn).toHaveClass('custom-class');
    });
  });

  describe('Badge', () => {
    it('renders badge with text and variant classes', () => {
      render(<Badge variant="cities">Cities Badge</Badge>);
      const badge = screen.getByText(/cities badge/i);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-blue-50');
    });
  });

  describe('Input', () => {
    it('renders input with label and helper text', async () => {
      render(
        <Input
          label="Full Name"
          placeholder="Enter your name"
          helperText="As it appears on your passport"
        />
      );

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByText(/as it appears on your passport/i)).toBeInTheDocument();
    });

    it('renders input error state', () => {
      render(
        <Input
          label="Email"
          error="Please enter a valid email address"
        />
      );

      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Select', () => {
    it('renders select with options and handles change', async () => {
      const handleChange = vi.fn();
      const options = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
      ];

      render(
        <Select
          label="Select Option"
          options={options}
          onChange={handleChange}
        />
      );

      const select = screen.getByLabelText(/select option/i);
      expect(select).toBeInTheDocument();

      await userEvent.selectOptions(select, 'opt2');
      expect(handleChange).toHaveBeenCalled();
      expect(select).toHaveValue('opt2');
    });
  });
});
