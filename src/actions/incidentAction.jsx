import { FETCH_INCIDENTS_SUCCESS } from './actionTypes';

const url = () => {
    return 'www.url.com';
};

const apiKey = 'apiKey';

// load Incidents Action Creator
export const loadIncidentsSuccess = (incidents) => {
    return { type: FETCH_INCIDENTS_SUCCESS, incidents}
};

export const loadIncidents = () => {
    return ((dispatch) => {
        return fetch(url(), {

        }).then((response) => {
            dispatch(loadIncidentsSuccess(response));
        })
    })
};

