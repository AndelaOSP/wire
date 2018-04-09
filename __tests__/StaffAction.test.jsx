import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions/staffAction';
import * as types from '../src/actions/actionTypes';
import { users } from '../mock_endpoints/mockData';
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
});
