import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions/timelineAction';
import * as types from '../src/actions/actionTypes';
import { testIncident, notes, chats } from '../mock_endpoints/mockData';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  let updatedNote = notes[0];
  updatedNote['note'] = 'A new note';

  let incidentWithNewStatus = testIncident;
  incidentWithNewStatus['statusId'] = 2;

  let incidentWithNewAssignee = testIncident;
  incidentWithNewAssignee['assigneeId'] = 1;

  const expectedActions = [
    {
      type: types.IS_LOADING,
      status: true
    },
    {
      type: types.FETCH_INCIDENT,
      incident: testIncident,
      isLoading: false
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
    { type: types.ERROR_ACTION,
      status: true,
      message: 'You might not be logged in/authorized. Please try again.'
    }
  ];

  it('creates all appropriate actions when loading incident details', done => {
    const store = mockStore();
    store.dispatch(actions.loadIncidentDetails(testIncident.id));
    moxios.wait(() => {
      let incidentRequest = moxios.requests.at(0);
      let notesRequest = moxios.requests.at(1);
      let chatsRequest = moxios.requests.at(2);
      incidentRequest
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: testIncident
          }
        });
      notesRequest
        .respondWith({
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

  it('creates all appropriate actions when adding a note', done => {
    let noteText = notes[0].note;
    let incidentId = notes[0].incidentId;
    let userId = notes[0].userId;

    const store = mockStore();
    store.dispatch(actions.addNote(noteText, incidentId, userId));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: notes[0]
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[2]);
          done();
        });
    });
  });

  it('creates all appropriate actions when editing a note', done => {
    let noteText = 'A new note';
    let noteId = notes[0].id;
    let index = 0;

    let updatedNote = notes[0];
    updatedNote['note'] = noteText;

    const store = mockStore();
    store.dispatch(actions.editNote(noteText, noteId, index));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: updatedNote
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[3]);
          done();
        });
    });
  });

  it('creates all appropriate actions when archiving a note', done => {
    let noteId = notes[0].id;
    let index = 0;

    const store = mockStore();
    store.dispatch(actions.archiveNote(noteId, index));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: notes[0]
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[4]);
          done();
        });
    });
  });

  it('creates all appropriate actions when changing incident status', done => {
    let incidentId = testIncident.id;
    let statusId = 2;
    let incidentWithNewStatus = testIncident;
    incidentWithNewStatus['statusId'] = 2;

    const store = mockStore();
    store.dispatch(actions.changeStatus(statusId, incidentId));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: incidentWithNewStatus
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[5]);
          done();
        });
    });
  });

  it('creates all appropriate actions when changing incident assignee', done => {
    let incidentId = testIncident.id;
    let assigneeId = 1;
    let incidentWithNewAssignee = testIncident;
    incidentWithNewAssignee['assigneeId'] = assigneeId;

    const store = mockStore();
    store.dispatch(actions.changeAssignee(assigneeId, incidentId));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: incidentWithNewAssignee
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[6]);
          done();
        });
    });
  });

  it('creates all appropriate actions when sending messages', done => {
    let incidentId = testIncident.id;
    let userId = 3;
    let message = chats[2].chat;

    const store = mockStore();
    store.dispatch(actions.sendMessage(incidentId, userId, message));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: chats[2]
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[7]);
          done();
        });
    });
  });

  it('dispatches error action when there is an error with a request', done => {
    let incidentId = testIncident.id;
    let userId = 3;
    let message = chats[2].chat;

    const store = mockStore();
    store.dispatch(actions.sendMessage(incidentId, userId, message));
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 401,
          response: {
            status: 401,
            data: {
              error: 'Not authorized'
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[8]);
          done();
        });
    });
  });
});
