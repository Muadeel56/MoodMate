import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProtectedRoute from '../../ProtectedRoute';

// Mock the Navigate component
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Navigate: ({ to, state, replace }) => (
      <div data-testid="navigate" data-to={to} data-state={JSON.stringify(state)} data-replace={replace}>
        Navigate to {to}
      </div>
    ),
    useLocation: () => ({ pathname: '/dashboard' })
  };
});

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;

  it('renders children when user is authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute isAuthenticated={true}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute isAuthenticated={false}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login');
  });

  it('passes current location state to login redirect', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute isAuthenticated={false}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    const navigateElement = screen.getByTestId('navigate');
    const state = JSON.parse(navigateElement.getAttribute('data-state'));
    expect(state.from.pathname).toBe('/dashboard');
  });

  it('uses replace navigation for redirect', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute isAuthenticated={false}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-replace', 'true');
  });
}); 