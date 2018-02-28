import initialState from './initialState';
<<<<<<< HEAD
import { IS_LOADING, ERROR_ACTION, FETCH_INCIDENTS_SUCCESS, FETCH_INCIDENT } from '../actions/actionTypes';
=======
import { IS_LOADING, ERROR_ACTION, FETCH_INCIDENTS_SUCCESS } from '../actions/actionTypes';
>>>>>>> chore: extra action type for loading incidents

const loadingReducer = (state = initialState.isLoading, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status;

    case FETCH_INCIDENTS_SUCCESS:
      return action.isLoading;

<<<<<<< HEAD
    case FETCH_INCIDENT:
      return action.isLoading;

=======
>>>>>>> chore: extra action type for loading incidents
    case ERROR_ACTION:
      return !action.status;

    default:
      return state;
  }
};

export default loadingReducer;
