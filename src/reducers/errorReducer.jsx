import initialState from './initialState';
import { ERROR_ACTION, FETCH_INCIDENTS_SUCCESS, FETCH_INCIDENT, FETCH_STAFF } from '../actions/actionTypes';

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case ERROR_ACTION:
      return {
        status: action.status,
        message: action.message
      };

    case FETCH_INCIDENTS_SUCCESS:
      return {
        status: action.isError,
        message: ''
      };

    case FETCH_INCIDENT:
      return {
        status: action.isError,
        message: ''
      };

    case FETCH_STAFF:
      return {
        status: action.isError,
        message: ''
      };

    default:
      return state;
  }
};

export default errorReducer;
