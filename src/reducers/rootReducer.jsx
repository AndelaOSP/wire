import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidenReducer from './incidentReducer';

const rootReducer = combineReducers({
    incidenReducer,
    router: routerReducer,
});

export default rootReducer;
