# Centralized Theme System Guide

This guide explains how to use the centralized theme system in the MoodMate project.

## 🎯 Overview

The centralized theme system provides:
- **Single source of truth** for all theme configurations
- **Consistent theming** across all components
- **Easy maintenance** and updates
- **Type-safe** theme utilities
- **Performance optimized** CSS variables

## 📁 File Structure

```
src/styles/
├── theme.js              # Main theme configuration
├── index.js              # Theme exports
└── THEME_GUIDE.md        # This guide

src/hooks/
└── useThemeSystem.js     # Theme hook for components

src/contexts/
└── ThemeContext.jsx      # Theme context provider
```

## 🚀 Quick Start

### 1. Basic Usage

```jsx
import { useThemeSystem } from '../hooks/useThemeSystem';

const MyComponent = () => {
  const { isDark, toggleTheme, classes } = useThemeSystem();
  
  return (
    <div className={classes.backgrounds.primary}>
      <h1 className={classes.text.primary}>Hello World</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### 2. Using Common Patterns

```jsx
import { useThemeSystem } from '../hooks/useThemeSystem';

const MyComponent = () => {
  const { common } = useThemeSystem();
  
  return (
    <div className={common.container}>
      <div className={common.card}>
        <h2 className={common.heading}>Title</h2>
        <p className={common.body}>Content</p>
        <button className={common.primaryButton}>Action</button>
      </div>
    </div>
  );
};
```

## 🎨 Available Theme Classes

### Background Classes

```jsx
const { backgrounds } = useThemeSystem();

// Usage
<div className={backgrounds.primary}>   // Main background
<div className={backgrounds.secondary}> // Secondary background
<div className={backgrounds.tertiary}>  // Tertiary background
<div className={backgrounds.card}>      // Card background
<div className={backgrounds.navbar}>    // Navbar background
```

### Text Classes

```jsx
const { text } = useThemeSystem();

// Usage
<h1 className={text.primary}>   // Primary text
<p className={text.secondary}>  // Secondary text
<span className={text.tertiary}> // Muted text
<div className={text.inverse}>  // Inverse text
```

### Border Classes

```jsx
const { borders } = useThemeSystem();

// Usage
<div className={`border ${borders.primary}`}>   // Primary border
<div className={`border ${borders.secondary}`}> // Secondary border
```

### Status Classes

```jsx
const { status } = useThemeSystem();

// Usage
<span className={status.success}>Success</span>
<span className={status.warning}>Warning</span>
<span className={status.error}>Error</span>
<span className={status.info}>Info</span>
```

### Transition Classes

```jsx
const { transitions } = useThemeSystem();

// Usage
<div className={transitions.theme}>  // Standard theme transition
<div className={transitions.fast}>   // Fast transition
<div className={transitions.slow}>   // Slow transition
```

### Component Classes

```jsx
const { classes } = useThemeSystem();

// Usage
<div className={classes.components.card}>           // Card component
<button className={classes.components.buttonPrimary}>   // Primary button
<button className={classes.components.buttonSecondary}> // Secondary button
<input className={classes.components.input}>        // Input component
```

## 🌈 Gradient Utilities

```jsx
import { gradients } from '../styles/theme';

// Usage
<button className={`${gradients.primary} ${gradients.primaryHover}`}>
  Gradient Button
</button>

<div className={gradients.navbar}>
  Navbar with gradient
</div>
```

## 🎯 Common Patterns

### Card Pattern

```jsx
const { common } = useThemeSystem();

<div className={common.card}>
  <h3 className={common.heading}>Card Title</h3>
  <p className={common.body}>Card content goes here</p>
  <button className={common.primaryButton}>Action</button>
</div>
```

### Form Pattern

```jsx
const { common } = useThemeSystem();

<form className={common.container}>
  <input 
    type="text" 
    className={common.input}
    placeholder="Enter text..."
  />
  <button className={common.primaryButton}>
    Submit
  </button>
</form>
```

### Section Pattern

```jsx
const { common } = useThemeSystem();

