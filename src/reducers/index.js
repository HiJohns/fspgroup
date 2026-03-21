import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import about from './About'
import news from './News'

export default (history) => combineReducers({
    about,
    news,
    router: connectRouter(history)
})
