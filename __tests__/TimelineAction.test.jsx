import * as actions from '../src/actions/timelineAction';
import * as types from '../src/actions/actionTypes';
import { testIncident } from '../mock_endpoints/mockData';

describe('Actions', () => {
  it('should create action to load incident details', () => {
    const expectedAction = {
      type: types.FETCH_INCIDENT,
      incident: testIncident,
      isLoading: false
    };
    expect(actions.loadIncidentSuccess(testIncident)).toEqual(expectedAction);
  });
  it('should create an action to add notes', () => {
    const note = 'This is a note';
    const expectedAction = {
      type: types.ADD_NOTE,
      note
    };
    expect(actions.addNoteSuccess(note)).toEqual(expectedAction);
  });
  it('should create an action to edit a note', () => {
    const note = 'This is an edited note';
    const expectedAction = {
      type: types.EDIT_NOTE,
      note,
      index: 1
    };
    expect(actions.editNoteSuccess(note, 1)).toEqual(expectedAction);
  });
  it('should create an action to archive a note', () => {
    const note = 'Note to be archived';
    const expectedAction = {
      type: types.ARCHIVE_NOTE,
      note,
      index: 1
    };
    expect(actions.archiveNoteSuccess(note, 1)).toEqual(expectedAction);
  });
  it('should create an action to change the status of an incident', () => {
    const expectedAction = {
      type: types.CHANGE_STATUS,
      incident: testIncident
    };
    expect(actions.changeStatusSuccess(testIncident)).toEqual(expectedAction);
  });
  it('should create an action to change the assignee of an incident', () => {
    const expectedAction = {
      type: types.CHANGE_ASSIGNEE,
      incident: testIncident
    };
    expect(actions.changeAssigneeSuccess(testIncident)).toEqual(expectedAction);
  });
  it('should create an action to send a message', () => {
    const chat = 'This is a message';
    const expectedAction = {
      type: types.ADD_CHAT,
      chat
    };
    expect(actions.sendMessageSuccess(chat)).toEqual(expectedAction);
  });
});
