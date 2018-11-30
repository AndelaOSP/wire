// third-party libraries
import moxios from 'moxios';

// helpers
import { mockStore, mockAxios, expectedActionFailure, mockDispatchAction } from '../src/testHelpers';

// thunks
import { loadIncidents } from '../src/actions/incidentAction';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('displays the appropriate error message when there is an error fetching incidents', () => {
    const mockResponse = {
      status: 404,
      response: {
        status: 404,
        data: {
          message: 'The requested resource cannot be found'
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 404);
    const store = mockStore();

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('displays the appropriate error message when there is an auth error', () => {
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

    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('displays the appropriate error message for all other errors', () => {
    const mockResponse = {
      status: 500,
      response: {
        status: 500,
        data: {
          message: 'Oops! Something went wrong. Please try again.'
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 500);

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });
});
