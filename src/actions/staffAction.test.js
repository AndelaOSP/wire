import moxios from 'moxios';
import * as actions from './staffAction';
import * as types from './actionTypes';
import { users } from '../../mock_endpoints/mockData';
import {
  isLoading,
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

  it('creates all appropriate actions when fetching staff', () => {
    const mockResponse = httpResponse(201, { data: { users } });
    const expectedActions = [
      isLoading,
      {
        type: types.FETCH_STAFF,
        staff: users,
        isLoading: false,
        isError: false
      },
    ];
    const store = mockStore();
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.fetchStaff(), expectedActions);
  });

  it('dispatches error action when fetching staff fails', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.fetchStaff(), expectedActions);
  });

  it('searches for all users', () => {
    const mockResponse = httpResponse(200, { data: { users } });
    const store = mockStore();
    const expectedActions = [
      {
        staff: users,
        type: types.SEARCH_USER,
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.searchUsers(), expectedActions);
  });

  it('dispatches error action when searching users fails', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.searchUsers(), [expectedActions[1]]);
  });

  it('Invites new users', () => {
    const mockResponse = httpResponse(200, { data: users[0] });
    const store = mockStore();
    const expectedActions = [
      {
        type: types.ADD_USER,
        staff: users[0],
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.inviteUser(), expectedActions);
  });

  it('dispatches error action when inviting user fails', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.inviteUser(), [expectedActions[1]]);
  });

  it('Updates a User', () => {
    const mockResponse = httpResponse(200, { data: users[0]});
    const store = mockStore();
    const expectedActions = [
      {
        type: types.EDIT_USER,
        staff: users[0],
        index: 1,
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.updateUser(2, 3, 1), expectedActions);
  });

  it('dispatches error action when updating a user fails', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.updateUser(2, 3, 1), [expectedActions[1]]);
  });

  it('Removes a User', () => {
    const mockResponse = httpResponse(201, { data: users[0] });
    const store = mockStore();
    const expectedActions = [
      {
        type: types.DELETE_USER,
        staff: users[0],
        index: 1,
        isError: false
      }
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, actions.removeUser(1, 1), expectedActions);
  });

  it('dispatches error action when deleting a user fails', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, actions.removeUser(1, 1), [expectedActions[1]]);
  });
});
