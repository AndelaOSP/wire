import moxios from 'moxios';
import * as actions from './timelineAction';
import * as types from './actionTypes';
import { testIncidents, notes, chats } from '../../mock_endpoints/mockData';
import {
  httpResponse,
  mockStore,
  mockAxios,
  mockDispatchAction,
} from '../testHelpers';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const updatedNote = notes[0];
  updatedNote.note = 'A new note';

  const incidentWithNewStatus = testIncidents[0];
  incidentWithNewStatus.statusId = 2;

  const incidentWithNewAssignee = testIncidents[0];
  incidentWithNewAssignee.assigneeId = 1;

  const expectedActions = [
    {
      type: types.IS_LOADING,
      status: true,
    },
    {
      type: types.FETCH_INCIDENT,
      incident: testIncidents[0],
      isLoading: false,
      isError: false,
    },
    {
      type: types.ADD_NOTE,
      note: notes[0],
    },
    {
      type: types.EDIT_NOTE,
      note: updatedNote,
      index: 0,
    },
    {
      type: types.ARCHIVE_NOTE,
      note: notes[0],
      index: 0,
    },
    {
      type: types.CHANGE_STATUS,
      incident: incidentWithNewStatus,
    },
    {
      type: types.CHANGE_ASSIGNEE,
      incident: incidentWithNewAssignee,
    },
    {
      type: types.ADD_CHAT,
      chat: chats[2],
    },
    {
      type: types.ERROR_ACTION,
      payload: {
        status: true,
        message: 'You might not be logged in/authorized. Please try again.',
        statusCode: 401,
      },
    },
  ];

  it('creates all appropriate actions when loading incident details', (done) => {
    const store = mockStore();
    store.dispatch(actions.loadIncidentDetails(testIncidents[0].id));
    moxios.wait(() => {
      const incidentRequest = moxios.requests.at(0);
      const notesRequest = moxios.requests.at(1);
      const chatsRequest = moxios.requests.at(2);
      incidentRequest.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: testIncidents[0],
        },
      });
      notesRequest.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            notes,
          },
        },
      });
      chatsRequest
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: {
              chats,
            },
          },
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
    const noteText = notes[0].note;
    const incidentId = notes[0].incidentId;
    const userId = notes[0].userId;

    const mockResponse = httpResponse(201, { data: notes[0] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.addNote(noteText, incidentId, userId),
      [expectedActions[2]]);
  });

  it('creates all appropriate actions when editing a note', () => {
    const noteText = 'A new note';
    const noteId = notes[0].id;
    const index = 0;

    const updatedNote = notes[0];
    updatedNote.note = noteText;

    const mockResponse = httpResponse(200, { data: updatedNote });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.editNote(noteText, noteId, index),
      [expectedActions[3]]);
  });

  it('dispatches error with edit note payload', () => {
    const noteText = 'A new note for a ghost note';
    const noteId = 1000000;
    const index = 1000;

    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.editNote(noteText, noteId, index),
      [expectedActions[8]]);
  });

  it('creates all appropriate actions when archiving a note', () => {
    const noteId = notes[0].id;
    const index = 0;

    const mockResponse = httpResponse(200, { data: notes[0] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.archiveNote(noteId, index), [expectedActions[4]]);
  });

  it('creates all appropriate actions when changing incident status', () => {
    const incidentId = testIncidents[0].id;
    const statusId = 2;
    const incidentWithNewStatus = testIncidents[0];
    incidentWithNewStatus.statusId = 2;

    const mockResponse = httpResponse(200, { data: incidentWithNewStatus });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.changeStatus(statusId, incidentId),
      [expectedActions[5]]);
  });

  it('creates all appropriate actions when changing incident assignee', () => {
    const incidentId = testIncidents[0].id;
    const assigneeId = 1;
    const incidentWithNewAssignee = testIncidents[0];
    incidentWithNewAssignee.assigneeId = assigneeId;

    const mockResponse = httpResponse(200, { data: incidentWithNewAssignee });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.changeAssignee(assigneeId, incidentId),
      [expectedActions[6]]);
  });

  it('creates all appropriate actions when sending messages', () => {
    const incidentId = testIncidents[0].id;
    const userId = 3;
    const message = chats[2].chat;

    const mockResponse = httpResponse(200, { data: chats[2] });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.sendMessage(incidentId, userId, message),
      [expectedActions[7]]);
  });

  it('dispatches error action when there is an error with a request', () => {
    const incidentId = testIncidents[0].id;
    const userId = 3;
    const message = chats[2].chat;

    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.sendMessage(incidentId, userId, message),
      [expectedActions[8]]);
  });
});
