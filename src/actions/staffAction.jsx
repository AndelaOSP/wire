// third-party libraries
import * as axios from 'axios';

// helpers
import config from '../config/index';

// action types
import { FETCH_STAFF, ADD_USER, SEARCH_USER, EDIT_USER, DELETE_USER } from './actionTypes';

// thunk actions
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

/**
 * fetch all staffs action creator
 * 
 * @param {Object[]} staff
 * 
 * @returns {Object}
 */
export const fetchStaffSuccess = staff => {
  return { type: FETCH_STAFF, staff, isLoading: false, isError: false };
};

/**
 * fetch all staffs thunk
 * 
 * @returns {Function}
 */
export const fetchStaff = () => {
  return dispatch => {
    dispatch(loadingAction(true));
    return axios
      .get(`${config.API_URL}/users`)
      .then(res => {
        dispatch(fetchStaffSuccess(res.data.data.users));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * search staff action creator
 * 
 * @param {Object[]} staff
 * 
 * @returns {Object}
 */
export const searchUserSuccess = staff => {
  return { type: SEARCH_USER, staff, isError: false };
};

/**
 * search staff thunk
 * 
 * @param {string} query
 * 
 * @returns {Function}
 */
export const searchUsers = query => {
  return dispatch => {
    return axios
      .get(`${config.API_URL}/users/search/?q=${query}`)
      .then(res => {
        dispatch(searchUserSuccess(res.data.data.users));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * invite user action creator
 * 
 * @param {Object} staff
 * 
 * @returns {Object}
 */
export const inviteUserSuccess = staff => {
  return { type: ADD_USER, staff, isError: false };
};

/**
 * invite user thunk
 * 
 * @param {string} email
 * @param {string} roleId
 * @param {string} locationId
 * 
 * @returns {Function}
 */
export const inviteUser = (email, roleId, locationId) => {
  return dispatch => {
    return axios
      .post(`${config.API_URL}/users/invite`, { email, roleId, locationId })
      .then(res => {
        dispatch(inviteUserSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * update user action creator
 * 
 * @param {Object} staff
 * @param {number} index
 * 
 * @returns {Object}
 */
export const updateUserSuccess = (staff, index) => {
  return { type: EDIT_USER, staff, index, isError: false };
};

/**
 * update user thunk
 * 
 * @param {string} userId
 * @param {string} roleId
 * @param {number} index
 * 
 * @returns {Function}
 */
export const updateUser = (userId, roleId, index) => {
  return dispatch => {
    return axios
      .put(`${config.API_URL}/users/${userId}`, { roleId })
      .then(res => {
        dispatch(updateUserSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * delete user action creator
 * 
 * @param {Object} staff
 * @param {number} index
 * 
 * @returns {Object}
 */
export const removeUserSuccess = (staff, index) => {
  return { type: DELETE_USER, staff, index, isError: false };
};

/**
 * delete user thunk
 * 
 * @param {string} userId
 * @param {number} index
 * 
 * @returns {Function}
 */
export const removeUser = (userId, index) => {
  return dispatch => {
    return axios
      .delete(`${config.API_URL}/users/${userId}`)
      .then(res => {
        dispatch(removeUserSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
