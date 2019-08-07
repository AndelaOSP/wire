import moxios from 'moxios';
import * as ActionTypes from './actionTypes';
import * as ActionCreators from './locationsAction';
import { locations } from '../../mock_endpoints/mockData';
import {
  httpResponse,
  mockStore,
  mockAxios,
  expectedActionFailure,
  mockDispatchAction
} from '../testHelpers';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('gets all locations', () => {
    const mockResponse = httpResponse(200, { data: { locations: locations }});
    const store = mockStore();
    const expectedActions = [
      {
        type: ActionTypes.FETCH_LOCATIONS,
        locations,
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, ActionCreators.fetchLocations(), expectedActions);
  });

  it('creates ERROR_ACTION when there is an error fetching locations', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, ActionCreators.fetchLocations(), [expectedActions[1]]);
  });
});
