// thunks
import { loadIncidents, changeStatus} from '../src/actions/incidentAction';

// types
import {
  CHANGE_STATUS,
  FETCH_INCIDENTS_SUCCESS
} from '../src/actions/actionTypes';

// third-party libraries
import moxios from 'moxios';

// mocks
import { testIncidents } from '../mock_endpoints/mockData';

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

  it('should fetch incidents successfully', () => {
    const mockResponse = {
      status: 200,
      response: {
        status: 'success',
        data: {
          data: {
            incidents: [
              {
                id: '12345667',
                subject: 'Stolen Phone',
                dateOccurred: '2017-02-11T00:00:00.000Z',
                createdAt: '2018-02-14T12:26:03.792Z',
                User: { name: 'Maureen Nyakio' },
                Level: { name: 'red' }
              }
            ]
          }
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios));
    
    const store = mockStore();
    const expectedActions = [
      isLoading,
      {
        incidents: mockResponse.response.data.data.incidents,
        type: FETCH_INCIDENTS_SUCCESS,
        isLoading: false,
        isError: false
      }
    ];

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('creates CHANGE_STATUS when changing status', () => {
    const mockResponse = {
      status : 200,
      response : {
        status : 200,
        data : {
          data: testIncidents[0],
        }
      }
    };

    moxios.wait(() => mockAxios(mockResponse, moxios));
  
    const store = mockStore();
    const expectedActions = [
      {
        type: CHANGE_STATUS,
        incidentId: testIncidents[0],
      }
    ];

    return mockDispatchAction(store, changeStatus(2,1), expectedActions);
  });

  it('creates ERROR_ACTION with 404 when an error occurs', () => {
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

    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 404);

    return mockDispatchAction(store, changeStatus(2, 3), [expectedActions[1]]);
  });

  it('creates ERROR_ACTION with 401 when not logged in', () => {
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

    return mockDispatchAction(store, changeStatus(2, 3), [expectedActions[1]]);
  });
});
