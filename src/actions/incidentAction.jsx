import * as axios from 'axios';
import { FETCH_INCIDENTS_SUCCESS } from './actionTypes';

const url = () => {
    // get all incidents
    return 'https://private-3b686-wire3.apiary-mock.com/incidents';
};

// load Incidents Action Creator
export const loadIncidentsSuccess = (incidents) => {
    return { type: FETCH_INCIDENTS_SUCCESS, incidents};
};

/**
 * loadIncident Thunk
 */
export const loadIncidents = () => {
    return ((dispatch) => {
        return axios.get(url(), {

        }).then((incidents) => {
            dispatch(loadIncidentsSuccess(incidents.data.incidents));
        }).catch((error) => {
            return error;
        });
    });
};
