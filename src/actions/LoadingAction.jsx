import { IS_LOADING } from './actionTypes';

// isLoading Action Creator
export const loadingAction = status => {
  return { type: IS_LOADING, status };
};
