import initialState from './initialState';
import { ERROR_ACTION } from '../actions/actionTypes';

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case ERROR_ACTION:
      return {
        status: action.status,
        message: action.message
      };

    default:
      return state;
  }
};

export default errorReducer;
