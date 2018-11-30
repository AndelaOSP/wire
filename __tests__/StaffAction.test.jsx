// third-party libraries
import moxios from 'moxios';

// thunks
import * as actions from '../src/actions/staffAction';

// types
import * as types from '../src/actions/actionTypes';

// mocks
import { users } from '../mock_endpoints/mockData';

// helpers
import {
  isLoading,
  mockStore,
  mockAxios,
  expectedActionFailure,
  mockDispatchAction
} from '../src/testHelpers';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates all appropriate actions when fetching staff', () => {
    const mockResponse = {
      status: 201,
      response: {
        status: 'success',
        data: {
          data: {
            users
          }
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios));

    const store = mockStore();
    const expectedActions = [
      isLoading,
      {
        type: types.FETCH_STAFF,
        staff: users,
        isLoading: false,
        isError: false
      },
    ];
    
    return mockDispatchAction(store, actions.fetchStaff(), expectedActions);
  });

  it('dispatches error action when fetching staff fails', () => {
    const mockResponse = {
      status: 401,
      response: {
        status: 401,
        data: {
          message: 'You might not be logged in/authorized. Please try again.'
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    const store = mockStore();

    return mockDispatchAction(store, actions.fetchStaff(), expectedActions);
  });
});
