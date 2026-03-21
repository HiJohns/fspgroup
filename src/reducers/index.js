import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import about from './About'
import news from './News'

export default combineReducers({
    about,
    news,
    routerReducer
})
