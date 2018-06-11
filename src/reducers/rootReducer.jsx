import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidents from './incidentReducer';
import isLoading from './loadingReducer';
import error from './errorReducer';
import selectedIncident from './selectedIncidentReducer';
import staff from './staffReducer';
import hasToken from './tokenReducer';

const rootReducer = combineReducers({
  incidents,
  isLoading,
  hasToken,
  error,
  selectedIncident,
  staff,
  router: routerReducer
});

export default rootReducer;
