import React, { useState } from 'react';
import { Home, BookOpen, Music, Settings, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './';
import { themeClasses, gradients } from '../styles/theme';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: BookOpen },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ];

  return (
    <nav className={`${themeClasses.backgrounds.primary}/95 backdrop-blur-md shadow-lg border-b ${themeClasses.borders.primary}/50 sticky top-0 z-50 ${themeClasses.transitions.theme}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${gradients.navbar} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className={`${themeClasses.text.primary} font-bold text-xl leading-tight`}>MoodMate</span>
                <span className={`${themeClasses.text.secondary} text-xs font-medium`}>Your Mood Companion</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`${isActive ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : themeClasses.text.secondary + ' hover:text-purple-600 dark:hover:text-purple-400'} px-4 py-2 rounded-lg text-sm font-medium ${themeClasses.transitions.theme} hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center space-x-2 group`}
                    onClick={closeMenu}
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              to="/login" 
              className={`${gradients.secondary} ${gradients.secondaryHover} text-white px-6 py-2 rounded-lg text-sm font-medium ${themeClasses.transitions.theme} transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className={`${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 ${themeClasses.transitions.theme}`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-200" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 right-0 ${themeClasses.backgrounds.primary}/95 backdrop-blur-md shadow-lg border-b ${themeClasses.borders.primary}/50 ${themeClasses.transitions.theme} ease-in-out transform ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navigationLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`${isActive ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : themeClasses.text.secondary + ' hover:text-purple-600 dark:hover:text-purple-400'} block px-4 py-3 rounded-lg text-base font-medium ${themeClasses.transitions.theme} hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center space-x-3`}
                onClick={closeMenu}
              >
                <IconComponent className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className={`pt-4 border-t ${themeClasses.borders.primary}/50`}>
            <Link 
              to="/login" 
              className={`w-full ${gradients.secondary} ${gradients.secondaryHover} text-white px-6 py-3 rounded-lg text-sm font-medium ${themeClasses.transitions.theme} transform hover:scale-105 shadow-lg block text-center`}
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 