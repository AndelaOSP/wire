import moxios from 'moxios';
import { loadIncidents, changeStatus, searchIncidents } from './incidentAction';
import {
  CHANGE_STATUS,
  FETCH_INCIDENTS_SUCCESS,
  SEARCH_INCIDENTS,
  ERROR_ACTION,
} from './actionTypes';
import { testIncidents } from '../../mock_endpoints/mockData';
import {
  isLoading,
  httpResponse,
  mockStore,
  mockAxios,
  expectedActionFailure,
  mockDispatchAction,
} from '../testHelpers';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch incidents successfully', () => {
    const mockResponse = httpResponse(200, {
      data: {
        incidents: [
          {
            id: '12345667',
            subject: 'Stolen Phone',
            dateOccurred: '2017-02-11T00:00:00.000Z',
            createdAt: '2018-02-14T12:26:03.792Z',
            User: { name: 'Maureen Nyakio' },
            Level: { name: 'red' },
          },
        ],
      },
    });
    const store = mockStore();
    const expectedActions = [
      isLoading,
      {
        incidents: mockResponse.response.data.data.incidents,
        type: FETCH_INCIDENTS_SUCCESS,
        isLoading: false,
        isError: false,
      },
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('should dispatch errorAction when loadIncidents action failed', () => {
    const mockResponse = httpResponse(404, { message: 'The requested resource cannot be found' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 404);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('creates CHANGE_STATUS when changing status', () => {
    const mockResponse = httpResponse(200, { data: testIncidents[0] });
    const store = mockStore();
    const expectedActions = [
      {
        type: CHANGE_STATUS,
        incidentId: testIncidents[0],
      },
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, changeStatus(2, 1), expectedActions);
  });

  it('creates ERROR_ACTION with 404 when an error occurs', () => {
    const mockResponse = httpResponse(404, { message: 'The requested resource cannot be found' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 404);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, changeStatus(2, 3), [expectedActions[1]]);
  });

  it('creates ERROR_ACTION with 401 when not logged in', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, changeStatus(2, 3), [expectedActions[1]]);
  });

  it('should dispatch searchIncidentsSuccess when http request is successful', () => {
    const mockResponse = httpResponse(200, { data: { incidents: testIncidents } });
    const store = mockStore();
    const expectedActions = [
      {
        type: SEARCH_INCIDENTS,
        incidents: testIncidents,
        isError: false,
      },
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, searchIncidents('search query'), expectedActions);
  });

  it('should dispatch errorAction when http request failed', () => {
    const mockResponse = httpResponse(404, { message: 'The requested resource cannot be found' });
    const store = mockStore();
    const expectedActions = [
      {
        type: ERROR_ACTION,
        status: true,
        statusCode: 404,
        message: mockResponse.response.data.message,
      },
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, searchIncidents('search query'), expectedActions);
  });
});
