import { http } from './http';
import { FETCH_INCIDENTS_SUCCESS, SEARCH_INCIDENTS, CHANGE_STATUS } from './actionTypes';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

export const loadIncidentsSuccess = incidents => ({
  type: FETCH_INCIDENTS_SUCCESS,
  incidents,
  isLoading: false,
  isError: false,
});

export const loadIncidents = () => (dispatch) => {
  dispatch(loadingAction(true));
  return http().get('/incidents')
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

export const searchIncidentsSuccess = incidents => ({
  type: SEARCH_INCIDENTS, incidents, isError: false,
});

export const searchIncidents = query => dispatch => http().get(`/search/incidents/?q=${query}`)
  .then((res) => {
    dispatch(searchIncidentsSuccess(res.data.data.incidents));
  })
  .catch(error => dispatch(errorAction(error)));

export const changeStatusSuccess = incidentId => ({
  type: CHANGE_STATUS, incidentId,
});

export const changeStatus = (statusId, incidentId) => dispatch => http()
  .put(`/incidents/${incidentId}/`, { statusId })
  .then((res) => {
    dispatch(changeStatusSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));
