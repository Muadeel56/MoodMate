import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator';

// Mock the theme classes
vi.mock('../../styles/theme', () => ({
  themeClasses: {
    text: {
      primary: 'text-primary',
      secondary: 'text-secondary'
    },
    backgrounds: {
      primary: 'bg-primary',
      secondary: 'bg-secondary'
    },
    transitions: {
      theme: 'transition-theme'
    }
  }
}));

describe('PasswordStrengthIndicator', () => {
  it('renders nothing when password is empty', () => {
    const { container } = render(<PasswordStrengthIndicator password="" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows password strength indicator when password is provided', () => {
    render(<PasswordStrengthIndicator password="a" />);
    expect(screen.getByText('1/5')).toBeInTheDocument();
    expect(screen.getByText('To improve your password:')).toBeInTheDocument();
  });

  it('shows improvement suggestions for weak passwords', () => {
    render(<PasswordStrengthIndicator password="a" />);
    expect(screen.getByText('To improve your password:')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Include uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Include number')).toBeInTheDocument();
    expect(screen.getByText('Include special character')).toBeInTheDocument();
  });

  it('shows no improvement suggestions for strong passwords', () => {
    render(<PasswordStrengthIndicator password="abc123A!" />);
    expect(screen.queryByText('To improve your password:')).not.toBeInTheDocument();
  });

  it('updates strength indicator based on password changes', () => {
    const { rerender } = render(<PasswordStrengthIndicator password="a" />);
    expect(screen.getByText('1/5')).toBeInTheDocument();

    rerender(<PasswordStrengthIndicator password="abc123A!" />);
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });
}); 