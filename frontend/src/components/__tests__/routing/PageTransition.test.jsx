import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PageTransition from '../../PageTransition';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>
  },
  AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>
}));

// Mock useLocation
const mockUseLocation = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => mockUseLocation()
  };
});

describe('PageTransition', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/test' });
  });

  it('renders children with Framer Motion wrapper', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('applies motion div with correct props', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('initial', 'initial');
    expect(motionDiv).toHaveAttribute('animate', 'in');
    expect(motionDiv).toHaveAttribute('exit', 'out');
  });

  it('uses location pathname for re-rendering', () => {
    const { rerender } = render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    mockUseLocation.mockReturnValue({ pathname: '/new-path' });

    rerender(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    // The component should re-render with new pathname
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('supports custom transition type', () => {
    render(
      <MemoryRouter>
        <PageTransition transitionType="slide">
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('supports custom className', () => {
    render(
      <MemoryRouter>
        <PageTransition className="custom-class">
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByTestId('motion-div')).toHaveClass('custom-class');
  });
}); 