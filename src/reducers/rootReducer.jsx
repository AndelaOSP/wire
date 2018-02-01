import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidents from './incidentReducer';
import isLoading from './loadingReducer';
import error from './errorReducer';
import selectedIncident from './selectedIncidentReducer';
import staff from './staffReducer';

const rootReducer = combineReducers({
  incidents,
  isLoading,
  error,
  selectedIncident,
  staff,
  router: routerReducer
});

export default rootReducer;
