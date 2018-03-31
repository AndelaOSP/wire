import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null,
  applyMiddleware(thunk)
);

export default store;
