# MoodMate Folder Structure

This document outlines the organized folder structure for the MoodMate project.

## Overview

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/     # Reusable UI components
├── sections/       # Page sections and larger UI components
├── hooks/          # Custom React hooks
├── styles/         # Custom styles and CSS
├── utils/          # Utility functions
├── contexts/       # React context providers
└── assets/         # Static assets
```

## Directory Details

### `/src/components/`
**Purpose**: Reusable UI components that can be used across multiple pages.

**Contents**:
- `Navbar.jsx` - Navigation bar component
- `ThemeDemo.jsx` - Theme demonstration component
- `ThemeToggle.jsx` - Theme toggle button component
- `index.js` - Export file for clean imports
- `README.md` - Documentation for components

**Usage**:
```javascript
import { Navbar, ThemeDemo, ThemeToggle } from './components';
```

### `/src/sections/`
**Purpose**: Page sections and larger UI components that combine multiple smaller components.

**Contents**:
- `Header/` - Header section component
- `index.js` - Export file for clean imports
- `README.md` - Documentation for sections

**Usage**:
```javascript
import { Header } from './sections';
```

### `/src/hooks/`
**Purpose**: Custom React hooks that encapsulate reusable logic.

**Contents**:
- `useLocalStorage.js` - Local storage management hook
- `index.js` - Export file for clean imports
- `README.md` - Documentation for hooks

**Usage**:
```javascript
import { useLocalStorage } from './hooks';
```

### `/src/styles/`
**Purpose**: Custom styles, CSS modules, and styling utilities.

**Contents**:
- `globals.css` - Global CSS variables and base styles
- `index.js` - Import file for styles
- `README.md` - Documentation for styles

**Usage**:
```javascript
import './styles'; // Imports global styles
```

### `/src/utils/`
**Purpose**: Pure utility functions and helper methods.

**Contents**:
- `validation.js` - Form and data validation functions
- `formatting.js` - Data formatting utilities
- `index.js` - Export file for clean imports
- `README.md` - Documentation for utilities

**Usage**:
```javascript
import { isValidEmail, formatDate } from './utils';
```

### `/src/contexts/`
**Purpose**: React context providers for global state management.

**Contents**:
- `ThemeContext.jsx` - Theme management context
- `index.js` - Export file for clean imports
- `README.md` - Documentation for contexts

**Usage**:
```javascript
import { ThemeProvider, useTheme } from './contexts';
```



## Import Guidelines

### Clean Imports
Use index files for clean, organized imports:

```javascript
// ✅ Good - Clean imports
import { Navbar, ThemeDemo } from './components';
import { useLocalStorage } from './hooks';
import { isValidEmail } from './utils';

// ❌ Avoid - Direct file imports
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import { isValidEmail } from './utils/validation';
```

### Relative Paths
Use relative paths from the current file location:

```javascript
// From src/App.jsx
import { Navbar } from './components';

// From src/components/Navbar.jsx
import { ThemeToggle } from './';

// From src/sections/Header/index.jsx
import { Navbar } from '../../components';
```

## Best Practices

### Components
- Keep components focused on a single responsibility
- Use composition over inheritance
- Include PropTypes for better documentation
- Write tests for all components

### Hooks
- Follow the `use` prefix naming convention
- Keep hooks pure and testable
- Include proper error handling
- Document with JSDoc comments

### Utils
- Write pure functions with no side effects
- Include comprehensive error handling
- Add JSDoc documentation
- Test all utility functions

### Styles
- Use CSS variables for theming
- Follow BEM methodology for class naming
- Keep styles modular and reusable
- Include responsive design considerations



## Testing

Each directory includes test files in `__tests__/` subdirectories:

```
components/
├── __tests__/
│   ├── Navbar.test.jsx
│   └── ThemeToggle.test.jsx
└── Navbar.jsx
```

## Documentation

Each directory includes a `README.md` file with:
- Purpose and usage guidelines
- Code examples
- Best practices
- Directory structure

## Future Considerations

As the project grows, consider:

1. **Feature-based organization**: Group related components, hooks, and utils by feature
2. **Lazy loading**: Implement code splitting for better performance
3. **Storybook**: Add Storybook for component documentation
4. **TypeScript migration**: Consider migrating to TypeScript in the future for better type safety
5. **Testing strategy**: Implement comprehensive testing strategy with different test types
6. **PropTypes**: Add PropTypes for better component documentation and validation

## Migration Notes

The existing code has been updated to use the new import structure:

- Updated `src/App.jsx` to use clean imports
- Updated component imports to use index files
- Maintained backward compatibility with existing functionality
- All tests should continue to pass with the new structure 