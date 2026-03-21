import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { createBrowserHistory } from 'history'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { routerMiddleware, push } from 'react-router-redux'
import moment from 'moment'

import app from './reducers'
import middlewares from './middlewares'
import News from './containers/pages/News'
import { load as loadNews } from './actions/News' 
import { forceHttps } from './helpers/Utils'

forceHttps()

let store = null;
let history = createBrowserHistory()

const middlewareLoader = ({ getState }) => {
    return (next) => (action) => { 
        if (!middlewares.hasOwnProperty(action.type)) return next(action);
        middlewares[action.type].forEach(loader => {
            loader(getState, action, next) 
        });
    }
}

const logger = ({ getState }) => {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

store = createStore( app, {}, applyMiddleware(routerMiddleware(history), middlewareLoader, logger) );

window.store = store;

let segments = location.search
    .replace(/^\?/, '')
    .split('&')
    .filter(segment => segment.match(/^id=/) !== null);

if (segments.length > 0) { store.dispatch(loadNews(segments[0].substring(3))); }

render((
    <Provider store={store}>
        <ConnectedRouter history={history} basename="/">
            <Switch>
                <Route path="/" component={News} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));
