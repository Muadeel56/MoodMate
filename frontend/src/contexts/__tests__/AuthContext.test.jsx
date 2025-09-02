import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock fetch
global.fetch = jest.fn();

// Test component that uses the auth context
const TestComponent = () => {
  const { user, isAuthenticated, loading, error, login, register, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="user">{user ? user.name : 'No user'}</div>
      <div data-testid="error">{error || 'No error'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={() => register('Test User', 'test@example.com', 'password')}>Register</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear fetch mock
    fetch.mockClear();
  });

  it('should provide initial state', () => {
    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('error')).toHaveTextContent('No error');
  });

  it('should handle successful login', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    const mockResponse = {
      access_token: 'access_token_123',
      refresh_token: 'refresh_token_123',
      user: mockUser
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    // Click login button
    act(() => {
      screen.getByText('Login').click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });

    // Check if tokens were stored
    expect(localStorage.getItem('moodmate_token')).toBe('access_token_123');
    expect(localStorage.getItem('moodmate_refresh_token')).toBe('refresh_token_123');
    expect(localStorage.getItem('moodmate_user')).toBe(JSON.stringify(mockUser));
  });

  it('should handle login failure', async () => {
    const mockError = { detail: 'Invalid credentials' };
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockError
    });

    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    // Click login button
    act(() => {
      screen.getByText('Login').click();
    });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
    });

    // Check that user is not authenticated
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('should handle successful registration', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    const mockResponse = {
      access_token: 'access_token_123',
      refresh_token: 'refresh_token_123',
      user: mockUser
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    // Click register button
    act(() => {
      screen.getByText('Register').click();
    });

    // Wait for registration to complete
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });
  });

  it('should handle logout', async () => {
    // Set up initial authenticated state
    localStorage.setItem('moodmate_token', 'access_token_123');
    localStorage.setItem('moodmate_refresh_token', 'refresh_token_123');
    localStorage.setItem('moodmate_user', JSON.stringify({ name: 'Test User' }));

    // Mock logout API call
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Successfully logged out' })
    });

    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    // Should be authenticated initially
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');

    // Click logout button
    act(() => {
      screen.getByText('Logout').click();
    });

    // Wait for logout to complete
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
    });

    // Check that tokens were cleared
    expect(localStorage.getItem('moodmate_token')).toBeNull();
    expect(localStorage.getItem('moodmate_refresh_token')).toBeNull();
    expect(localStorage.getItem('moodmate_user')).toBeNull();
  });

  it('should handle network errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    // Click login button
    act(() => {
      screen.getByText('Login').click();
    });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Network error. Please check your credentials.');
    });
  });
}); 