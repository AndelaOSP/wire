import * as axios from 'axios';
import config from '../config/index';
import { http } from './http';
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

const loadIncident = incidentId => http().get(`/incidents/${incidentId}`);

const loadNotes = incidentId => http().get(`/incidents/${incidentId}/notes`);

const loadChats = incidentId => http().get(`/incidents/${incidentId}/chats`);

export const loadIncidentSuccess = incident => ({
  type: FETCH_INCIDENT, incident, isLoading: false, isError: false,
});

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

export const addNoteSuccess = note => ({
  type: ADD_NOTE, note,
});

export const addNote = (noteText, incidentId) => dispatch => http()
  .post(`/incidents/${incidentId}/notes`, {
    note: noteText,
    userEmail: localStorage.getItem('email'),
  })
  .then((res) => {
    dispatch(addNoteSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));

export const editNoteSuccess = (note, index) => ({
  type: EDIT_NOTE, note, index,
});

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

export const archiveNoteSuccess = (note, index) => ({
  type: ARCHIVE_NOTE, note, index,
});

export const archiveNote = (noteId, index) => dispatch => http()
  .delete(`/notes/${noteId}`)
  .then((res) => {
    dispatch(archiveNoteSuccess(res.data.data, index));
  })
  .catch(error => dispatch(errorAction(error)));

export const changeStatusSuccess = incident => ({
  type: CHANGE_STATUS, incident,
});

export const changeStatus = (statusId, incidentId) => dispatch => http()
  .put(
    `/incidents/${incidentId}/`,
    {
      statusId,
    },
  )
  .then((res) => {
    dispatch(changeStatusSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));

export const changeAssigneeSuccess = incident => ({
  type: CHANGE_ASSIGNEE, incident,
});

export const changeAssignee = payload => dispatch => http()
  .put(
    `/incidents/${payload.incidentId}/`,
    {
      assignee: payload,
    },
  )
  .then((res) => {
    dispatch(changeAssigneeSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));

export const changeCCdSuccess = incident => ({
  type: CHANGE_ASSIGNEE, incident,
});

export const handleCC = payload => dispatch => http()
  .put(
    `/incidents/${payload.incidentId}/`,
    {
      ccd: payload.ccdUsers,
    },
  )
  .then((res) => {
    dispatch(changeCCdSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));

export const sendMessageSuccess = chat => ({
  type: ADD_CHAT, chat,
});

export const sendMessage = (incidentId, message) => dispatch => http()
  .post(`/incidents/${incidentId}/chats`, {
    chat: message,
    userEmail: localStorage.getItem('email'),
  })
  .then((res) => {
    dispatch(sendMessageSuccess(res.data.data));
  })
  .catch(error => dispatch(errorAction(error)));
