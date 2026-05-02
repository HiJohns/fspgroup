# AGENTS.md - FSP Group Website

> Universal coding rules: see `prompts/instructions.md` §1.1

## Project Overview

React-based static website for the Federation of Security Professionals using Redux architecture with custom middleware. The project builds multiple entry points via Webpack.

## Build Commands

```bash
# Install dependencies
npm install

# Production build (minified)
npm run build
# or
make web

# Development build
npm run build:dev
# or
make web-dev

# Watch mode for development
npm run watch

# Deploy to FTP
make deploy

# Create backup
make backup
```

**Note**: No test framework is currently configured. To test changes, open HTML files directly in browser and use DevTools (F12).

## HTML Templates

Static HTML entry points must:
- Include `<div id="app"></div>` for React mounting
- Load compiled JS from `dist/js/[name].min.js`
- Load CSS from `dist/css/style.css`

## Webpack Entry Points

- bundle: Main application
- about: About page
- executives: Executives page
- news: News page
- seminars: Seminars page
- sponsors: Sponsors page

Build outputs to `dist/js/[name].min.js`

## Adding New Features

1. **New Page**: Create entry point, container in `containers/pages/`, add route in entry file
2. **New Data Type**: Add action, reducer, middleware, and client following patterns
3. **New Component**: Place in appropriate `components/` subdirectory
4. **Update Navigation**: Modify `src/static/HeaderMenu.json`

## Key Dependencies

- react ^16.14.0, react-dom ^16.14.0
- react-redux ^7.2.8, redux ^4.2.0
- react-router-dom ^5.3.3
- connected-react-router ^6.9.3
- superagent ^7.1.6 (HTTP client)
- moment ^2.29.4 (date formatting)
- webpack ^5.75.0, babel ^7.20.0
