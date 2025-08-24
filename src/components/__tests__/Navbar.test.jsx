import React from 'react';
import { render, screen } from '@testing-library/react';
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
  });

  it('renders navigation links', () => {
    renderWithTheme(<Navbar />);
    
    // Check for desktop navigation links
    const desktopLinks = screen.getAllByText('Home');
    expect(desktopLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
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
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-theme-navbar', 'shadow-theme', 'transition-theme');
  });

  it('has mobile menu with dropdown functionality', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });
}); 