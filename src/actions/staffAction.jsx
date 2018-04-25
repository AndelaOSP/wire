import * as axios from 'axios';
import { FETCH_STAFF } from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// Fetch staff action creator
export const fetchStaffSuccess = staff => {
  return { type: FETCH_STAFF, staff, isError: false };
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
