import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateCSSVariables } from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Apply theme CSS variables to document root
  const applyTheme = (mode) => {
    const variables = generateCSSVariables(mode);
    
    // Apply CSS variables to document root
    Object.entries(variables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  };

  useEffect(() => {
    const mode = isDark ? 'dark' : 'light';
    
    // Update localStorage when theme changes
    localStorage.setItem('theme', mode);
    
    // Update document class for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update data-theme attribute for CSS variables
    document.documentElement.setAttribute('data-theme', mode);
    
    // Apply theme CSS variables
    applyTheme(mode);
  }, [isDark]);

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 