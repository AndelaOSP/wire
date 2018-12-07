import * as axios from 'axios';
import config from '../config/index';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';
import {
  FETCH_INCIDENT,
  ADD_NOTE,
  EDIT_NOTE,
  CHANGE_STATUS,
  ADD_CHAT,
  CHANGE_ASSIGNEE,
  ARCHIVE_NOTE,
} from './actionTypes';

const loadIncident = (incidentId) => {
  const headers = { Authorization: localStorage.token };
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}`, { headers });
};

const loadNotes = incidentId => axios.get(`${config.INCIDENTS_URL}/${incidentId}/notes`);

const loadChats = incidentId => axios.get(`${config.INCIDENTS_URL}/${incidentId}/chats`);

// load Incident Action Creator
export const loadIncidentSuccess = incident => ({
  type: FETCH_INCIDENT, incident, isLoading: false, isError: false, 
});

/**
 * loadIncident Thunk
 */
export const loadIncidentDetails = incidentId => (dispatch) => {
  dispatch(loadingAction(true));
  return axios
    .all([loadIncident(incidentId), loadNotes(incidentId), loadChats(incidentId)])
    .then((arr) => {
      const incident = arr[0].data.data;
      incident.notes = arr[1].data.data.notes;
      incident.chats = arr[2].data.data.chats;
      dispatch(loadIncidentSuccess(incident));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Add notes Action Creator
export const addNoteSuccess = note => ({ type: ADD_NOTE, note });

/**
 * Add notes to an incident
 * @param {*} notesText
 * @param {*} incidentId
 */
export const addNote = (noteText, incidentId) => {
  const notesUrl = `${config.INCIDENTS_URL}/${incidentId}/notes`;
  return dispatch => axios
    .post(notesUrl, {
      note: noteText,
      userEmail: localStorage.getItem('email'),
    })
    .then((res) => {
      dispatch(addNoteSuccess(res.data.data));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Edit notes Action Creator
export const editNoteSuccess = (note, index) => ({ type: EDIT_NOTE, note, index });

/**
 * Edit a note on an incident
 * @param {*} noteText
 * @param {*} noteId
 */
export const editNote = (noteText, noteId, index) => {
  const noteUrl = `${config.NOTES_URL}/${noteId}`;
  return dispatch => axios
    .put(noteUrl, {
      note: noteText,
      userEmail: localStorage.getItem('email'),
    })
    .then((res) => {
      dispatch(editNoteSuccess(res.data.data, index));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Archive note action creator
export const archiveNoteSuccess = (note, index) => ({ type: ARCHIVE_NOTE, note, index });

export const archiveNote = (noteId, index) => dispatch => axios
  .delete(`${config.NOTES_URL}/${noteId}`)
  .then((res) => {
    dispatch(archiveNoteSuccess(res.data.data, index));
  })
  .catch(error => dispatch(errorAction(error)));

// Change incident status action creator
export const changeStatusSuccess = incident => ({ type: CHANGE_STATUS, incident });

/**
 * Change the status of an incident whether open, closed or in progress
 * @param {*} statusId
 * @param {*} incidentId
 */
export const changeStatus = (statusId, incidentId) => {
  const headers = { Authorization: localStorage.token };
  return dispatch => axios
    .put(
      `${config.INCIDENTS_URL}/${incidentId}/`,
      {
        statusId,
      },
      { headers },
    )
    .then((res) => {
      dispatch(changeStatusSuccess(res.data.data));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Change incident assignee action creator
export const changeAssigneeSuccess = incident => ({ type: CHANGE_ASSIGNEE, incident });

/**
 * Change assignee thunk
 * @param {*} assigneeId
 * @param {*} incidentId
 */
export const changeAssignee = (payload) => {
  const headers = { Authorization: localStorage.token };
  return dispatch => axios
    .put(
      `${config.INCIDENTS_URL}/${payload.incidentId}/`,
      {
        assignee: payload,
      },
      { headers },
    )
    .then((res) => {
      dispatch(changeAssigneeSuccess(res.data.data));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Handle CC'd action creator
export const changeCCdSuccess = incident => ({ type: CHANGE_ASSIGNEE, incident });

/**
 * Handle CCd thunk
 * @param {*} assigneeId
 * @param {*} incidentId
 * @param {*} status
 */
export const handleCC = (payload) => {
  const headers = { Authorization: localStorage.token };
  return dispatch => axios
    .put(
      `${config.INCIDENTS_URL}/${payload.incidentId}/`,
      {
        ccd: payload.ccdUsers,
      },
      { headers },
    )
    .then((res) => {
      dispatch(changeCCdSuccess(res.data.data));
    })
    .catch(error => dispatch(errorAction(error)));
};

// Send chat message action creator
export const sendMessageSuccess = chat => ({ type: ADD_CHAT, chat });

/**
 * Send chat message thunk
 * @param {*} incidentId
 * @param {*} message
 */
export const sendMessage = (incidentId, message) => dispatch => axios
  .post(`${config.INCIDENTS_URL}/${incidentId}/chats`, {
    chat: message,
    userEmail: localStorage.getItem('email'),
  })
  .then((res) => {
    dispatch(sendMessageSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));
