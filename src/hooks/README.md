# Custom Hooks

This directory contains custom React hooks that encapsulate reusable logic.

## Purpose

- Extract reusable stateful logic from components
- Share logic between components without changing their hierarchy
- Create composable, testable logic

## Structure

```
hooks/
├── useLocalStorage.js    # Local storage management
├── useApi.js            # API calls and data fetching
├── useForm.js           # Form handling and validation
├── useAuth.js           # Authentication state
└── useTheme.js          # Theme management
```

## Guidelines

- Follow the `use` prefix naming convention
- Keep hooks focused on a single responsibility
- Include proper error handling
- Add JSDoc comments for documentation
- Test hooks thoroughly

## Example

```javascript
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
``` 