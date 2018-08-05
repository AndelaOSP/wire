import initialState from './initialState';
import { FETCH_ROLES } from '../actions/actionTypes';

const rolesReducer = (state = initialState.roles, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return action.roles;

    default:
      return state;
  }
};

export default rolesReducer;
