import * as axios from 'axios';
import { FETCH_ROLES } from './actionTypes';
import config from '../config/index';
import { errorAction } from './errorAction';

// Fetch staff action creator
export const fetchRolesSuccess = roles => ({ type: FETCH_ROLES, roles, isError: false });

export const fetchRoles = () => dispatch => axios
  .get(`${config.API_URL}/roles`)
  .then((res) => {
    dispatch(fetchRolesSuccess(res.data.data.roles));
  })
  .catch(error => dispatch(errorAction(error)));
