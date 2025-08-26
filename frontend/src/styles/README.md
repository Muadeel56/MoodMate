# Styles

This directory contains custom styles, CSS modules, and styling utilities.

## Purpose

- Custom CSS styles and overrides
- CSS modules for component-specific styles
- Styled-components or CSS-in-JS files
- Global style variables and themes
- Animation and transition definitions

## Structure

```
styles/
├── globals.css          # Global styles and CSS variables
├── components/          # Component-specific styles
│   ├── Button.css
│   ├── Card.css
│   └── Modal.css
├── themes/              # Theme-specific styles
│   ├── light.css
│   └── dark.css
├── animations/          # Animation definitions
│   ├── fade.css
│   └── slide.css
└── utilities/           # Utility classes
    ├── spacing.css
    └── typography.css
```

## Guidelines

- Use CSS variables for consistent theming
- Follow BEM methodology for class naming
- Keep styles modular and reusable
- Include responsive design considerations
- Document complex CSS rules

## CSS Variables Example

```css
:root {
  /* Colors */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  
  /* Typography */
  --font-family-base: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;
}
``` 