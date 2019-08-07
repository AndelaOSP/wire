import initialState from './initialState';
import {
  FETCH_STAFF, SEARCH_USER, ADD_USER, EDIT_USER, DELETE_USER, 
} from '../actions/actionTypes';

const staffReducer = (state = initialState.staff, action) => {
  switch (action.type) {
    case FETCH_STAFF:
      return action.staff;

    case ADD_USER:
      return [...state, action.staff];

    case EDIT_USER:
      return [...state.slice(0, action.index), action.staff, ...state.slice(action.index + 1)];

    case DELETE_USER:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];

    case SEARCH_USER:
      return action.staff;

    default:
      return state;
  }
};

export default staffReducer;
