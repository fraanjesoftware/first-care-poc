# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BHV Safety Scan - A professional safety assessment quiz tool for Dutch safety training companies. Built as a lead generation tool with a focus on BHV (company safety) compliance.

## Common Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:5173

# Build & Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint checks
```

## Architecture

### Tech Stack
- **Vite** - Build tool and dev server
- **React** - UI framework with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework with custom PostCSS plugin (@tailwindcss/postcss)
- **Lucide React** - Icon library

### Project Structure
```
src/
├── components/      # Reusable UI components
│   ├── Layout.jsx   # Main layout with header/footer
│   ├── ProgressBar.jsx
│   ├── QuestionCard.jsx
│   ├── ResultsChart.jsx
│   └── LeadForm.jsx
├── pages/          # Route pages
│   ├── Home.jsx    # Landing page
│   ├── Quiz.jsx    # Quiz interface
│   ├── Contact.jsx # Lead capture form
│   └── Results.jsx # Results display
└── utils/          # Business logic
    ├── questions.js # Quiz questions data
    └── scoring.js   # Score calculation logic
```

### Key Features
- Multi-step quiz with progress tracking
- Session storage for quiz progress persistence
- Lead capture with validation
- Dynamic scoring system with category breakdowns
- Responsive design optimized for mobile and desktop
- Professional Dutch language UI

### Deployment Notes
- Ready for Azure Static Web Apps deployment
- All environment-specific configs in vite.config.js
- Static assets served from /public directory

## Important Considerations

- **Language**: All UI text is in Dutch
- **Color Scheme**: Primary blue (#0066CC), white backgrounds, grey accents
- **Data Flow**: Quiz answers → Session Storage → Lead Form → Results calculation → Console log (for POC)
- **Form Validation**: Dutch error messages with inline validation
- **Animations**: Tailwind-based CSS transitions for smooth UX
- **PostCSS Configuration**: Uses @tailwindcss/postcss plugin (not the legacy tailwindcss plugin)