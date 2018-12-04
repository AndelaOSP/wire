import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './staffAction';
import * as types from './actionTypes';
import { users } from '../../mock_endpoints/mockData';
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

  const expectedActions = [
    {
      type: types.IS_LOADING,
      status: true
    },
    {
      type: types.FETCH_STAFF,
      staff: users,
      isLoading: false,
      isError: false
    },
    { type: types.ERROR_ACTION,
      status: true,
      message: 'You might not be logged in/authorized. Please try again.'
    }
  ];

  it('creates all appropriate actions when fetching staff', done => {
    const store = mockStore();
    store.dispatch(actions.fetchStaff());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: {
              users
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

  it('dispatches error action when fetching staff fails', done => {
    const store = mockStore();
    store.dispatch(actions.fetchStaff());
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
          expect(storeActions[0]).toEqual(expectedActions[0]);
          done();
        });
    });
  });
  it('searches for all users', done => {
    const store = mockStore();
    store.dispatch(actions.searchUsers());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: {
              users:[users]
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });

  it('dispatches error action when searching users fails', done => {
    const store = mockStore();
    store.dispatch(actions.searchUsers());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 401,
          response: {
            status: 401,
            data: {
              message: 'You might not be logged in/authorized. Please try again'
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });
  it('Invites new users', done => {
    const store = mockStore();
    store.dispatch(actions.inviteUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: {
              users: [
                users
              ]
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });

  it('dispatches error action when inviting user fails', done => {
    const store = mockStore();
    store.dispatch(actions.inviteUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 401,
          response: {
            status: 401,
            data: {
              message: 'You might not be logged in/authorized. Please try again'
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });
  it('Updates a User', done => {
    const store = mockStore();
    store.dispatch(actions.updateUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: {
               'userId': 1,
                'roleId': 3
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });

  it('dispatches error action when updating a user fails', done => {
    const store = mockStore();
    store.dispatch(actions.updateUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 401,
          response: {
            status: 401,
            data: {
              message: 'You might not be logged in/authorized. Please try again'
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });
  it('Removes a User', done => {
    const store = mockStore();
    store.dispatch(actions.removeUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: {
            status: 'success',
            data: {
              'userId': 1,
              'roleId': 3
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[3]).toEqual(expectedActions[3]);
          done();
        });
    });
  });

  it('dispatches error action when deleting a user fails', done => {
    const store = mockStore();
    store.dispatch(actions.removeUser());
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 401,
          response: {
            status: 401,
            data: {
              message: 'You might not be logged in/authorized. Please try again'
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0]).toEqual(expectedActions[0]);
          done();
        });
    });
  });
});
