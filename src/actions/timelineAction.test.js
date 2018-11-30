import moxios from 'moxios';
import * as actions from './timelineAction';
import * as types from './actionTypes';
import { testIncidents, notes, chats } from '../../mock_endpoints/mockData';
import {
  httpResponse,
  mockStore,
  mockAxios,
  mockDispatchAction
} from '../testHelpers';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  let updatedNote = notes[0];
  updatedNote['note'] = 'A new note';

  let incidentWithNewStatus = testIncidents[0];
  incidentWithNewStatus['statusId'] = 2;

  let incidentWithNewAssignee = testIncidents[0];
  incidentWithNewAssignee['assigneeId'] = 1;

  const expectedActions = [
    {
      type: types.IS_LOADING,
      status: true
    },
    {
      type: types.FETCH_INCIDENT,
      incident: testIncidents[0],
      isLoading: false,
      isError: false
    },
    {
      type: types.ADD_NOTE,
      note: notes[0]
    },
    {
      type: types.EDIT_NOTE,
      note: updatedNote,
      index: 0
    },
    {
      type: types.ARCHIVE_NOTE,
      note: notes[0],
      index: 0
    },
    {
      type: types.CHANGE_STATUS,
      incident: incidentWithNewStatus
    },
    {
      type: types.CHANGE_ASSIGNEE,
      incident: incidentWithNewAssignee
    },
    {
      type: types.ADD_CHAT,
      chat: chats[2]
    },
    {
      type: types.ERROR_ACTION,
      status: true,
      message: 'You might not be logged in/authorized. Please try again.',
      statusCode: 401,
    }
  ];

  it('creates all appropriate actions when loading incident details', done => {
    const store = mockStore();
    store.dispatch(actions.loadIncidentDetails(testIncidents[0].id));
    moxios.wait(() => {
      let incidentRequest = moxios.requests.at(0);
      let notesRequest = moxios.requests.at(1);
      let chatsRequest = moxios.requests.at(2);
      incidentRequest.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: testIncidents[0]
        }
      });
      notesRequest.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            notes
          }
        }
      });
      chatsRequest
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: {
              chats
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[0]);
          expect(storeActions[1]).toEqual(expectedActions[1]);
          done();
        });
    });
  });

  it('creates all appropriate actions when adding a note', () => {
    let noteText = notes[0].note;
    let incidentId = notes[0].incidentId;
    let userId = notes[0].userId;

    const mockResponse = httpResponse(201, { data: notes[0] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.addNote(noteText, incidentId, userId), [expectedActions[2]]);
  });

  it('creates all appropriate actions when editing a note', () => {
    let noteText = 'A new note';
    let noteId = notes[0].id;
    let index = 0;

    let updatedNote = notes[0];
    updatedNote['note'] = noteText;

    const mockResponse = httpResponse(200, { data: updatedNote });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.editNote(noteText, noteId, index), [expectedActions[3]]);
  });

  it('creates all appropriate actions when archiving a note', () => {
    let noteId = notes[0].id;
    let index = 0;

    const mockResponse = httpResponse(200, { data: notes[0] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.archiveNote(noteId, index), [expectedActions[4]]);
  });

  it('creates all appropriate actions when changing incident status', () => {
    let incidentId = testIncidents[0].id;
    let statusId = 2;
    let incidentWithNewStatus = testIncidents[0];
    incidentWithNewStatus['statusId'] = 2;

    const mockResponse = httpResponse(200, { data: incidentWithNewStatus });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.changeStatus(statusId, incidentId), [expectedActions[5]]);
  });

  it('creates all appropriate actions when changing incident assignee', () => {
    let incidentId = testIncidents[0].id;
    let assigneeId = 1;
    let incidentWithNewAssignee = testIncidents[0];
    incidentWithNewAssignee['assigneeId'] = assigneeId;

    const mockResponse = httpResponse(200, { data: incidentWithNewAssignee });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.changeAssignee(assigneeId, incidentId), [expectedActions[6]]);
  });

  it('creates all appropriate actions when sending messages', () => {
    let incidentId = testIncidents[0].id;
    let userId = 3;
    let message = chats[2].chat;

    const mockResponse = httpResponse(200, { data: chats[2] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.sendMessage(incidentId, userId, message), [expectedActions[7]]);
  });

  it('dispatches error action when there is an error with a request', () => {
    let incidentId = testIncidents[0].id;
    let userId = 3;
    let message = chats[2].chat;

    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.sendMessage(incidentId, userId, message), [expectedActions[8]]);
  });
});
