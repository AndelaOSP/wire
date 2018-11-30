import { IS_LOADING } from './actionTypes';

export const loadingAction = status => ({
  type: IS_LOADING, status
});
