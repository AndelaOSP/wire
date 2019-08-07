import initialState from './initialState';
import { GET_TOKEN_SUCCESS } from '../actions/actionTypes';

const tokenReducer = (state = initialState.hasToken, action) => {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      return action.hasToken;
    default:
      return state;
  }
};

export default tokenReducer;
