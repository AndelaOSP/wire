import initialState from './initialState';
import { FETCH_STAFF } from '../actions/actionTypes';

const staffReducer = (state = initialState.staff, action) => {
  switch (action.type) {
    case FETCH_STAFF:
      return [...action.staff];
    default:
      return state;
  }
};

export default staffReducer;
