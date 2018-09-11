import { IS_SENDING } from './actionTypes';

// isSending Action Creator
export const sendingAction = status => {
    return { type: IS_SENDING, status };
};
