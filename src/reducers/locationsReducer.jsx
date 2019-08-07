import initialState from './initialState';
import { FETCH_LOCATIONS } from '../actions/actionTypes';

const locationsReducer = (state = initialState.locations, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return action.locations;

    default:
      return state;
  }
};

export default locationsReducer;
