import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div data-testid="motion-div" className={className} {...props}>
        {children}
      </div>
    ),
    p: ({ children, className, ...props }) => (
      <p data-testid="motion-p" className={className} {...props}>
        {children}
      </p>
    )
  }
}));

// Mock LoadingSpinner as a simple div
vi.mock('../LoadingSpinner', () => ({
  default: ({ className, ...props }) => (
    <div data-testid="loading-spinner" className={className} {...props}>
      Spinner
    </div>
  )
}));

// Import PageLoading after mocks
import PageLoading from '../PageLoading';

describe('PageLoading', () => {
  it('renders with default props', () => {
    render(<PageLoading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<PageLoading message="Custom loading message" />);
    
    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });

  it('hides spinner when showSpinner is false', () => {
    render(<PageLoading showSpinner={false} />);
    
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('hides message when message is empty', () => {
    render(<PageLoading message="" />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders without message and spinner', () => {
    render(<PageLoading message="" showSpinner={false} />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
}); 