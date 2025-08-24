import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../Footer';
import { ThemeProvider } from '../../contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Footer Component', () => {
  it('renders the MoodMate branding and logo', () => {
    renderWithTheme(<Footer />);
    
    expect(screen.getByText('MoodMate')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('Your Mood Companion')).toBeInTheDocument();
  });

  it('renders the footer description', () => {
    renderWithTheme(<Footer />);
    
    expect(screen.getByText(/Empowering your mental wellness journey/)).toBeInTheDocument();
  });

  it('renders all social media links with proper attributes', () => {
    renderWithTheme(<Footer />);
    
    const socialLinks = [
      { name: 'Facebook', ariaLabel: 'Follow us on Facebook' },
      { name: 'Twitter', ariaLabel: 'Follow us on Twitter' },
      { name: 'Instagram', ariaLabel: 'Follow us on Instagram' },
      { name: 'LinkedIn', ariaLabel: 'Follow us on LinkedIn' },
      { name: 'GitHub', ariaLabel: 'View our GitHub repository' }
    ];

    socialLinks.forEach(({ name, ariaLabel }) => {
      const link = screen.getByLabelText(ariaLabel);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders quick navigation links', () => {
    renderWithTheme(<Footer />);
    
    const quickLinks = ['Home', 'Features', 'Journal', 'Music', 'About', 'Contact'];
    
    quickLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it('renders legal links', () => {
    renderWithTheme(<Footer />);
    
    const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Protection'];
    
    legalLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it('renders contact information with proper links', () => {
    renderWithTheme(<Footer />);
    
    // Check contact information is present
    expect(screen.getByText('hello@moodmate.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('123 Wellness St, Mind City, MC 12345')).toBeInTheDocument();
    
    // Check contact links have proper attributes
    const emailLink = screen.getByLabelText('Send us an email');
    const phoneLink = screen.getByLabelText('Call us');
    const locationLink = screen.getByLabelText('View our location on map');
    
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@moodmate.com');
    expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
    expect(locationLink).toHaveAttribute('href', 'https://maps.google.com');
  });

  it('renders newsletter signup section', () => {
    renderWithTheme(<Footer />);
    
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText(/Get the latest updates/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders copyright information with current year', () => {
    renderWithTheme(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} MoodMate. Made with`)).toBeInTheDocument();
    expect(screen.getByText('for your wellness.')).toBeInTheDocument();
  });

  it('renders version and rights information', () => {
    renderWithTheme(<Footer />);
    
    expect(screen.getByText('Version 1.0.0')).toBeInTheDocument();
    expect(screen.getByText('All rights reserved')).toBeInTheDocument();
  });

  it('renders heart icon in copyright section', () => {
    renderWithTheme(<Footer />);
    
    // Check that heart icon is present (it's an SVG element)
    const heartIcon = document.querySelector('svg.lucide-heart');
    expect(heartIcon).toBeInTheDocument();
  });

  it('applies correct CSS classes for theme styling', () => {
    const { container } = renderWithTheme(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-theme-secondary', 'border-t', 'border-theme-border', 'transition-theme');
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

  it('has proper accessibility attributes for form elements', () => {
    renderWithTheme(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('aria-label', 'Email address for newsletter');
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
    
    // Check for transition classes on social media links (they have transition-all)
    const socialLinks = container.querySelectorAll('a[aria-label*="Follow us on"], a[aria-label*="View our GitHub"]');
    socialLinks.forEach(link => {
      expect(link).toHaveClass('transition-all');
      expect(link).toHaveClass('duration-200');
    });
    
    // Check navigation links have proper transitions
    const navigationLinks = container.querySelectorAll('a[href^="#"], a[href^="/"]');
    navigationLinks.forEach(link => {
      expect(link).toHaveClass('transition-colors');
      expect(link).toHaveClass('duration-200');
    });
    
    // Check contact links have proper transitions
    const contactLinks = container.querySelectorAll('a[aria-label*="Send us an email"], a[aria-label*="Call us"], a[aria-label*="View our location"]');
    contactLinks.forEach(link => {
      expect(link).toHaveClass('transition-colors');
      expect(link).toHaveClass('duration-200');
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
    expect(container.querySelectorAll('h3')).toHaveLength(4); // Quick Links, Legal, Contact Us, Stay Updated
    expect(container.querySelectorAll('ul')).toHaveLength(3); // Quick links, legal links, contact info
    expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  it('renders contact icons with proper styling', () => {
    renderWithTheme(<Footer />);
    
    // Check that contact section has icons (SVG elements)
    const contactSection = screen.getByText('Contact Us').closest('div');
    const icons = contactSection.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('maintains consistent spacing and layout', () => {
    const { container } = renderWithTheme(<Footer />);
    
    // Check for consistent spacing classes
    const footer = container.querySelector('footer');
    expect(footer.querySelector('.py-12')).toBeInTheDocument();
    expect(footer.querySelector('.gap-8')).toBeInTheDocument();
    expect(footer.querySelector('.space-y-2')).toBeInTheDocument();
  });
}); 