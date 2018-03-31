import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions/incidentAction';
import * as types from '../src/actions/actionTypes';
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

  it('displays the appropriate error message when there is an error fetching incidents', done => {
    const store = mockStore();
    const expectedActions = [
      {
        type: types.ERROR_ACTION,
        status: true,
        message: 'The requested resource cannot be found'
      }
    ];

    store.dispatch(actions.loadIncidents());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      const errorResponse = {
        status: 404,
        response: {
          status: 404,
          data: {
            error: 'Resource Not Found'
          }
        }
      };
      request.respondWith(errorResponse).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[1].type).toEqual(expectedActions[0].type);
        expect(storeActions[1].message).toEqual(expectedActions[0].message);
        done();
      });
    });
  });

  it('displays the appropriate error message when there is an auth error', done => {
    const store = mockStore();
    const expectedActions = [
      {
        type: types.ERROR_ACTION,
        status: true,
        message: 'You might not be logged in/authorized. Please try again.'
      }
    ];

    store.dispatch(actions.loadIncidents());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      const errorResponse = {
        status: 401,
        response: {
          status: 401,
          data: {
            error: 'Not authorized'
          }
        }
      };
      request.respondWith(errorResponse).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[1].type).toEqual(expectedActions[0].type);
        expect(storeActions[1].message).toEqual(expectedActions[0].message);
        done();
      });
    });
  });

  it('displays the appropriate error message for all other errors', done => {
    const store = mockStore();
    const expectedActions = [
      {
        type: types.ERROR_ACTION,
        status: true,
        message: 'Oops! Something went wrong. Please try again.'
      }
    ];

    store.dispatch(actions.loadIncidents());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      const errorResponse = {
        status: 500,
        response: {
          status: 500,
          data: {
            error: 'Internal Server Error'
          }
        }
      };
      request.respondWith(errorResponse).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[1].type).toEqual(expectedActions[0].type);
        expect(storeActions[1].message).toEqual(expectedActions[0].message);
        done();
      });
    });
  });
});
