import * as axios from 'axios';
import { ADD_NOTE } from './actionTypes';

const url = () => {
  return 'https://wire-api.herokuapp.com/api/incidents';
};

// Add notes Action Creator
export const addNoteSuccess = note => {
  return { type: ADD_NOTE, note };
};

/**
 * Add notes to an incident
 * @param {*} notesText
 * @param {*} incidentId
 */
export const addNote = (noteText, incidentId) => {
  let notesUrl = `${url()}/${incidentId}/notes`;
  return dispatch => {
    return axios
      .post(notesUrl, {
        note: noteText
      })
      .then(res => {
        dispatch(addNoteSuccess(res.data.data));
      })
      .catch(error => {
        return error;
      });
  };
};
