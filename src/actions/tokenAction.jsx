// third-party libraries
import * as axios from 'axios';

// helpers
import config from '../config/index';

// action types
import { GET_TOKEN_SUCCESS } from './actionTypes';

// thunk actions
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

/**
 * Get Token Action creator
 * 
 * @param {boolean} hasToken 
 * @param {string} token 
 * 
 * @returns {Object}
 */
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
 * 
 * @param {string} email
 * 
 * @returns {Function}
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
