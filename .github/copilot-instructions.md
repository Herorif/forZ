# AI Agent Instructions for Zalia Loveletter Project

## Project Overview
This is a modern web application project with a focus on frontend development. The application follows a component-based architecture with clear separation of concerns.

## Project Structure
```
public/          # Static assets and public files
src/
  app/          # Core application setup and configuration
  assets/       # Project assets (images, fonts, etc.)
  components/   # Reusable UI components
    animations/ # Animation-related components
    cards/     # Card-based UI components
    inputs/    # Form input components
    media/     # Media-related components
    nav/       # Navigation components
    ui/        # General UI components
  content/     # Content and data files
  hooks/       # Custom React hooks
  lib/         # Utility functions and shared logic
  styles/      # Global styles and theming
```

## Key Development Patterns

### Component Organization
- Components are organized by their functional domain in `src/components/`
- Each component category has its own dedicated directory (e.g., `cards/`, `inputs/`, `nav/`)
- Reusable UI elements should be placed in `components/ui/`

### Project Conventions
- Follow the established directory structure for new components
- Place shared hooks in `src/hooks/`
- Keep utility functions and shared logic in `src/lib/`
- Store global styles and theming in `src/styles/`

### Integration Points
- Asset references should be imported from `src/assets/`
- Content data should be managed in `src/content/`
- Global application configuration lives in `src/app/`

## Best Practices
- Keep components focused and modular
- Reuse existing UI components from `components/ui/` when possible
- Follow the established component organization when adding new features

## Questions or Clarifications
If you need more context or have questions about specific patterns, please ask!