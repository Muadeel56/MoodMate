import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ForgotPassword from '../ForgotPassword';

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

describe('ForgotPassword', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders forgot password form initially', () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address and we\'ll send you a link to reset your password.')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Send reset link')).toBeInTheDocument();
  });

  it('shows error for empty email submission', async () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error for invalid email format', async () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid email', async () => {
    mockOnSubmit.mockResolvedValue();
    
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('shows success message after successful submission', async () => {
    mockOnSubmit.mockResolvedValue();
    
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check your email')).toBeInTheDocument();
      expect(screen.getByText(/We've sent a password reset link to/)).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Back to login')).toBeInTheDocument();
    });
  });

  it('shows error message when onSubmit throws error', async () => {
    const errorMessage = 'Failed to send reset email';
    mockOnSubmit.mockRejectedValue(new Error(errorMessage));
    
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables form inputs when loading', () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={true}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    const submitButton = screen.getByText('Sending...');
    const cancelButton = screen.getByText('Cancel');

    expect(emailInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('shows loading text on submit button when loading', () => {
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={true}
      />
    );

    expect(screen.getByText('Sending...')).toBeInTheDocument();
  });

  it('calls onCancel from success view', async () => {
    mockOnSubmit.mockResolvedValue();
    
    render(
      <ForgotPassword
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Send reset link');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const backButton = screen.getByText('Back to login');
      fireEvent.click(backButton);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
}); 