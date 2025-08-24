import { useTheme } from '../contexts/ThemeContext';
import { themeClasses, gradients, getThemeColor } from '../styles/theme';

/**
 * Comprehensive theme hook that provides easy access to all theme utilities
 * @returns {Object} Theme utilities and functions
 */
export const useThemeSystem = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return {
    // Theme state
    isDark,
    theme,
    toggleTheme,
    
    // Theme classes
    classes: themeClasses,
    
    // Gradient utilities
    gradients,
    
    // Utility functions
    getColor: (colorPath) => getThemeColor(colorPath, theme),
    
    // Common theme combinations
    common: {
      // Card styling
      card: `${themeClasses.components.card} rounded-lg p-6`,
      
      // Button styling
      primaryButton: `${themeClasses.components.buttonPrimary} px-6 py-2 rounded-lg font-medium`,
      secondaryButton: `${themeClasses.components.buttonSecondary} px-6 py-2 rounded-lg font-medium`,
      
      // Input styling
      input: `${themeClasses.components.input} w-full px-4 py-2 rounded-lg`,
      
      // Text styling
      heading: `${themeClasses.text.primary} font-bold`,
      subheading: `${themeClasses.text.secondary} font-medium`,
      body: themeClasses.text.secondary,
      caption: `${themeClasses.text.tertiary} text-sm`,
      
      // Layout styling
      container: `${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`,
      section: `${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`,
      
      // Interactive elements
      link: `${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 ${themeClasses.transitions.theme}`,
      hoverCard: `${themeClasses.components.card} hover:shadow-lg ${themeClasses.transitions.theme}`,
    },
    
    // Status helpers
    status: {
      success: themeClasses.status.success,
      warning: themeClasses.status.warning,
      error: themeClasses.status.error,
      info: themeClasses.status.info,
    },
    
    // Background helpers
    backgrounds: themeClasses.backgrounds,
    
    // Text helpers
    text: themeClasses.text,
    
    // Border helpers
    borders: themeClasses.borders,
    
    // Transition helpers
    transitions: themeClasses.transitions,
  };
};

export default useThemeSystem; 