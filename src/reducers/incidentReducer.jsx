import initialState from './initialState';
import { FETCH_INCIDENTS_SUCCESS, CHANGE_STATUS, INCIDENTS_ERROR } from '../actions/actionTypes';

const incidentReducer = (state = initialState.incidents, action) => {
  switch (action.type) {
    case FETCH_INCIDENTS_SUCCESS:
      return {
        ...state,
        incidents: action.incidents
      };

    case INCIDENTS_ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage
      };

    case CHANGE_STATUS:
      return state;

    default:
      return state;
  }
};

export default incidentReducer;
