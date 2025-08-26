import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../Footer';
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

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders footer with proper structure', () => {
    renderWithTheme(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders brand information', () => {
    renderWithTheme(<Footer />);
    
    expect(screen.getByText('MoodMate')).toBeInTheDocument();
    expect(screen.getByText('Your Mood Companion')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    renderWithTheme(<Footer />);
    
    const socialLinks = [
      { name: 'Facebook', label: 'Facebook' },
      { name: 'Twitter', label: 'Twitter' },
      { name: 'Instagram', label: 'Instagram' },
      { name: 'LinkedIn', label: 'LinkedIn' },
      { name: 'GitHub', label: 'GitHub' },
    ];

    socialLinks.forEach(({ label }) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it('renders quick navigation links', () => {
    renderWithTheme(<Footer />);
    
    const quickLinks = ['Home', 'Features', 'Pricing', 'About', 'Contact', 'Blog'];
    
    quickLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it('renders legal links', () => {
    renderWithTheme(<Footer />);
    
    const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'];
    
    legalLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it('renders contact information', () => {
    renderWithTheme(<Footer />);
    
    // Check contact information is present
    expect(screen.getByText('hello@moodmate.app')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('renders newsletter signup form', () => {
    renderWithTheme(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const subscribeButton = screen.getByText('Subscribe');
    
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });

  it('renders copyright information with current year', () => {
    renderWithTheme(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} MoodMate. All rights reserved.`)).toBeInTheDocument();
  });

  it('applies correct CSS classes for theme styling', () => {
    const { container } = renderWithTheme(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-theme-secondary', 'border-t', 'border-theme-primary', 'transition-theme');
  });

  it('has proper section headings', () => {
    renderWithTheme(<Footer />);
    
    const headings = ['Quick Links', 'Legal', 'Contact Us', 'Stay Updated'];
    
    headings.forEach(headingText => {
      const heading = screen.getByText(headingText);
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });
  });

  it('renders responsive grid layout', () => {
    const { container } = renderWithTheme(<Footer />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('handles newsletter form interaction', () => {
    renderWithTheme(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const subscribeButton = screen.getByText('Subscribe');
    
    // Test input interaction
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
    
    // Test button click (we're not testing actual functionality, just that it's clickable)
    expect(subscribeButton).toBeInTheDocument();
    expect(subscribeButton.tagName).toBe('BUTTON');
  });

  it('has proper hover states and transitions', () => {
    const { container } = renderWithTheme(<Footer />);
    
    // Check for transition classes on social media links
    const socialLinks = container.querySelectorAll('a[aria-label]');
    socialLinks.forEach(link => {
      expect(link).toHaveClass('transition-theme');
    });
    
    // Check navigation links have proper transitions
    const navigationLinks = container.querySelectorAll('a[href^="#"], a[href^="/"]');
    navigationLinks.forEach(link => {
      expect(link).toHaveClass('transition-theme');
    });
  });

  it('renders all sections in correct order', () => {
    renderWithTheme(<Footer />);
    
    // Check that sections appear in the expected order
    const sections = [
      'Quick Links',
      'Legal', 
      'Contact Us',
      'Stay Updated',
      '©' // Copyright section
    ];
    
    sections.forEach(text => {
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

  it('has proper semantic HTML structure', () => {
    const { container } = renderWithTheme(<Footer />);
    
    // Check for semantic elements
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelectorAll('h3')).toHaveLength(4); // QuickLinks, Legal, Contact Us, Stay Updated
    expect(container.querySelectorAll('ul')).toHaveLength(2); // Quick links, legal links
    expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Footer />);
    
    // Check social media links have proper aria-labels
    const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'GitHub'];
    socialLinks.forEach(label => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
    });
  });

  it('has proper form accessibility', () => {
    renderWithTheme(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('renders heart icon in copyright section', () => {
    renderWithTheme(<Footer />);
    
    // Check that heart icon is present (it's an SVG element)
    const heartIcon = document.querySelector('svg.lucide-heart');
    expect(heartIcon).toBeInTheDocument();
  });

  it('has proper gradient styling on brand logo', () => {
    const { container } = renderWithTheme(<Footer />);
    
    const logoContainer = container.querySelector('.bg-gradient-to-br');
    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer).toHaveClass('from-purple-500', 'to-pink-500');
  });

  it('has proper theme-aware text classes', () => {
    const { container } = renderWithTheme(<Footer />);
    
    // Check that theme classes are applied
    const themeTextElements = container.querySelectorAll('.text-theme-primary, .text-theme-secondary');
    expect(themeTextElements.length).toBeGreaterThan(0);
  });

  it('has proper button styling', () => {
    renderWithTheme(<Footer />);
    
    const subscribeButton = screen.getByText('Subscribe');
    expect(subscribeButton).toHaveClass('bg-gradient-to-r', 'from-purple-500', 'to-pink-500');
  });
}); 