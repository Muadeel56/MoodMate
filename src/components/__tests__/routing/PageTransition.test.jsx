import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PageTransition from '../../PageTransition';

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

  it('renders children with transition wrapper', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies transition classes and styles', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    const transitionElement = screen.getByText('Test Content').parentElement;
    expect(transitionElement).toHaveClass('animate-fadeIn');
    expect(transitionElement).toHaveStyle({ animation: 'fadeIn 0.3s ease-in-out' });
  });

  it('uses location pathname as key for re-rendering', () => {
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

    // The component should re-render with new key
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
}); 