<section className={common.section}>
  <div className="container mx-auto px-4 py-8">
    <h2 className={common.heading}>Section Title</h2>
    <p className={common.body}>Section content</p>
  </div>
</section>
```

## 🔧 Advanced Usage

### Custom Color Access

```jsx
const { getColor } = useThemeSystem();

// Get specific colors
const primaryColor = getColor('primary');
const textColor = getColor('text.primary');
const borderColor = getColor('border.primary');
```

### Conditional Styling

```jsx
const { isDark, classes } = useThemeSystem();

<div className={`${classes.backgrounds.primary} ${
  isDark ? 'shadow-lg' : 'shadow-md'
}`}>
  Conditional styling
</div>
```

### Dynamic Classes

```jsx
const { classes } = useThemeSystem();

const getButtonClasses = (variant) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium';
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} ${classes.components.buttonPrimary}`;
    case 'secondary':
      return `${baseClasses} ${classes.components.buttonSecondary}`;
    default:
      return baseClasses;
  }
};
```

## 📝 Best Practices

### 1. Always Use Theme Classes

❌ **Don't use hardcoded colors:**
```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

✅ **Use theme classes:**
```jsx
const { backgrounds, text } = useThemeSystem();
<div className={`${backgrounds.primary} ${text.primary}`}>
```

### 2. Use Common Patterns

❌ **Don't repeat common combinations:**
```jsx
<div className={`${backgrounds.card} rounded-lg p-6 border ${borders.primary}`}>
```

✅ **Use common patterns:**
```jsx
const { common } = useThemeSystem();
<div className={common.card}>
```

### 3. Leverage the Hook

❌ **Don't import theme classes directly:**
```jsx
import { themeClasses } from '../styles/theme';
```

✅ **Use the hook:**
```jsx
const { classes } = useThemeSystem();
```

### 4. Consistent Transitions

Always include theme transitions for elements that change with theme:

```jsx
const { transitions } = useThemeSystem();

<div className={`${backgrounds.primary} ${transitions.theme}`}>
  This will smoothly transition when theme changes
</div>
```

## 🧪 Testing

### Testing Theme Changes

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useThemeSystem } from '../hooks/useThemeSystem';

const TestComponent = () => {
  const { isDark, toggleTheme } = useThemeSystem();
  return (
    <div>
      <span data-testid="theme">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

test('theme toggle works', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  
  expect(screen.getByTestId('theme')).toHaveTextContent('light');
  fireEvent.click(screen.getByText('Toggle'));
  expect(screen.getByTestId('theme')).toHaveTextContent('dark');
});
```

## 🔄 Migration Guide

### From Old Theme Classes

Replace old theme classes with new centralized ones:

```jsx
// Old
<div className="bg-theme-primary text-theme-primary">

// New
const { backgrounds, text } = useThemeSystem();
<div className={`${backgrounds.primary} ${text.primary}`}>
```

### From Tailwind Dark Mode

Replace Tailwind dark mode classes:

```jsx
// Old
<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

// New
const { backgrounds, text } = useThemeSystem();
<div className={`${backgrounds.primary} ${text.primary}`}>
```

## 📚 Examples

See the following components for complete examples:
- `src/components/ThemeDemo.jsx` - Comprehensive theme showcase
- `src/components/Navbar.jsx` - Navigation with theme
- `src/components/Footer.jsx` - Footer with theme
- `src/sections/Hero/index.jsx` - Hero section with theme

## 🤝 Contributing

When adding new components:

1. **Use the theme hook** instead of importing theme classes directly
2. **Follow common patterns** for consistency
3. **Include transitions** for theme-aware elements
4. **Test both themes** to ensure proper contrast
5. **Update this guide** if adding new patterns

## 🎨 Customization

To customize the theme:

1. **Edit `src/styles/theme.js`** to modify colors, spacing, etc.
2. **Update CSS variables** in `src/index.css` if needed
3. **Test thoroughly** in both light and dark modes
4. **Update documentation** to reflect changes 