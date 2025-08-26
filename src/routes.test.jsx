import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from './contexts';
import AppRoutes from './routes';

// Mock the page components
vi.mock('./pages', () => ({
  Home: () => <div data-testid="home-page">Home Page</div>,
  About: () => <div data-testid="about-page">About Page</div>,
  Dashboard: () => <div data-testid="dashboard-page">Dashboard Page</div>,
  Login: () => <div data-testid="login-page">Login Page</div>,
  NotFound: () => <div data-testid="not-found-page">404 Page</div>,
}));

// Mock the components
vi.mock('./components', () => ({
  ProtectedRoute: ({ children, isAuthenticated }) => 
    isAuthenticated ? children : <div data-testid="redirect-to-login">Redirect to Login</div>,
  PageTransition: ({ children }) => <div data-testid="page-transition">{children}</div>,
}));

const renderWithRouter = (route) => {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('AppRoutes', () => {
  it('renders Home page at root route', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders About page at /about route', () => {
    renderWithRouter('/about');
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('renders Login page at /login route', () => {
    renderWithRouter('/login');
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('redirects to login when accessing protected route without authentication', () => {
    renderWithRouter('/dashboard');
    expect(screen.getByTestId('redirect-to-login')).toBeInTheDocument();
  });

  it('renders 404 page at /404 route', () => {
    renderWithRouter('/404');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('redirects unknown routes to 404', () => {
    renderWithRouter('/unknown-route');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('applies page transitions to all routes', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('page-transition')).toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
}); 