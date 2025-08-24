import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-theme-navbar shadow-theme transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">M</span>
              </div>
              <span className="text-theme-inverse font-bold text-xl">MoodMate</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-theme-inverse hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-theme"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="btn-theme-secondary px-4 py-2 rounded-md text-sm font-medium">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-theme-inverse hover:text-purple-200 focus:outline-none focus:text-purple-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-16 left-0 right-0 bg-theme-secondary shadow-theme border-t border-theme-primary transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-theme-inverse hover:text-purple-200 block px-3 py-2 rounded-md text-base font-medium transition-theme"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 space-y-2">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <button className="w-full btn-theme-secondary px-4 py-2 rounded-md text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 