import * as axios from 'axios';
import { FETCH_STAFF } from './actionTypes';
import config from '../config/index';

// Fetch staff action creator
export const fetchStaffSuccess = staff => {
  return { type: FETCH_STAFF, staff };
};

export const fetchStaff = () => {
  return dispatch => {
    return axios
      .get(`${config.API_URL}/users`)
      .then(res => {
        dispatch(fetchStaffSuccess(res.data.data.users));
      })
      .catch(error => {
        return error;
      });
  };
};
