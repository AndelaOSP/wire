import initialState from './initialState';
import { FETCH_STAFF, SEARCH_USER, ADD_USER } from '../actions/actionTypes';

const staffReducer = (state = initialState.staff, action) => {
  switch (action.type) {
    case FETCH_STAFF:
      return action.staff;

    case ADD_USER:
      return [...state, action.staff];

    case SEARCH_USER:
      return action.staff;

    default:
      return state;
  }
};

export default staffReducer;
