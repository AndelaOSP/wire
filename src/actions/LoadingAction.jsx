import { IS_LOADING } from './actionTypes';

// isLoading Action Creator
export const loadingAction = status => ({ type: IS_LOADING, status });
