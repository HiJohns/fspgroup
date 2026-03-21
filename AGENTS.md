# AGENTS.md - FSP Group Website

## Project Overview

This is a React-based website for the Federation of Security Professionals using a Redux-like architecture with custom middleware. The project serves static HTML pages with bundled JavaScript.

## Build/Lint/Test Commands

> **Note**: No `package.json` or build configuration found in this repository. The build process appears to be external. When adding new features:
> - Verify changes work by opening HTML files directly in a browser
> - Use browser DevTools (F12) for debugging
> - JavaScript in `dist/` is compiled output; edit source in `src/` only

### If build configuration exists elsewhere
```bash
# Install dependencies (if package.json is added)
npm install

# Development build
npm run build

# Production build  
npm run prod

# Linting
npm run lint

# Run a single test
npm test -- --grep "test name"

# Watch mode for tests
npm test -- --watch
```

## Code Style Guidelines

### File Organization
```
src/
├── actions/          # Redux action creators (one file per domain)
├── clients/          # API clients (fetch/ajax calls)
├── components/       # Presentational React components
│   └── main/         # Sub-components for main page sections
├── containers/       # Smart/connected components
│   ├── pages/        # Page-level containers (Main, Executives, etc.)
│   ├── main/, news/, sponsors/, etc.  # Feature-specific containers
├── helpers/          # Utility functions
├── middlewares/      # Custom Redux middleware
├── reducers/         # Redux reducers (one file per domain)
├── static/           # Static JSON data files
└── index.js          # App entry point
```

### JavaScript Conventions

**Indentation**: 4 spaces

**Variable Declarations**:
- Use `let` for variables, `const` for constants
- Avoid `var`

**Strings**: Single quotes preferred
```javascript
const name = 'John';
const path = 'dist/images/logo.png';
```

**Semicolons**: Required at end of statements

**Export Pattern**:
```javascript
// Default export for modules with single main export
export default function MyComponent() { }

// Named export for utilities and constants
export const HELPER_METHOD = 'value';
export const formatDate = () => { };
```

### React Components

**Class Components** (current convention):
```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object),
        onSelect: PropTypes.func
    }

    static defaultProps = {
        items: [],
        onSelect: () => {}
    }

    render() {
        const { title, items } = this.props;
        return (
            <div className="component">
                <h1>{title}</h1>
                { items.map((item, index) => this.renderItem(item, index)) }
            </div>
        )
    }

    renderItem(item, index) {
        return (
            <div key={'item_' + index}>{item.name}</div>
        )
    }
}
```

**Inline Styles**: Use JavaScript objects with camelCase properties
```javascript
const styles = {
    container: {
        backgroundColor: "rgb(27,42,68)",
        height: "100px",
        display: "flex"
    },
    title: {
        fontSize: "20px"
    }
}
```

### Redux Patterns

**Action Creators** (`src/actions/`):
```javascript
// Simple actions
export const load = id => ({
    type: 'NEWS_LOAD',
    payload: { id }
})

// No parameters
export const clear = () => ({ type: 'CLEAR' })
```

**Reducers** (`src/reducers/`):
```javascript
const defaultState = {
    current: null,
    loading: false
}

export default (state = defaultState, action) => {
    let { payload, type } = action, update = {};
    switch (type) {
    case 'LOAD_SUCCESS': {
            if (!payload.success) break;
            update.current = payload.result;
        }
        break;
    }
    return Object.assign({}, state, update);
}
```

**Middleware** (`src/middlewares/`):
```javascript
import MyClient from '../clients/MyClient'

const loadData = (getState, action, next) => {
    let { payload } = action;
    MyClient.load(payload.id).then(result => {
        next(Object.assign({}, action, { 
            payload: Object.assign({}, payload, { success: true, result }) 
        }));
    }, err => {
        next(Object.assign({}, action, { 
            payload: Object.assign({}, payload, { success: false, err }) 
        }));
        alert('Server error. Please try again later.');
    });
}

export default {
    'LOAD': loadData
}
```

**Middleware Registration** (`src/middlewares/index.js`):
```javascript
import About from './About'
import News from './News'

let combine = {};

export default combine;

[
    About,
    News
].forEach(function (handlers) {
    for (let key in handlers) {
        let list = combine.hasOwnProperty(key) ? combine[key] : [];
        list.push(handlers[key]);
        combine[key] = list;
    }
});
```

**Container Components** (`src/containers/`):
```javascript
import { connect } from 'react-redux'
import Page from '../../components/Page'
import HeaderMenu from '../../static/HeaderMenu'
import Section from '../main/'

export default connect(
    state => ({
        name: 'main',
        menu: HeaderMenu,
        content: Section
    })
)(Page);
```

### API Clients (`src/clients/`)

```javascript
import superagent from 'superagent'

export default {
    load: id => new Promise((resolve, reject) => {
        superagent.get('dist/html/news/' + id + '.html')
            .end((err, res) => {
                if (err) {
                    reject(err.response);
                } else {
                    resolve(res.text);
                }
            });
    })
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | PascalCase or camelCase | `NewsClient.js`, `About.js` |
| React Components | PascalCase | `MyComponent` |
| Functions/variables | camelCase | `loadData`, `currentPage` |
| Constants | UPPER_SNAKE | `MAX_ITEMS`, `API_URL` |
| Action types | UPPER_SNAKE | `NEWS_LOAD`, `ABOUT_UPDATE` |
| JSON keys | camelCase | `"firstName": "John"` |

### Error Handling

- Use Promises with `.then()` and `.catch()` for async operations
- Show user-friendly alerts for critical errors
- Log errors to console during development
- Always handle both success and failure cases in middleware

### Imports

**Order**:
1. External libraries (React, Redux, React Router, etc.)
2. Relative imports (actions, components, helpers)

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Footer from '../containers/Footer'
import Header from '../components/Header'
import { formatDate } from '../helpers/Utils'
```

### HTML Templates

**Static HTML files** serve as entry points:
- Include `<div id="app"/>` for React mounting
- Load compiled JS from `dist/js/bundle.min.js`
- Load CSS from `dist/css/style.css`

### Adding New Features

1. **New Page**: Create container in `src/containers/pages/`
2. **New Data Type**: Add action/reducer/middleware/client following existing patterns
3. **New Component**: Place in appropriate `components/` or `containers/` subdirectory
4. **Update HTML**: Add route in `src/index.js` and link in `src/static/HeaderMenu.json`

### Key Dependencies

- react, react-dom
- react-router, react-router-redux
- redux
- superagent (HTTP client)
- moment (date formatting)
