import * as axios from 'axios';
import config from '../config/index';
import { GET_TOKEN_SUCCESS } from './actionTypes';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

export const getTokenSuccess = (hasToken, token) => {
  localStorage.setItem('token', token);
  return {
    type: GET_TOKEN_SUCCESS,
    isLoading: false,
    isError: false,
    hasToken,
  };
};

export const getToken = (email) => {
  const loginUrl = `${config.API_URL}/users/login`;
  return (dispatch) => {
    dispatch(loadingAction(true));
    return axios
      .post(loginUrl, { email })
      .then((response) => {
        dispatch(getTokenSuccess(true, response.data.userToken));
      })
      .catch(error => dispatch(errorAction(error)));
  };
};
