import moxios from 'moxios';
import {
  httpResponse,
  mockStore,
  mockAxios,
  expectedActionFailure,
  mockDispatchAction,
} from '../testHelpers';
import { ERROR_ACTION } from './actionTypes';
import { loadIncidents } from './incidentAction';
import { errorAction } from './errorAction';

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('displays the appropriate error message when there is an error fetching incidents', () => {
    const mockResponse = httpResponse(404, { message: 'The requested resource cannot be found' });
    moxios.wait(() => mockAxios(mockResponse, moxios, false));
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 404);
    const store = mockStore();

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('should catch status code 400', () => {
    const mockResponse = httpResponse(400, { message: 'The requested resource cannot be found' });
    const expectedActions = {
      type: ERROR_ACTION,
      payload: {
        status: true,
        statusCode: 400,
        message: mockResponse.response.data.message,
      },
    };

    expect(errorAction(mockResponse)).toEqual(expectedActions);
  });

  it('displays the appropriate error message when there is an auth error', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    moxios.wait(() => mockAxios(mockResponse, moxios, false));
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });

  it('displays the appropriate error message for all other errors', () => {
    const mockResponse = httpResponse(500, { message: 'Oops! Something went wrong. Please try again.' });
    moxios.wait(() => mockAxios(mockResponse, moxios, false));
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 500);

    return mockDispatchAction(store, loadIncidents(), expectedActions);
  });
});
