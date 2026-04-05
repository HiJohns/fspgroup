# AGENTS.md - FSP Group Website

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

## Code Style Guidelines

### File Organization
```
src/
├── actions/          # Redux action creators
├── clients/          # API client modules
├── components/       # Presentational React components
│   ├── executives/   # Domain-specific components
│   ├── main/
│   ├── news/
│   └── sponsors/
├── containers/       # Connected/page components
├── helpers/          # Utility functions
├── middlewares/      # Redux middleware
├── reducers/         # Redux reducers
├── static/           # Static JSON data
└── *.js              # Page entry points
```

### Key Conventions

**Indentation**: 4 spaces

**Strings**: Single quotes
```javascript
const name = 'FSP';
const path = 'dist/images/logo.png';
```

**Semicolons**: Required

**Variable Declarations**: Use `let` and `const`, avoid `var`

**Exports**: Default for components, named for utilities
```javascript
// Component
export default class MyComponent extends Component { }

// Utilities
export const formatDate = (date) => { };
```

### React Components

**Class-based** with PropTypes:
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MyComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object),
        onSelect: PropTypes.func
    };

    static defaultProps = {
        items: [],
        onSelect: () => {}
    };

    render() {
        const { title, items } = this.props;
        return (
            <div className="component">
                <h1>{title}</h1>
                {items.map((item, idx) => this.renderItem(item, idx))}
            </div>
        );
    }
}
```

**Inline Styles**: CamelCase JavaScript objects
```javascript
const styles = {
    container: {
        backgroundColor: 'rgb(27,42,68)',
        height: '100px',
        display: 'flex'
    }
};
```

### Redux Patterns

**Actions**:
```javascript
export const load = (id) => ({
    type: 'DOMAIN_LOAD',
    payload: { id }
});

export const clear = () => ({ type: 'DOMAIN_CLEAR' });
```

**Reducers**:
```javascript
const defaultState = {
    current: null,
    loading: false
};

export default (state = defaultState, action) => {
    let { payload, type } = action, update = {};
    switch (type) {
        case 'DOMAIN_LOAD_SUCCESS':
            if (!payload.success) break;
            update.current = payload.result;
            break;
        default:
            break;
    }
    return Object.assign({}, state, update);
};
```

**Middleware**:
```javascript
import MyClient from '../clients/MyClient';

const loadData = (getState, action, next) => {
    let { payload } = action;
    MyClient.load(payload.id).then(
        (result) => {
            next({ ...action, payload: { ...payload, success: true, result } });
        },
        (err) => {
            next({ ...action, payload: { ...payload, success: false, err } });
            alert('Server error. Please try again later.');
        }
    );
};

export default {
    'DOMAIN_LOAD': loadData
};
```

**Middleware Registration** (src/middlewares/index.js):
```javascript
import About from './About';
import News from './News';

let combine = {};
[About, News].forEach((handlers) => {
    for (let key in handlers) {
        let list = combine.hasOwnProperty(key) ? combine[key] : [];
        list.push(handlers[key]);
        combine[key] = list;
    }
});
export default combine;
```

**Container Components**:
```javascript
import { connect } from 'react-redux';
import Page from '../../components/Page';
import HeaderMenu from '../../static/HeaderMenu';
import Section from '../main/';

export default connect((state) => ({
    name: 'main',
    menu: HeaderMenu,
    content: Section
}))(Page);
```

### API Clients

```javascript
import superagent from 'superagent';

export default {
    load: (id) =>
        new Promise((resolve, reject) => {
            superagent
                .get(`dist/html/${id}.html`)
                .end((err, res) => {
                    if (err) reject(err.response);
                    else resolve(res.text);
                });
        })
};
```

### Import Order

```javascript
// 1. External libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 2. Relative imports
import MyComponent from '../components/MyComponent';
import { formatDate } from '../helpers/Utils';
import myData from '../static/myData.json';
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | PascalCase | `NewsClient.js` |
| React Components | PascalCase | `MyComponent` |
| Functions/variables | camelCase | `loadData`, `currentPage` |
| Constants | UPPER_SNAKE | `API_PATH`, `MAX_RETRIES` |
| Action types | UPPER_SNAKE | `NEWS_LOAD`, `ABOUT_UPDATE` |
| JSON keys | camelCase | `"firstName": "John"` |

### Error Handling

- Always handle both success and failure in middleware
- Show user-friendly alerts for critical errors
- Use Promise `.then()` and `.catch()` for async operations
- Log errors to console in development mode

### HTML Templates

Static HTML entry points must:
- Include `<div id="app"></div>` for React mounting
- Load compiled JS from `dist/js/[name].min.js`
- Load CSS from `dist/css/style.css`

### Webpack Entry Points

- bundle: Main application
- about: About page
- executives: Executives page
- news: News page
- seminars: Seminars page
- sponsors: Sponsors page

Build outputs to `dist/js/[name].min.js`

### Adding New Features

1. **New Page**: Create entry point, container in `containers/pages/`, add route in entry file
2. **New Data Type**: Add action, reducer, middleware, and client following patterns
3. **New Component**: Place in appropriate `components/` subdirectory
4. **Update Navigation**: Modify `src/static/HeaderMenu.json`

### Key Dependencies

- react ^16.14.0, react-dom ^16.14.0
- react-redux ^7.2.8, redux ^4.2.0
- react-router-dom ^5.3.3
- connected-react-router ^6.9.3
- superagent ^7.1.6 (HTTP client)
- moment ^2.29.4 (date formatting)
- webpack ^5.75.0, babel ^7.20.0
