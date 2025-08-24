# MoodMate Theme System

A comprehensive dark/light theme system built with CSS custom properties and React Context.

## 🎨 Features

- **CSS Custom Properties**: Centralized color management
- **Smooth Transitions**: Automatic theme switching animations
- **System Preference Detection**: Respects user's OS theme preference
- **localStorage Persistence**: Remembers user's theme choice
- **Accessibility**: Proper contrast ratios and ARIA labels
- **Component-Ready**: Pre-built theme classes for common UI elements

## 🚀 Quick Start

### 1. Theme Provider Setup

Wrap your app with the `ThemeProvider`:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Using Theme Classes

Replace Tailwind dark mode classes with theme classes:

```jsx
// Before (Tailwind dark mode)
<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
  Content
</div>

// After (Theme system)
<div className="bg-theme-primary text-theme-primary">
  Content
</div>
```

### 3. Theme Toggle

Add the theme toggle button to your navbar:

```jsx
import ThemeToggle from './components/ThemeToggle';

<nav>
  <ThemeToggle />
</nav>
```

## 🎯 Available Theme Classes

### Background Classes

| Class | Description |
|-------|-------------|
| `.bg-theme-primary` | Main background color |
| `.bg-theme-secondary` | Secondary background color |
| `.bg-theme-tertiary` | Tertiary background color |
| `.bg-theme-card` | Card background color |
| `.bg-theme-navbar` | Navbar gradient background |

### Text Classes

| Class | Description |
|-------|-------------|
| `.text-theme-primary` | Primary text color |
| `.text-theme-secondary` | Secondary text color |
| `.text-theme-tertiary` | Tertiary/muted text color |
| `.text-theme-inverse` | Inverse text (for colored backgrounds) |

### Border Classes

| Class | Description |
|-------|-------------|
| `.border-theme-primary` | Primary border color |
| `.border-theme-secondary` | Secondary border color |

### Shadow Classes

| Class | Description |
|-------|-------------|
| `.shadow-theme` | Standard theme shadow |
| `.shadow-theme-lg` | Large theme shadow |

### Status Color Classes

| Class | Description |
|-------|-------------|
| `.text-success`, `.bg-success` | Success state colors |
| `.text-warning`, `.bg-warning` | Warning state colors |
| `.text-error`, `.bg-error` | Error state colors |
| `.text-info`, `.bg-info` | Info state colors |

### Transition Classes

| Class | Description |
|-------|-------------|
| `.transition-theme` | Standard theme transition (200ms) |
| `.transition-theme-fast` | Fast theme transition (150ms) |
| `.transition-theme-slow` | Slow theme transition (300ms) |

## 🧩 Component Classes

### Card Component

```css
.card-theme {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border-primary);
  box-shadow: 0 1px 3px 0 var(--color-shadow);
  transition: all var(--transition-normal);
}

.card-theme:hover {
  box-shadow: 0 4px 6px -1px var(--color-shadow-lg);
}
```

### Button Components

```css
.btn-theme-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
  transition: all var(--transition-normal);
}

.btn-theme-secondary {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
  transition: all var(--transition-normal);
}
```

### Input Component

```css
.input-theme {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
  transition: all var(--transition-normal);
}

.input-theme:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}
```

## 🎨 Color Palette

### Light Theme Colors

```css
:root {
  /* Primary Colors */
  --color-primary: #7c3aed;        /* Purple */
  --color-primary-dark: #6d28d9;   /* Dark Purple */
  --color-secondary: #3b82f6;      /* Blue */
  --color-secondary-dark: #2563eb; /* Dark Blue */
  
  /* Background Colors */
  --color-bg-primary: #ffffff;     /* White */
  --color-bg-secondary: #f9fafb;   /* Light Gray */
  --color-bg-tertiary: #f3f4f6;    /* Medium Gray */
  --color-bg-card: #ffffff;        /* White */
  
  /* Text Colors */
  --color-text-primary: #111827;   /* Dark Gray */
  --color-text-secondary: #4b5563; /* Medium Gray */
  --color-text-tertiary: #6b7280;  /* Light Gray */
  --color-text-inverse: #ffffff;   /* White */
}
```

### Dark Theme Colors

```css
.dark {
  /* Primary Colors */
  --color-primary: #8b5cf6;        /* Light Purple */
  --color-primary-dark: #7c3aed;   /* Purple */
  --color-secondary: #60a5fa;      /* Light Blue */
  --color-secondary-dark: #3b82f6; /* Blue */
  
  /* Background Colors */
  --color-bg-primary: #111827;     /* Dark Gray */
  --color-bg-secondary: #1f2937;   /* Medium Dark Gray */
  --color-bg-tertiary: #374151;    /* Medium Gray */
  --color-bg-card: #1f2937;        /* Medium Dark Gray */
  
  /* Text Colors */
  --color-text-primary: #f9fafb;   /* Light Gray */
  --color-text-secondary: #d1d5db; /* Medium Light Gray */
  --color-text-tertiary: #9ca3af;  /* Medium Gray */
  --color-text-inverse: #111827;   /* Dark Gray */
}
```

## 🔧 Customization

### Adding New Colors

1. Add CSS custom properties to `:root` and `.dark`:

```css
:root {
  --color-custom: #your-light-color;
}

.dark {
  --color-custom: #your-dark-color;
}
```

2. Create utility classes:

```css
.bg-custom {
  background-color: var(--color-custom);
}

.text-custom {
  color: var(--color-custom);
}
```

### Modifying Existing Colors

Update the CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #your-new-primary-color;
}

.dark {
  --color-primary: #your-new-dark-primary-color;
}
```

## 🧪 Testing

The theme system includes comprehensive tests:

```bash
npm test
```

Tests cover:
- Theme context functionality
- Theme toggle component
- Theme persistence
- Error handling

## 📱 Browser Support

- Modern browsers with CSS custom properties support
- Automatic fallback for older browsers
- Progressive enhancement approach

## 🎯 Best Practices

1. **Use Theme Classes**: Always use theme classes instead of hardcoded colors
2. **Consistent Transitions**: Apply `.transition-theme` to elements that change with theme
3. **Accessibility**: Ensure proper contrast ratios in both themes
4. **Component Isolation**: Keep theme logic in the context, not individual components
5. **Performance**: CSS custom properties are performant and well-supported

## 🔄 Migration from Tailwind Dark Mode

Replace Tailwind dark mode classes:

```jsx
// Before
<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

// After
<div className="bg-theme-primary text-theme-primary">
```

## 📚 Examples

See `src/components/ThemeDemo.jsx` for comprehensive examples of all theme classes in action.

## 🤝 Contributing

When adding new components or features:

1. Use existing theme classes when possible
2. Add new theme classes for component-specific styling
3. Update this documentation
4. Add tests for new theme functionality 