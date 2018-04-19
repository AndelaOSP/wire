import * as axios from 'axios';
import { FETCH_INCIDENTS_SUCCESS, CHANGE_STATUS } from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// load Incidents Action Creator
export const loadIncidentsSuccess = incidents => {
  return {
    type: FETCH_INCIDENTS_SUCCESS,
    incidents,
    isLoading: false,
    isError: false
  };
};

/**
 * loadIncident Thunk
 */

export const loadIncidents = () => {
  let token = localStorage.getItem('token');
  let headers = {'Authorization': token};
  return dispatch => {
    dispatch(loadingAction(true));
    return axios
      .get(config.INCIDENTS_URL, {headers})
      .then(incidents => {
        dispatch(
          loadIncidentsSuccess(
            incidents.data.data.incidents.sort((a, b) => {
              return new Date(b.createdAt).getTime() > new Date(a.createdAt).getTime() ? 1 : -1;
            })
          )
        );
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Change status action creator
export const changeStatusSuccess = incidentId => {
  return { type: CHANGE_STATUS, incidentId };
};

/**
 * Change the status of an incident whether open, closed or in progress
 * @param {*} statusId
 * @param {*} incidentId
 */
export const changeStatus = (statusId, incidentId) => {
  let token = localStorage.getItem('token');
  let headers = {'Authorization': token};
  return dispatch => {
    return axios
      .put(`${config.INCIDENTS_URL}/${incidentId}/`, {
        statusId: statusId
      }, {headers})
      .then(res => {
        dispatch(changeStatusSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
