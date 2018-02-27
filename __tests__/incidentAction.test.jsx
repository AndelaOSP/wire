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

  it('creates FETCH_INCIDENTS_SUCCESS when fetching incidents has been done', (done) => {
    const store = mockStore();
    const expectedActions = [
      { type: types.FETCH_INCIDENTS_SUCCESS }
    ];

    store.dispatch(actions.loadIncidents());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            incidents: [
              {
                'id': '12345667',
                'subject': 'Stolen Phone',
                'dateOccurred': '2017-02-11T00:00:00.000Z',
                'createdAt': '2018-02-14T12:26:03.792Z',
                'User': {'name':'Maureen Nyakio'},
                'Level': {'name':'red'},
              }
            ]
          }
        }
      }).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].type).toEqual(expectedActions[0].type);
        done();
      });
    });
  });

  it('creates INCIDENT_ERROR when there is an error fetching incidents', (done) => {
    const store = mockStore();
    const expectedActions = [
      { type: types.INCIDENTS_ERROR }
    ];

    store.dispatch(actions.loadIncidents());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        error: {
          message: 'Resource not found'
        }
      }).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].type).toEqual(expectedActions[0].type);
        done();
      });
    });

  });
});
