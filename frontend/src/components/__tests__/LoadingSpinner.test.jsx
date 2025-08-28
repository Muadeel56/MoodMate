import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoadingSpinner from '../LoadingSpinner';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div data-testid="motion-spinner" className={className} {...props}>
        {children}
      </div>
    )
  }
}));

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('motion-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-blue-500');
  });

  it('applies custom size classes', () => {
    render(<LoadingSpinner size="large" />);
    
    const spinner = screen.getByTestId('motion-spinner');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });

  it('applies custom color classes', () => {
    render(<LoadingSpinner color="success" />);
    
    const spinner = screen.getByTestId('motion-spinner');
    expect(spinner).toHaveClass('border-green-500');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const spinner = screen.getByTestId('motion-spinner');
    expect(spinner).toHaveClass('custom-class');
  });

  it('applies all size variants correctly', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('h-4', 'w-4');
    
    rerender(<LoadingSpinner size="medium" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('h-8', 'w-8');
    
    rerender(<LoadingSpinner size="large" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('h-12', 'w-12');
    
    rerender(<LoadingSpinner size="xl" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('h-16', 'w-16');
  });

  it('applies all color variants correctly', () => {
    const { rerender } = render(<LoadingSpinner color="primary" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-blue-500');
    
    rerender(<LoadingSpinner color="secondary" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-purple-500');
    
    rerender(<LoadingSpinner color="success" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-green-500');
    
    rerender(<LoadingSpinner color="warning" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-yellow-500');
    
    rerender(<LoadingSpinner color="error" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-red-500');
    
    rerender(<LoadingSpinner color="gray" />);
    expect(screen.getByTestId('motion-spinner')).toHaveClass('border-gray-500');
  });
}); 