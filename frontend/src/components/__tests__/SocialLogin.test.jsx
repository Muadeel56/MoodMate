import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SocialLogin from '../SocialLogin';

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

describe('SocialLogin', () => {
  const mockOnGoogleLogin = vi.fn();
  const mockOnGithubLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders social login section with divider', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    expect(screen.getByText('Or continue with')).toBeInTheDocument();
  });

  it('renders Google login button', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const googleButton = screen.getByText('Google');
    expect(googleButton).toBeInTheDocument();
    expect(googleButton.closest('button')).toHaveAttribute('type', 'button');
  });

  it('renders GitHub login button', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const githubButton = screen.getByText('GitHub');
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.closest('button')).toHaveAttribute('type', 'button');
  });

  it('calls onGoogleLogin when Google button is clicked', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const googleButton = screen.getByText('Google').closest('button');
    fireEvent.click(googleButton);

    expect(mockOnGoogleLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onGithubLogin when GitHub button is clicked', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const githubButton = screen.getByText('GitHub').closest('button');
    fireEvent.click(githubButton);

    expect(mockOnGithubLogin).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when isLoading is true', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={true}
      />
    );

    const googleButton = screen.getByText('Google').closest('button');
    const githubButton = screen.getByText('GitHub').closest('button');

    expect(googleButton).toBeDisabled();
    expect(githubButton).toBeDisabled();
  });

  it('enables buttons when isLoading is false', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const googleButton = screen.getByText('Google').closest('button');
    const githubButton = screen.getByText('GitHub').closest('button');

    expect(googleButton).not.toBeDisabled();
    expect(githubButton).not.toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    render(
      <SocialLogin
        onGoogleLogin={mockOnGoogleLogin}
        onGithubLogin={mockOnGithubLogin}
        isLoading={false}
      />
    );

    const googleButton = screen.getByText('Google').closest('button');
    const githubButton = screen.getByText('GitHub').closest('button');

    expect(googleButton).toHaveAttribute('type', 'button');
    expect(githubButton).toHaveAttribute('type', 'button');
  });
}); 