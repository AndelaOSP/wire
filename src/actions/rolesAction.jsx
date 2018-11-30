// third-party libraries
import * as axios from 'axios';

// helpers
import config from '../config/index';

// action types
import { FETCH_ROLES } from './actionTypes';

// thunk actions
import { errorAction } from './errorAction';

/**
 * Fetch staff roles action creator
 * 
 * @param {Object[]} roles
 * 
 * @returns {Object}
 */
export const fetchRolesSuccess = roles => {
  return { type: FETCH_ROLES, roles, isError: false };
};

/**
 * Fetch staff roles action creator
 * 
 * @returns {Function}
 */
export const fetchRoles = () => {
  return dispatch => {
    return axios
      .get(`${config.API_URL}/roles`)
      .then(res => {
        dispatch(fetchRolesSuccess(res.data.data.roles));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
