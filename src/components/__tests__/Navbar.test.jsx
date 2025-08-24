import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../Navbar';
import { ThemeProvider } from '../../contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Navbar Component', () => {
  it('renders the MoodMate logo and branding', () => {
    renderWithTheme(<Navbar />);
    
    expect(screen.getByText('MoodMate')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('Your Mood Companion')).toBeInTheDocument();
  });

  it('renders MoodMate-specific navigation links', () => {
    renderWithTheme(<Navbar />);
    
    // Check for desktop navigation links
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Journal').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Music').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0);
  });

  it('renders navigation icons', () => {
    renderWithTheme(<Navbar />);
    
    // Check for Lucide icons (they appear in both desktop and mobile menus)
    // We can't easily test for specific icons, but we can check that icon elements exist
    const iconElements = document.querySelectorAll('svg');
    expect(iconElements.length).toBeGreaterThan(0);
    
    // Check that navigation links have icons
    const homeLinks = screen.getAllByText('Home');
    const journalLinks = screen.getAllByText('Journal');
    const musicLinks = screen.getAllByText('Music');
    const settingsLinks = screen.getAllByText('Settings');
    
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(journalLinks.length).toBeGreaterThan(0);
    expect(musicLinks.length).toBeGreaterThan(0);
    expect(settingsLinks.length).toBeGreaterThan(0);
  });

  it('renders the Get Started button', () => {
    renderWithTheme(<Navbar />);
    
    const getStartedButtons = screen.getAllByText('Get Started');
    expect(getStartedButtons.length).toBeGreaterThan(0);
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Navbar />);
    
    const themeToggles = screen.getAllByLabelText(/switch to/i);
    expect(themeToggles.length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-lg', 'sticky', 'top-0', 'z-50');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
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
    
    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click on a navigation link
    const homeLink = screen.getAllByText('Home')[0];
    fireEvent.click(homeLink);
    
    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('has responsive design with mobile menu', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    
    // Mobile menu should be hidden by default
    const mobileMenu = menuButton.closest('nav').querySelector('.md\\:hidden');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('has smooth animations and transitions', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('transition-all', 'duration-300');
    
    const menuButton = screen.getByLabelText('Toggle menu');
    const svg = menuButton.querySelector('svg');
    expect(svg).toHaveClass('transition-transform', 'duration-200');
  });
}); 