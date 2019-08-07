import initialState from './initialState';
import { FETCH_INCIDENTS_SUCCESS, SEARCH_INCIDENTS, CHANGE_STATUS } from '../actions/actionTypes';

const incidentReducer = (state = initialState.incidents, action) => {
  switch (action.type) {
    case FETCH_INCIDENTS_SUCCESS:
      return action.incidents;
    case SEARCH_INCIDENTS:
      return action.incidents;
    default:
      return state;
  }
};

export default incidentReducer;
