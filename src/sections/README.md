# Sections

This directory contains page sections and larger UI components that are specific to particular pages or features.

## Purpose

- Page-specific components that combine multiple smaller components
- Layout sections that appear on multiple pages
- Feature-specific UI sections

## Structure

```
sections/
├── Header/          # Main header section
├── Footer/          # Main footer section
├── Dashboard/       # Dashboard-specific sections
├── Auth/           # Authentication-related sections
└── Profile/        # User profile sections
```

## Guidelines

- Each section should be in its own directory
- Include an index.js file for clean imports
- Keep sections focused on a single responsibility
- Use composition to combine smaller components 