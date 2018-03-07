import initialState from './initialState';
import { IS_LOADING, ERROR_ACTION, FETCH_INCIDENTS_SUCCESS, FETCH_INCIDENT } from '../actions/actionTypes';

const loadingReducer = (state = initialState.isLoading, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status;

    case FETCH_INCIDENTS_SUCCESS:
      return action.isLoading;

    case FETCH_INCIDENT:
      return action.isLoading;

    case ERROR_ACTION:
      return !action.status;

    default:
      return state;
  }
};

export default loadingReducer;
