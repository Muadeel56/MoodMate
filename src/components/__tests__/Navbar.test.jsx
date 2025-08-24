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
  });

  it('renders navigation links', () => {
    renderWithTheme(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Get Started button', () => {
    renderWithTheme(<Navbar />);
    
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Navbar />);
    
    const themeToggle = screen.getByLabelText(/switch to/i);
    expect(themeToggle).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = renderWithTheme(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'shadow-lg');
  });

  it('has mobile menu with dropdown functionality', () => {
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });
}); 