import moxios from 'moxios';
import * as ActionTypes from './actionTypes';
import * as ActionCreators from './rolesAction';
import { roles } from '../../mock_endpoints/mockData';
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

  it('gets all roles', () => {
    const mockResponse = httpResponse(200, { data: { roles: roles }});
    const store = mockStore();
    const expectedActions = [
      {
        type: ActionTypes.FETCH_ROLES,
        roles,
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, ActionCreators.fetchRoles(), expectedActions);
  });
  
  it('creates ERROR_ACTION when there is an error fetching locations', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store,  ActionCreators.fetchRoles(), [expectedActions[1]]);
  });
});
