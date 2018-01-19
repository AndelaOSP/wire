import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidents from './incidentReducer';
import notes from './noteReducer';

const rootReducer = combineReducers({
    incidents,
    notes,
    router: routerReducer,
});

export default rootReducer;
