import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import incidents from './incidentReducer';
import isLoading from './loadingReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  incidents,
  isLoading,
  error,
  router: routerReducer
});

export default rootReducer;
