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
  ARCHIVE_NOTE
} from './actionTypes';

const loadIncident = incidentId => {
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}`);
};

const loadNotes = incidentId => {
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}/notes`);
};

const loadChats = incidentId => {
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}/chats`);
};

// load Incident Action Creator
export const loadIncidentSuccess = incident => {
  return { type: FETCH_INCIDENT, incident, isLoading: false };
};

/**
 * loadIncident Thunk
 */
export const loadIncidentDetails = incidentId => {
  return dispatch => {
    dispatch(loadingAction(true));
    return axios
      .all([loadIncident(incidentId), loadNotes(incidentId), loadChats(incidentId)])
      .then(arr => {
        let incident = arr[0].data.data;
        incident['notes'] = arr[1].data.data.notes;
        incident['chats'] = arr[2].data.data.chats;
        dispatch(loadIncidentSuccess(incident));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
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
export const addNote = (noteText, incidentId, userId) => {
  let notesUrl = `${config.INCIDENTS_URL}/${incidentId}/notes`;
  return dispatch => {
    return axios
      .post(notesUrl, {
        note: noteText,
        userId: userId
      })
      .then(res => {
        dispatch(addNoteSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Edit notes Action Creator
export const editNoteSuccess = (note, index) => {
  return { type: EDIT_NOTE, note, index };
};

/**
 * Edit a note on an incident
 * @param {*} noteText
 * @param {*} noteId
 */
export const editNote = (noteText, noteId, index) => {
  let noteUrl = `${config.NOTES_URL}/${noteId}`;
  return dispatch => {
    return axios
      .put(noteUrl, {
        note: noteText
      })
      .then(res => {
        dispatch(editNoteSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Archive note action creator
export const archiveNoteSuccess = (note, index) => {
  return { type: ARCHIVE_NOTE, note, index };
};

export const archiveNote = (noteId, index) => {
  return dispatch => {
    return axios
      .delete(`${config.NOTES_URL}/${noteId}`)
      .then(res => {
        dispatch(archiveNoteSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Change incident status action creator
export const changeStatusSuccess = incident => {
  return { type: CHANGE_STATUS, incident };
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
        return dispatch(errorAction(error));
      });
  };
};

// Change incident assignee action creator
export const changeAssigneeSuccess = incident => {
  return { type: CHANGE_ASSIGNEE, incident };
};

/**
 * Change assignee thunk
 * @param {*} assigneeId
 * @param {*} incidentId
 */
export const changeAssignee = payload => {
  return dispatch => {
    return axios
      .put(`${config.INCIDENTS_URL}/${payload.incidentId}/`, {
        assignee: payload
      })
      .then(res => {
        dispatch(changeAssigneeSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Handle CC'd action creator
export const changeCCdSuccess = incident => {
  return { type: CHANGE_ASSIGNEE, incident };
};

/**
 * Handle CCd thunk
 * @param {*} assigneeId
 * @param {*} incidentId
 * @param {*} status
 */
export const handleCC = payload => {
  return dispatch => {
    return axios
      .put(`${config.INCIDENTS_URL}/${payload.incidentId}/`, {
        ccd: payload.ccdUsers
      })
      .then(res => {
        dispatch(changeCCdSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

// Send chat message action creator
export const sendMessageSuccess = chat => {
  return { type: ADD_CHAT, chat };
};

/**
 * Send chat message thunk
 * @param {*} incidentId
 * @param {*} userId
 * @param {*} message
 */
export const sendMessage = (incidentId, userId, message) => {
  return dispatch => {
    return axios
      .post(`${config.INCIDENTS_URL}/${incidentId}/chats`, {
        chat: message,
        userId: userId
      })
      .then(res => {
        dispatch(sendMessageSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
