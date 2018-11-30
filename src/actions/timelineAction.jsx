// third-party libraries
import * as axios from 'axios';

// helpers
import config from '../config/index';

// thunk actions
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';

// action types
import {
  FETCH_INCIDENT,
  ADD_NOTE,
  EDIT_NOTE,
  CHANGE_STATUS,
  ADD_CHAT,
  CHANGE_ASSIGNEE,
  ARCHIVE_NOTE
} from './actionTypes';

/**
 * load all incident details
 * 
 * @param {string} incidentId
 * 
 * @returns {Promise}
 */
const loadIncident = incidentId => {
  let headers = { Authorization: localStorage.token };
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}`, { headers });
};

/**
 * load an incident notes
 * 
 * @param {string} incidentId
 * 
 * @returns {Promise}
 */
const loadNotes = incidentId => {
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}/notes`);
};

/**
 * load an incident chats
 * 
 * @param {string} incidentId
 * 
 * @returns {Promise}
 */
const loadChats = incidentId => {
  return axios.get(`${config.INCIDENTS_URL}/${incidentId}/chats`);
};

/**
 * load Incident Action Creator
 * 
 * @param {Object} incident
 * 
 * @returns {Object}
 */
export const loadIncidentSuccess = incident => {
  return { type: FETCH_INCIDENT, incident, isLoading: false, isError: false };
};

/**
 * load incident Thunk
 * 
 * @param {string} incidentId
 * 
 * @returns {Function}
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

/**
 * Add notes Action Creator
 * 
 * @param {Object} note
 * 
 * @returns {Object}
 */
export const addNoteSuccess = note => {
  return { type: ADD_NOTE, note };
};

/**
 * Add notes to an incident
 * 
 * @param {string} notesText
 * @param {string} incidentId
 * 
 * @returns {Function}
 */
export const addNote = (noteText, incidentId) => {
  let notesUrl = `${config.INCIDENTS_URL}/${incidentId}/notes`;
  return dispatch => {
    return axios
      .post(notesUrl, {
        note: noteText,
        userEmail: localStorage.getItem('email')
      })
      .then(res => {
        dispatch(addNoteSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * Edit notes Action Creator
 * 
 * @param {Object} note
 * @param {number} index
 * 
 * @returns {Object}
 */
export const editNoteSuccess = (note, index) => {
  return { type: EDIT_NOTE, note, index };
};

/**
 * Edit a note on an incident
 * 
 * @param {string} noteText
 * @param {string} noteId
 * @param {number}
 * 
 * @returns {Function}
 */
export const editNote = (noteText, noteId, index) => {
  let noteUrl = `${config.NOTES_URL}/${noteId}`;
  return dispatch => {
    return axios
      .put(noteUrl, {
        note: noteText,
        userEmail: localStorage.getItem('email')
      })
      .then(res => {
        dispatch(editNoteSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * Archive note action creator
 * 
 * @param {Object} note 
 * @param {number} index 
 * 
 * @returns {Object}
 */
export const archiveNoteSuccess = (note, index) => {
  return { type: ARCHIVE_NOTE, note, index };
};

/**
 * archive note thunk
 * 
 * @param {string} noteId 
 * @param {number} index 
 * 
 * @returns {Function}
 */
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

/**
 * Change incident status action creator
 * 
 * @param {Object} incident 
 * 
 * @returns {Object}
 */
export const changeStatusSuccess = incident => {
  return { type: CHANGE_STATUS, incident };
};

/**
 * Change the status of an incident whether open, closed or in progress
 * 
 * @param {string} statusId
 * @param {string} incidentId
 * 
 * @returns {Function}
 */
export const changeStatus = (statusId, incidentId) => {
  let headers = { Authorization: localStorage.token };
  return dispatch => {
    return axios
      .put(
        `${config.INCIDENTS_URL}/${incidentId}/`,
        {
          statusId
        },
        { headers }
      )
      .then(res => {
        dispatch(changeStatusSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * Change incident assignee action creator
 * 
 * @param {Object} incident 
 * 
 * @returns {Object}
 */
export const changeAssigneeSuccess = incident => {
  return { type: CHANGE_ASSIGNEE, incident };
};

/**
 * Change assignee thunk
 * 
 * @param {Object} payload
 * 
 * @returns {Function}
 */
export const changeAssignee = payload => {
  let headers = { Authorization: localStorage.token };
  return dispatch => {
    return axios
      .put(
        `${config.INCIDENTS_URL}/${payload.incidentId}/`,
        {
          assignee: payload
        },
        { headers }
      )
      .then(res => {
        dispatch(changeAssigneeSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * Handle CC'd action creator
 * 
 * @param {Object} incident 
 * 
 * @returns {Object}
 */
export const changeCCdSuccess = incident => {
  return { type: CHANGE_ASSIGNEE, incident };
};

/**
 * Handle CCd thunk
 * 
 * @param {Object} payload
 * 
 * @returns {Function}
 */
export const handleCC = payload => {
  let headers = { Authorization: localStorage.token };
  return dispatch => {
    return axios
      .put(
        `${config.INCIDENTS_URL}/${payload.incidentId}/`,
        {
          ccd: payload.ccdUsers
        },
        { headers }
      )
      .then(res => {
        dispatch(changeCCdSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

/**
 * Send chat message action creator
 * 
 * @param {Object} chat 
 * 
 * @returns {Object}
 */
export const sendMessageSuccess = chat => {
  return { type: ADD_CHAT, chat };
};

/**
 * Send chat message thunk
 * 
 * @param {string} incidentId
 * @param {string} message
 * 
 * @returns {Function}
 */
export const sendMessage = (incidentId, message) => {
  return dispatch => {
    return axios
      .post(`${config.INCIDENTS_URL}/${incidentId}/chats`, {
        chat: message,
        userEmail: localStorage.getItem('email')
      })
      .then(res => {
        dispatch(sendMessageSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
