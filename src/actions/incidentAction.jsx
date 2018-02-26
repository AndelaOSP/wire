import * as axios from 'axios';
import { FETCH_INCIDENTS_SUCCESS, CHANGE_STATUS } from './actionTypes';
import config from '../config/index';

// load Incidents Action Creator
export const loadIncidentsSuccess = incidents => {
  return { type: FETCH_INCIDENTS_SUCCESS, incidents };
};

/**
 * loadIncident Thunk
 */
export const loadIncidents = () => {
  return dispatch => {
    return axios
      .get(config.INCIDENTS_URL)
      .then(incidents => {
        dispatch(loadIncidentsSuccess(incidents.data.data.incidents));
      })
      .catch(error => {
        return error;
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
  return dispatch => {
    return axios
      .put(`${config.INCIDENTS_URL}/${incidentId}/`, {
        statusId: statusId
      })
      .then(res => {
        dispatch(changeStatusSuccess(res.data.data));
      })
      .catch(error => {
        return error;
      });
  };
};
