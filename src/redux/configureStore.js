import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
//safety net that tells you when you've changed state
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

export default function configureStore(intitialState) {
    //add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, intitialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))
}