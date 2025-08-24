import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Hero from '../index.jsx';
import { ThemeProvider } from '../../../contexts';

// Mock the scrollIntoView method
const mockScrollIntoView = vi.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

const renderHero = () => {
  return render(
    <ThemeProvider>
      <Hero />
    </ThemeProvider>
  );
};

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Rendering', () => {
    test('renders hero section with correct structure', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
      expect(screen.getByLabelText('MoodMate Hero Section')).toBeInTheDocument();
    });

    test('renders main heading with gradient text', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByText('Track Your')).toBeInTheDocument();
      });
      expect(screen.getByText('Mood Journey')).toBeInTheDocument();
    });

    test('renders compelling subtitle', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByText(/Discover patterns, understand emotions/)).toBeInTheDocument();
      });
    });

    test('renders call-to-action buttons', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /get started with moodmate/i })).toBeInTheDocument();
      });
      expect(screen.getByRole('button', { name: /watch demo video/i })).toBeInTheDocument();
    });

    test('renders feature highlights', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByText('Track Daily Moods')).toBeInTheDocument();
      });
      expect(screen.getByText('View Patterns')).toBeInTheDocument();
      expect(screen.getByText('Share Insights')).toBeInTheDocument();
    });

    test('renders trust indicators', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByText(/Trusted by 10,000\+ users worldwide/)).toBeInTheDocument();
      });
      expect(screen.getByText('🔒 Privacy First')).toBeInTheDocument();
      expect(screen.getByText('📱 Mobile Optimized')).toBeInTheDocument();
      expect(screen.getByText('⚡ Real-time Sync')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByLabelText('MoodMate Hero Section')).toBeInTheDocument();
      });
      expect(screen.getByRole('button', { name: /get started with moodmate/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /watch demo video/i })).toBeInTheDocument();
    });

    test('has proper semantic structure', async () => {
      renderHero();
      
      await waitFor(() => {
        const banner = screen.getByRole('banner');
        expect(banner).toBeInTheDocument();
        expect(banner.tagName).toBe('SECTION');
      });
    });

    test('mood icons have proper labels', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByLabelText('Current mood: Happy')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    test('Get Started button calls scrollToSection function', async () => {
      // Mock getElementById to return a mock element
      const mockElement = { scrollIntoView: mockScrollIntoView };
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /get started with moodmate/i })).toBeInTheDocument();
      });
      
      const getStartedButton = screen.getByRole('button', { name: /get started with moodmate/i });
      fireEvent.click(getStartedButton);
      
      expect(document.getElementById).toHaveBeenCalledWith('features');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
      
      document.getElementById = originalGetElementById;
    });

    test('Watch Demo button calls scrollToSection function', async () => {
      // Mock getElementById to return a mock element
      const mockElement = { scrollIntoView: mockScrollIntoView };
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /watch demo video/i })).toBeInTheDocument();
      });
      
      const demoButton = screen.getByRole('button', { name: /watch demo video/i });
      fireEvent.click(demoButton);
      
      expect(document.getElementById).toHaveBeenCalledWith('demo');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
      
      document.getElementById = originalGetElementById;
    });
  });

  describe('Theme Integration', () => {
    test('integrates with theme context', async () => {
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles missing DOM elements gracefully', async () => {
      // Mock getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);
      
      renderHero();
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /get started with moodmate/i })).toBeInTheDocument();
      });
      
      const getStartedButton = screen.getByRole('button', { name: /get started with moodmate/i });
      fireEvent.click(getStartedButton);
      
      expect(document.getElementById).toHaveBeenCalledWith('features');
      
      document.getElementById = originalGetElementById;
    });
  });
}); 