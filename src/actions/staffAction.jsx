import * as axios from 'axios';
import {
  FETCH_STAFF, ADD_USER, SEARCH_USER, EDIT_USER, DELETE_USER, 
} from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// Fetch staff action creator
export const fetchStaffSuccess = staff => ({
  type: FETCH_STAFF, staff, isLoading: false, isError: false, 
});

export const fetchStaff = () => (dispatch) => {
  dispatch(loadingAction(true));
  return axios
    .get(`${config.API_URL}/users`)
    .then((res) => {
      dispatch(fetchStaffSuccess(res.data.data.users));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Search staff action creator
export const searchUserSuccess = staff => ({ type: SEARCH_USER, staff, isError: false });

export const searchUsers = query => dispatch => axios
  .get(`${config.API_URL}/users/search/?q=${query}`)
  .then((res) => {
    dispatch(searchUserSuccess(res.data.data.users));
  })
  .catch(error => dispatch(errorAction(error)));

// Invite User action creator
export const inviteUserSuccess = staff => ({ type: ADD_USER, staff, isError: false });

export const inviteUser = (email, roleId, locationId) => dispatch => axios
  .post(`${config.API_URL}/users/invite`, { email, roleId, locationId })
  .then((res) => {
    dispatch(inviteUserSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));

// Update User action creator
export const updateUserSuccess = (staff, index) => ({
  type: EDIT_USER, staff, index, isError: false, 
});

export const updateUser = (userId, roleId, index) => dispatch => axios
  .put(`${config.API_URL}/users/${userId}`, { roleId })
  .then((res) => {
    dispatch(updateUserSuccess(res.data.data, index));
  })
  .catch(error => dispatch(errorAction(error)));

// Delete User action creator
export const removeUserSuccess = (staff, index) => ({
  type: DELETE_USER, staff, index, isError: false, 
});

export const removeUser = (userId, index) => dispatch => axios
  .delete(`${config.API_URL}/users/${userId}`)
  .then((res) => {
    dispatch(removeUserSuccess(res.data.data, index));
  })
  .catch(error => dispatch(errorAction(error)));
