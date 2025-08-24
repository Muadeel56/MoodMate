import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon when in light mode', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('shows sun icon when in dark mode', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('toggles theme when clicked', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    // Initially in light mode
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    
    // Click again to toggle back to light mode
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('persists theme preference in localStorage', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
}); 