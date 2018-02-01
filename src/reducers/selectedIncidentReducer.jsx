import initialState from './initialState';
import {
  FETCH_INCIDENT,
  ADD_NOTE,
  ADD_CHAT,
  EDIT_NOTE,
  ARCHIVE_NOTE,
  CHANGE_STATUS,
  CHANGE_ASSIGNEE
} from '../actions/actionTypes';

const selectedIncidentReducer = (state = initialState.selectedIncident, action) => {
  switch (action.type) {
    case FETCH_INCIDENT:
      return action.incident;
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.note] };
    case EDIT_NOTE:
      return {
        ...state,
        notes: [...state.notes.slice(0, action.index), action.note, ...state.notes.slice(action.index + 1)]
      };
    case CHANGE_STATUS:
      return { ...action.incident, notes: [...state.notes], chats: [...state.chats] };
    case CHANGE_ASSIGNEE:
      return { ...action.incident, notes: [...state.notes], chats: [...state.chats] };
    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: [...state.notes.slice(0, action.index), ...state.notes.slice(action.index + 1)]
      };
    case ADD_CHAT:
      return { ...state, chats: [...state.chats, action.chat] };

    default:
      return state;
  }
};

export default selectedIncidentReducer;
