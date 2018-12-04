import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as ActionTypes from './actionTypes';
import * as ActionCreators from './locationsAction';
import { locations } from '../../mock_endpoints/mockData';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('gets all locations', done => {
    const store = mockStore();
    const expectedActions = [{ type: ActionTypes.FETCH_LOCATIONS }];

    store.dispatch(ActionCreators.fetchLocations());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: {
              locations: [
                locations
              ]
            }
          }
        })
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions[0].type).toEqual(expectedActions[0].type);
          done();
        });
    });
  });
  it('creates ERROR_ACTION when there is an error fetching locations', done => {
    const store = mockStore();
    const expectedActions = [{ type: ActionTypes.ERROR_ACTION }];

    store.dispatch(ActionCreators.fetchLocations());

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
        expect(storeActions[0].type).toEqual(expectedActions[0].type);
        done();
      });
    });
  });
});
