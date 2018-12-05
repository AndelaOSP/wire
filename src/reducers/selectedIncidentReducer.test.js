import * as ActionTypes from '../actions/actionTypes';
import reducer from './selectedIncidentReducer';
import initialState from './initialState';


describe('Reducers :: Selected Incident Reducer', () => {
  const getInitialState = initialState.selectedIncident;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_ROLES', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, selectedIncident: {} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });

  it('should handle ADD_NOTE', () => {
    const action = { type: ActionTypes.ADD_NOTE, selectedIncident: {notes: []} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident.notes);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });

  it('should handle ADD_CHAT', () => {
    const action = { type: ActionTypes.ADD_CHAT, selectedIncident: {chat: []} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident.chat);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });

  it('should handle EDIT_NOTE', () => {
    const action = { type: ActionTypes.EDIT_NOTE, selectedIncident: {notes: []} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident.notes);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });

  it('should handle CHANGE_STATUS', () => {
    const action = { type: ActionTypes.CHANGE_STATUS, selectedIncident: {} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });
});

