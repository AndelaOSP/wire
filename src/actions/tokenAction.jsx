import * as axios from 'axios';
import { GET_TOKEN_SUCCESS } from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// Get Token Action creator

export const getTokenSuccess = (hasToken, token) => {
  localStorage.setItem('token', token);
  return {
    type: GET_TOKEN_SUCCESS,
    isLoading: false,
    isError: false,
    hasToken
  };
};

/**
 * getToken Thunk
 */

export const getToken = email => {
  let loginUrl = `${config.API_URL}/users/login`;
  return dispatch => {
    dispatch(loadingAction(true));
    return axios
      .post(loginUrl, { email })
      .then(response => {
        dispatch(getTokenSuccess(true, response.data.userToken));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
