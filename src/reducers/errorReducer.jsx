import initialState from './initialState';
import {
  ERROR_ACTION,
  FETCH_INCIDENTS_SUCCESS,
  FETCH_INCIDENT,
  SEARCH_INCIDENTS,
  FETCH_STAFF,
  GET_TOKEN_SUCCESS,
  SEARCH_USER
} from '../actions/actionTypes';

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case ERROR_ACTION:
      return {
        status: action.status,
        statusCode: action.statusCode,
        message: action.message
      };

    case FETCH_INCIDENTS_SUCCESS:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    case FETCH_INCIDENT:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    case SEARCH_INCIDENTS:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    case FETCH_STAFF:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    case SEARCH_USER:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    case GET_TOKEN_SUCCESS:
      return {
        status: action.isError,
        statusCode: null,
        message: ''
      };

    default:
      return state;
  }
};

export default errorReducer;
