// action stypes
import { IS_LOADING } from './actionTypes';

/**
 * isLoading Action Creator
 * 
 * @param {number} status
 * 
 * @returns {Object}
 */
export const loadingAction = status => {
  return { type: IS_LOADING, status };
};
