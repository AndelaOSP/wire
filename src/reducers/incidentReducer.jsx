import initialState from './initialState';
import { FETCH_INCIDENTS_SUCCESS, CHANGE_STATUS } from '../actions/actionTypes';

const incidentReducer = (state = initialState.incidents, action) => {
    switch (action.type) {
        case FETCH_INCIDENTS_SUCCESS:
            return action.incidents;

        case CHANGE_STATUS:
            return state;

        default:
            return state;
    }
};

export default incidentReducer;
