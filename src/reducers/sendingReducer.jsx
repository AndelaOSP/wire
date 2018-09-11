import initialState from './initialState';
import {
    IS_SENDING,
    ADD_USER
} from '../actions/actionTypes';

const loadingReducer = (state = initialState.isSending, action) => {
    switch (action.type) {
        case IS_SENDING:
            return action.status;

        case ADD_USER:
            return action.isSending;

        default:
            return state;
    }
};

export default loadingReducer;