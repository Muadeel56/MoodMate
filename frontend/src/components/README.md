# Components

This directory contains reusable UI components that can be used across multiple pages.

## Available Components

### Core Components
- `Navbar.jsx` - Navigation bar component
- `ThemeDemo.jsx` - Theme demonstration component
- `ThemeToggle.jsx` - Theme toggle button component
- `Footer.jsx` - Footer component.

### Routing Components
- `ProtectedRoute.jsx` - Route protection component
- `PageTransition.jsx` - Framer Motion page transitions

### Loading Components
- `LoadingSpinner.jsx` - Animated loading spinner
- `PageLoading.jsx` - Full-screen loading overlay

### Demo Components
- `TransitionDemo.jsx` - Framer Motion transitions showcase

## Framer Motion Transitions

The project now includes smooth page transitions powered by Framer Motion. Here's how to use them:

### PageTransition Component

The `PageTransition` component provides smooth animations when navigating between pages.

#### Basic Usage
```jsx
import { PageTransition } from './components';

<PageTransition>
  <YourPageComponent />
</PageTransition>
```

#### Available Transition Types

1. **Auto (Default)** - Automatically selects transition based on route
2. **Page** - Smooth fade with scale and movement
3. **Slide** - Horizontal slide animation
4. **Fade** - Simple opacity fade
5. **Scale** - Scale with spring animation

#### Custom Transition Type
```jsx
<PageTransition transitionType="slide">
  <YourPageComponent />
</PageTransition>
```

#### With Loading State
```jsx
<PageTransition 
  showLoading={true} 
  loadingMessage="Loading your content..."
>
  <YourPageComponent />
</PageTransition>
```

### LoadingSpinner Component

A customizable animated loading spinner with Framer Motion.

#### Usage
```jsx
import { LoadingSpinner } from './components';

// Default (medium size, primary color)
<LoadingSpinner />

// Custom size and color
<LoadingSpinner size="large" color="success" />

// Custom className
<LoadingSpinner className="my-custom-class" />
```

#### Available Sizes
- `small` - 16px (h-4 w-4)
- `medium` - 32px (h-8 w-8) - Default
- `large` - 48px (h-12 w-12)
- `xl` - 64px (h-16 w-16)

#### Available Colors
- `primary` - Blue (default)
- `secondary` - Purple
- `success` - Green
- `warning` - Yellow
- `error` - Red
- `gray` - Gray

### PageLoading Component

A full-screen loading overlay with customizable content.

#### Usage
```jsx
import { PageLoading } from './components';

// Default
<PageLoading />

// Custom message
<PageLoading message="Loading your data..." />

// Without spinner
<PageLoading showSpinner={false} />

// Without message
<PageLoading message="" />
```

## Route-Specific Transitions

The `PageTransition` component automatically applies different transitions based on the route:

- `/` - Page transition (0.4s)
- `/about` - Fade transition (0.3s)
- `/login` - Slide transition (0.5s)
- `/register` - Slide transition (0.5s)
- `/dashboard` - Scale transition (0.4s)
- `/404` - Fade transition (0.2s)

## Performance Considerations

- All transitions are optimized for 60fps performance
- Uses `AnimatePresence` for proper exit animations
- Supports React Suspense for code splitting
- Includes proper cleanup and memory management

## Accessibility

- All animations respect `prefers-reduced-motion` media query
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## Testing

Each component includes comprehensive tests:

```bash
# Run all component tests
npm test src/components/__tests__/

# Run specific component tests
npm test src/components/__tests__/PageTransition.test.jsx
```

## Usage Guidelines

### Components
- Keep components focused on a single responsibility
- Use composition over inheritance
- Include PropTypes for better documentation
- Write tests for all components

### Transitions
- Use appropriate transition types for different contexts
- Keep transition durations between 200ms-500ms
- Consider user experience and accessibility
- Test on different devices and browsers

### Loading States
- Show loading states for async operations
- Use appropriate spinner sizes for different contexts
- Provide meaningful loading messages
- Consider skeleton screens for longer loading times

## Import Guidelines

### Clean Imports
Use index files for clean, organized imports:

```javascript
// ✅ Good - Clean imports
import { PageTransition, LoadingSpinner, PageLoading } from './components';

// ❌ Avoid - Direct file imports
import PageTransition from './components/PageTransition';
import LoadingSpinner from './components/LoadingSpinner';
```

### Relative Paths
Use relative paths from the current file location:

```javascript
// From src/App.jsx
import { PageTransition } from './components';

// From src/components/Navbar.jsx
import { LoadingSpinner } from './';
``` 