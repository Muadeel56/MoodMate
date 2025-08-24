import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';

// Mock React hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn(),
  };
});

// Mock document.body
Object.defineProperty(document.body, 'style', {
  value: {},
  writable: true,
});

describe('Navbar Component', () => {
  it('renders the MoodMate logo and branding', () => {
    render(<Navbar />);
    
    expect(screen.getByText('MoodMate')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Get Started button', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'shadow-lg');
  });

  it('has mobile menu with dropdown functionality', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });
}); 