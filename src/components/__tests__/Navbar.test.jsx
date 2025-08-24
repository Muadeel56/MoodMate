import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders navbar with proper structure', () => {
    renderWithTheme(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders brand logo and name', () => {
    renderWithTheme(<Navbar />);
    
    expect(screen.getByText('MoodMate')).toBeInTheDocument();
    expect(screen.getByText('Your Mood Companion')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithTheme(<Navbar />);
    
    const navigationLinks = ['Home', 'Journal', 'Music', 'Settings'];
    
    navigationLinks.forEach(linkText => {
      const links = screen.getAllByText(linkText);
      expect(links.length).toBeGreaterThan(0);
      // Check that the text is present (it might be in a span inside an anchor)
      expect(links[0]).toBeInTheDocument();
    });
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Navbar />);
    
    const themeToggles = screen.getAllByLabelText(/Switch to/);
    expect(themeToggles.length).toBeGreaterThan(0);
    expect(themeToggles[0].tagName).toBe('BUTTON');
  });

  it('renders CTA button', () => {
    renderWithTheme(<Navbar />);
    
    const ctaButtons = screen.getAllByText('Get Started');
    expect(ctaButtons.length).toBeGreaterThan(0);
    expect(ctaButtons[0].tagName).toBe('BUTTON');
  });

  it('renders mobile menu button', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.tagName).toBe('BUTTON');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    
    // Initially menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when navigation link is clicked', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    const homeLinks = screen.getAllByText('Home');
    const mobileHomeLink = homeLinks.find(link => link.closest('.md\\:hidden'));
    
    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click navigation link
    if (mobileHomeLink) {
      fireEvent.click(mobileHomeLink);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('applies correct CSS classes for theme styling', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-theme-primary/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-theme-primary/50', 'sticky', 'top-0', 'z-50', 'transition-theme');
  });

  it('has proper gradient styling on brand logo', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const logoContainer = container.querySelector('.bg-gradient-to-br');
    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer).toHaveClass('from-purple-500', 'to-pink-500');
  });

  it('has proper theme-aware text classes', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    // Check that theme classes are applied
    const themeTextElements = container.querySelectorAll('.text-theme-primary, .text-theme-secondary');
    expect(themeTextElements.length).toBeGreaterThan(0);
  });

  it('has proper button styling', () => {
    renderWithTheme(<Navbar />);
    
    const ctaButtons = screen.getAllByText('Get Started');
    expect(ctaButtons[0]).toHaveClass('bg-gradient-to-r', 'from-purple-500', 'to-pink-500');
  });

  it('has smooth animations and transitions', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('transition-theme');
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toHaveClass('transition-theme');
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toHaveAttribute('aria-expanded');
    expect(menuButton).toHaveAttribute('aria-label');
    
    const themeToggles = screen.getAllByLabelText(/Switch to/);
    expect(themeToggles[0]).toHaveAttribute('aria-label');
  });

  it('renders navigation links with proper icons', () => {
    renderWithTheme(<Navbar />);
    
    // Check that navigation links have icons (SVG elements)
    const navigationLinks = screen.getAllByRole('link');
    navigationLinks.forEach(link => {
      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  it('has proper hover states', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    // Check that navigation links have hover classes
    const navigationLinks = container.querySelectorAll('a[href^="#"]');
    navigationLinks.forEach(link => {
      expect(link.className).toContain('hover:');
    });
  });

  it('has proper responsive design', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    // Check for responsive classes
    const nav = container.querySelector('nav');
    expect(nav.querySelector('[class*="md:hidden"]')).toBeInTheDocument(); // Mobile menu button
    expect(nav.querySelector('[class*="hidden md:block"]')).toBeInTheDocument(); // Desktop navigation
  });

  it('renders mobile menu with proper structure', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Check that mobile menu items are present
    const mobileMenu = document.querySelector('[class*="md:hidden"]');
    expect(mobileMenu).toBeInTheDocument();
    
    // Check that all navigation links are in mobile menu
    const navigationLinks = ['Home', 'Journal', 'Music', 'Settings'];
    navigationLinks.forEach(linkText => {
      const links = screen.getAllByText(linkText);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('has proper semantic HTML structure', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    // Check for semantic elements
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelectorAll('a[href^="#"]').length).toBeGreaterThan(0); // Navigation links
    expect(container.querySelectorAll('button').length).toBeGreaterThan(0); // Menu button, theme toggle, CTA
  });

  it('maintains consistent spacing and layout', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    // Check for consistent spacing classes
    const nav = container.querySelector('nav');
    expect(nav.querySelector('.h-16')).toBeInTheDocument();
    expect(nav.querySelector('.px-4')).toBeInTheDocument();
    expect(nav.querySelector('.space-x-6')).toBeInTheDocument();
  });
}); 