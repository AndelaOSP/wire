import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidents from './incidentReducer';

const rootReducer = combineReducers({
    incidents,
    router: routerReducer,
});

export default rootReducer;
