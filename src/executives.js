import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { createBrowserHistory } from 'history'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import moment from 'moment'

import createRootReducer from './reducers'
import middlewares from './middlewares'
import Executives from './containers/pages/Executives'
import { forceHttps } from './helpers/Utils'

forceHttps()

let store = null;
let history = createBrowserHistory()

const middlewareLoader = ({ getState }) => {
    return (next) => (action) => { 
        if (!middlewares.hasOwnProperty(action.type)) return next(action);
        middlewares[action.type].forEach(function(loader) {
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

store = createStore( createRootReducer(history), {}, applyMiddleware(routerMiddleware(history), middlewareLoader, logger) );

window.store = store;

render((
    <Provider store={store}>
        <ConnectedRouter history={history} basename="/">
            <Switch>
                <Route path="/" component={Executives} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));
