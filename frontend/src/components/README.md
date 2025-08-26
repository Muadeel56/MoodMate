# Navbar Component

A responsive navigation bar component for the MoodMate application.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **MoodMate Branding**: Includes logo and brand name
- **Mobile Menu**: Traditional dropdown hamburger menu below the navbar
- **Navigation Links**: Home, Features, About, Contact
- **Call-to-Action Button**: "Get Started" button
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Smooth Animations**: Slide-down transitions and hover effects
- **Responsive Design**: Adapts seamlessly across all screen sizes

## Usage

```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Your app content */}
    </div>
  );
}
```

## Props

This component doesn't accept any props currently. All navigation links are hardcoded but can be easily modified in the component.

## Styling

The component uses Tailwind CSS classes for styling:
- Purple to blue gradient background
- White text and buttons
- Hover effects and transitions
- Responsive breakpoints (md: for desktop)

## Testing

Run tests with:
```bash
npm test
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Mobile browsers with touch support 