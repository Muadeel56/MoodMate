# Utility Functions

This directory contains pure utility functions and helper methods.

## Purpose

- Pure functions with no side effects
- Data transformation and formatting
- Validation functions
- Date and time utilities
- String manipulation helpers
- Math and calculation utilities

## Structure

```
utils/
├── validation.js        # Form and data validation
├── formatting.js        # Data formatting utilities
├── date.js             # Date and time helpers
├── storage.js          # Local storage utilities
├── api.js              # API helper functions
└── constants.js        # Application constants
```

## Guidelines

- Keep functions pure and testable
- Use descriptive function names
- Include JSDoc documentation
- Handle edge cases and errors
- Export functions individually for tree-shaking

## Example

```javascript
/**
 * Formats a date string to a readable format
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
``` 