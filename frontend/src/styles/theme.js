/**
 * Centralized Theme Configuration
 * This file contains all theme-related configurations, colors, and utilities
 */

// Theme configuration object
export const themeConfig = {
  // Theme modes
  modes: {
    light: 'light',
    dark: 'dark'
  },

  // Color palette
  colors: {
    // Primary brand colors
    primary: {
      light: '#7c3aed',
      dark: '#8b5cf6',
      lightHover: '#6d28d9',
      darkHover: '#7c3aed'
    },
    
    // Secondary brand colors
    secondary: {
      light: '#3b82f6',
      dark: '#60a5fa',
      lightHover: '#2563eb',
      darkHover: '#3b82f6'
    },

    // Background colors
    background: {
      primary: {
        light: '#ffffff',
        dark: '#111827'
      },
      secondary: {
        light: '#f9fafb',
        dark: '#1f2937'
      },
      tertiary: {
        light: '#f3f4f6',
        dark: '#374151'
      },
      card: {
        light: '#ffffff',
        dark: '#1f2937'
      },
      navbar: {
        light: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        dark: 'linear-gradient(135deg, #7c3aed 0%, #1e40af 100%)'
      }
    },

    // Text colors
    text: {
      primary: {
        light: '#111827',
        dark: '#f9fafb'
      },
      secondary: {
        light: '#4b5563',
        dark: '#d1d5db'
      },
      tertiary: {
        light: '#6b7280',
        dark: '#9ca3af'
      },
      inverse: {
        light: '#ffffff',
        dark: '#111827'
      }
    },

    // Border colors
    border: {
      primary: {
        light: '#e5e7eb',
        dark: '#374151'
      },
      secondary: {
        light: '#d1d5db',
        dark: '#4b5563'
      }
    },

    // Shadow colors
    shadow: {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(0, 0, 0, 0.3)',
      lightLarge: 'rgba(0, 0, 0, 0.15)',
      darkLarge: 'rgba(0, 0, 0, 0.4)'
    },

    // Status colors
    status: {
      success: {
        light: '#10b981',
        dark: '#34d399'
      },
      warning: {
        light: '#f59e0b',
        dark: '#fbbf24'
      },
      error: {
        light: '#ef4444',
        dark: '#f87171'
      },
      info: {
        light: '#3b82f6',
        dark: '#60a5fa'
      }
    }
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem',
    '2xl': '6rem'
  },

  // Border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};

// Theme utility functions
export const getThemeColor = (colorPath, mode = 'light') => {
  const path = colorPath.split('.');
  let value = themeConfig.colors;
  
  for (const key of path) {
    value = value[key];
  }
  
  return value[mode] || value;
};

// CSS custom properties generator
export const generateCSSVariables = (mode) => {
  const variables = {};
  
  // Primary colors
  variables['--color-primary'] = getThemeColor('primary', mode);
  variables['--color-primary-dark'] = getThemeColor('primary', mode === 'light' ? 'lightHover' : 'darkHover');
  variables['--color-secondary'] = getThemeColor('secondary', mode);
  variables['--color-secondary-dark'] = getThemeColor('secondary', mode === 'light' ? 'lightHover' : 'darkHover');
  
  // Background colors
  variables['--color-bg-primary'] = getThemeColor('background.primary', mode);
  variables['--color-bg-secondary'] = getThemeColor('background.secondary', mode);
  variables['--color-bg-tertiary'] = getThemeColor('background.tertiary', mode);
  variables['--color-bg-card'] = getThemeColor('background.card', mode);
  variables['--color-bg-navbar'] = getThemeColor('background.navbar', mode);
  
  // Text colors
  variables['--color-text-primary'] = getThemeColor('text.primary', mode);
  variables['--color-text-secondary'] = getThemeColor('text.secondary', mode);
  variables['--color-text-tertiary'] = getThemeColor('text.tertiary', mode);
  variables['--color-text-inverse'] = getThemeColor('text.inverse', mode);
  
  // Border colors
  variables['--color-border-primary'] = getThemeColor('border.primary', mode);
  variables['--color-border-secondary'] = getThemeColor('border.secondary', mode);
  
  // Shadow colors
  variables['--color-shadow'] = getThemeColor('shadow', mode);
  variables['--color-shadow-lg'] = getThemeColor('shadow', mode === 'light' ? 'lightLarge' : 'darkLarge');
  
  // Status colors
  variables['--color-success'] = getThemeColor('status.success', mode);
  variables['--color-warning'] = getThemeColor('status.warning', mode);
  variables['--color-error'] = getThemeColor('status.error', mode);
  variables['--color-info'] = getThemeColor('status.info', mode);
  
  // Transitions
  variables['--transition-fast'] = themeConfig.transitions.fast;
  variables['--transition-normal'] = themeConfig.transitions.normal;
  variables['--transition-slow'] = themeConfig.transitions.slow;
  
  return variables;
};

// Theme class utilities
export const themeClasses = {
  // Background classes
  backgrounds: {
    primary: 'bg-theme-primary',
    secondary: 'bg-theme-secondary',
    tertiary: 'bg-theme-tertiary',
    card: 'bg-theme-card',
    navbar: 'bg-theme-navbar'
  },
  
  // Text classes
  text: {
    primary: 'text-theme-primary',
    secondary: 'text-theme-secondary',
    tertiary: 'text-theme-tertiary',
    inverse: 'text-theme-inverse'
  },
  
  // Border classes
  borders: {
    primary: 'border-theme-primary',
    secondary: 'border-theme-secondary'
  },
  
  // Status classes
  status: {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
    successBg: 'bg-success',
    warningBg: 'bg-warning',
    errorBg: 'bg-error',
    infoBg: 'bg-info'
  },
  
  // Transition classes
  transitions: {
    theme: 'transition-theme',
    fast: 'transition-theme-fast',
    slow: 'transition-theme-slow'
  },
  
  // Component classes
  components: {
    card: 'card-theme',
    buttonPrimary: 'btn-theme-primary',
    buttonSecondary: 'btn-theme-secondary',
    input: 'input-theme'
  }
};

// Theme-aware gradient utilities
export const gradients = {
  primary: 'bg-gradient-to-r from-purple-500 to-blue-600',
  primaryHover: 'hover:from-purple-600 hover:to-blue-700',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
  secondaryHover: 'hover:from-purple-600 hover:to-pink-600',
  navbar: 'bg-gradient-to-br from-purple-500 to-pink-500'
};

export default themeConfig; 