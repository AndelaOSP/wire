import initialState from './initialState';
import {
  IS_LOADING,
  ERROR_ACTION,
  FETCH_INCIDENTS_SUCCESS,
  FETCH_INCIDENT,
  FETCH_STAFF,
  GET_TOKEN_SUCCESS,
} from '../actions/actionTypes';

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status;

    case FETCH_INCIDENTS_SUCCESS:
      return action.isLoading;

    case FETCH_INCIDENT:
      return action.isLoading;

    case FETCH_STAFF:
      return action.isLoading;

    case GET_TOKEN_SUCCESS:
      return action.isLoading;

    case ERROR_ACTION:
      return !action.payload.status;

    default:
      return state;
  }
};

export default loadingReducer;
