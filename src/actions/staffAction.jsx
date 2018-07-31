import * as axios from 'axios';
import { FETCH_STAFF, ADD_USER, SEARCH_USER, EDIT_USER, DELETE_USER } from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// Fetch staff action creator
export const fetchStaffSuccess = staff => {
  return { type: FETCH_STAFF, staff, isLoading: false, isError: false };
};

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

// Search staff action creator
export const searchUserSuccess = staff => {
  return { type: SEARCH_USER, staff, isError: false };
};

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

// Invite User action creator
export const inviteUserSuccess = staff => {
  return { type: ADD_USER, staff, isError: false };
};

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
