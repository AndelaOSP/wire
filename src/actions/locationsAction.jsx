// third-party libraries
import * as axios from 'axios';

// helpers
import config from '../config/index';

// action types
import { FETCH_LOCATIONS } from './actionTypes';

// thunk actions
import { errorAction } from './errorAction';

/**
 * Fetch staff locations action creator
 * 
 * @param {Object[]} locations
 * 
 * @returns {Object}
 */
export const fetchLocationsSuccess = locations => {
  return { type: FETCH_LOCATIONS, locations, isError: false };
};

/**
 * fetch staff locations thunk
 * 
 * @returns {Function}
 */
export const fetchLocations = () => {
  return dispatch => {
    return axios
      .get(`${config.API_URL}/locations`)
      .then(res => {
        dispatch(fetchLocationsSuccess(res.data.data.locations));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
