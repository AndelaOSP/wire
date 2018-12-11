import { FETCH_LOCATIONS } from './actionTypes';
import { errorAction } from './errorAction';
import { http } from './http';

export const fetchLocationsSuccess = locations => ({
  type: FETCH_LOCATIONS, locations, isError: false,
});

export const fetchLocations = () => dispatch => http().get('/locations')
  .then((res) => {
    dispatch(fetchLocationsSuccess(res.data.data.locations));
  })
  .catch(error => dispatch(errorAction(error)));
