import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Test component to access auth context
const TestComponent = () => {
  const { user, isAuthenticated, login, register, logout, error, loading } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</div>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || 'no-error'}</div>
      <button data-testid="login" onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button data-testid="register" onClick={() => register('Test User', 'test@example.com', 'password')}>
        Register
      </button>
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// Wrapper component for testing
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Initial State', () => {
    it('should start with no user and not authenticated', async () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      // Wait for initial loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    });

    it('should load user from localStorage if available', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    });
  });

  describe('Login Functionality', () => {
    it('should login successfully', async () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      // Wait for initial loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      const loginButton = screen.getByTestId('login');
      
      await act(async () => {
        fireEvent.click(loginButton);
      });

      // Wait for login to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      }, { timeout: 3000 });

      const userData = JSON.parse(screen.getByTestId('user').textContent);
      expect(userData.email).toBe('test@example.com');
      expect(userData.name).toBe('test');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('moodmate_user', expect.any(String));
    });
  });

  describe('Register Functionality', () => {
    it('should register successfully', async () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      const registerButton = screen.getByTestId('register');
      
      await act(async () => {
        fireEvent.click(registerButton);
      });

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      }, { timeout: 3000 });

      const userData = JSON.parse(screen.getByTestId('user').textContent);
      expect(userData.email).toBe('test@example.com');
      expect(userData.name).toBe('Test User');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('moodmate_user', expect.any(String));
    });
  });

  describe('Logout Functionality', () => {
    it('should logout successfully', async () => {
      // Start with a logged-in user
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      });

      const logoutButton = screen.getByTestId('logout');
      
      await act(async () => {
        fireEvent.click(logoutButton);
      });

      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('moodmate_user');
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false');
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('moodmate_user');
    });
  });
}); 