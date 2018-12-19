import { GET_TOKEN_SUCCESS } from './actionTypes';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';
import { http } from './http';

export const getTokenSuccess = (hasToken, token) => {
  localStorage.setItem('token', token);
  return {
    type: GET_TOKEN_SUCCESS,
    isLoading: false,
    isError: false,
    hasToken,
  };
};

export const getToken = email => (dispatch) => {
  dispatch(loadingAction(true));
  return http()
    .post('/users/login', { email })
    .then((response) => {
      dispatch(getTokenSuccess(true, response.data.userToken));
    })
    .catch(error => dispatch(errorAction(error)));
};
