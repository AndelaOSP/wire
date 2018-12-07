import * as axios from 'axios';
import { FETCH_INCIDENTS_SUCCESS, SEARCH_INCIDENTS, CHANGE_STATUS } from './actionTypes';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// load Incidents Action Creator
export const loadIncidentsSuccess = incidents => ({
  type: FETCH_INCIDENTS_SUCCESS,
  incidents,
  isLoading: false,
  isError: false,
});

/**
 * loadIncident Thunk
 */

export const loadIncidents = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: token };
  return (dispatch) => {
    dispatch(loadingAction(true));
    return axios
      .get(config.INCIDENTS_URL, { headers })
      .then((incidents) => {
        dispatch(
          loadIncidentsSuccess(
            incidents.data.data.incidents.sort((a, b) => (new Date(b.createdAt)
              .getTime() > new Date(a.createdAt).getTime() ? 1 : -1)),
          ),
        );
      })
      .catch(error => dispatch(errorAction(error)));
  };
};

// Search staff action creator
export const searchIncidentsSuccess = incidents => (
  { type: SEARCH_INCIDENTS, incidents, isError: false });

export const searchIncidents = (query) => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: token };
  return dispatch => axios
    .get(`${config.SEARCH_INCIDENTS_URL}?q=${query}`, { headers })
    .then((res) => {
      dispatch(searchIncidentsSuccess(res.data.data.incidents));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Change status action creator
export const changeStatusSuccess = incidentId => ({ type: CHANGE_STATUS, incidentId });

/**
 * Change the status of an incident whether open, closed or in progress
 * @param {*} statusId
 * @param {*} incidentId
 */
export const changeStatus = (statusId, incidentId) => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: token };
  return dispatch => axios
    .put(`${config.INCIDENTS_URL}/${incidentId}/`, { statusId }, { headers })
    .then((res) => {
      dispatch(changeStatusSuccess(res.data.data));
    })
    .catch(error => dispatch(errorAction(error)));
};
