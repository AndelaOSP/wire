import * as axios from 'axios';
import { FETCH_LOCATIONS } from './actionTypes';
import config from '../config/index';
import { errorAction } from './errorAction';

// Fetch staff action creator
export const fetchLocationsSuccess = locations => {
  return { type: FETCH_LOCATIONS, locations, isError: false };
};

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
