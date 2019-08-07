import * as ActionTypes from '../actions/actionTypes';
import reducer from './selectedIncidentReducer';
import initialState from './initialState';
import { allChats, notes, testIncidents } from '../../mock_endpoints/mockData';


describe('Reducers :: Selected Incident Reducer', () => {
  const getInitialState = initialState.selectedIncident;
  const newInitialState = {
    chats: allChats,
    notes,
  };
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_ROLES', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, selectedIncident: {} };
    const expected = Object.assign({}, getInitialState, action.selectedIncident);
    expect(reducer(getInitialState, action.selectedIncident)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENT', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, incident: testIncidents[0] };
    const expectedState = reducer(initialState, action);

    expect(expectedState).toEqual(action.incident);
  });

  it('should handle ADD_NOTE', () => {
    const newNote = {
      id: 5,
      createdAt: '2018-12-20T15:58:06.202Z',
      updatedAt: '2018-12-20T15:58:06.202Z',
      note: 'At 5:22 p.m. on Jan 17, 2018, I was dispatched to Block A of AKL ... At 5:22 p.m. on Jan 17, 2018,',
      userId: 1,
      incidentId: 1,
    };
    const action = { type: ActionTypes.ADD_NOTE, note: newNote };
    const expectedState = reducer(newInitialState, action);

    expect(expectedState.notes.length).toBe(5);
  });

  it('should handle CHANGE_ASSIGNEE', () => {
    const action = { type: ActionTypes.CHANGE_ASSIGNEE, incident: testIncidents[0] };
    const expectedState = reducer(newInitialState, action);

    expect(expectedState.id).toEqual('cjezu2kr700010wx1yy6kxu5z');
  });

  it('should handle ARCHIVE_NOTE', () => {
    const action = { type: ActionTypes.ARCHIVE_NOTE, index: 0 };
    const expectedState = reducer(newInitialState, action);
    
    expect(expectedState.notes.length).toBe(notes.length - 1);
  });

  it('should handle ADD_CHAT', () => {
    const newChat = {
      id: 4,
      chat: 'new chat by cosmas',
      userId: 1,
      incidentId: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-02-13T15:58:06.202Z',
    };
    const action = { type: ActionTypes.ADD_CHAT, chat: newChat };
    const expectedState = reducer(newInitialState, action);
    
    expect(expectedState.chats.length).toBe(allChats.length + 1);
  });

  it('should handle EDIT_NOTE', () => {
    const editedNote = {
      id: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-12-20T15:58:06.202Z',
      note: 'At 5:22 p.m. on Jan 17, 2018, I was dispatched to Block A of AKL ... At 5:22 p.m. on Jan 17, 2018,',
      userId: 1,
      incidentId: 1,
    };
    const action = { type: ActionTypes.EDIT_NOTE, note: editedNote, index: 0 };
    const expectedState = reducer(newInitialState, action);
    
    expect(expectedState.notes[0].updatedAt).toEqual('2018-12-20T15:58:06.202Z');
  });

  it('should handle CHANGE_STATUS', () => {
    const action = { type: ActionTypes.CHANGE_STATUS, incident: testIncidents[0] };
    const expectedState = reducer(newInitialState, action);
    
    expect(expectedState.id).toEqual('cjezu2kr700010wx1yy6kxu5z');
  });
});
