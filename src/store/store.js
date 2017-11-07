import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import { history } from '../routes';

import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const RouteMiddleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk,
        RouteMiddleware
    )
);
export default store;