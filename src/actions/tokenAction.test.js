import moxios from 'moxios';
import { getToken } from './tokenAction';
import { GET_TOKEN_SUCCESS } from './actionTypes';
import {
  isLoading,
  httpResponse,
  mockStore,
  mockAxios,
  expectedActionFailure,
  mockDispatchAction,
  LocalStorageMock,
} from '../testHelpers';

global.localStorage = new LocalStorageMock();

describe('The getToken action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch getTokenSuccess when http request is successful', () => {
    const mockResponse = httpResponse(201, { userToken: 'somesecrettoken12' });
    const store = mockStore();
    const expectedActions = [
      isLoading,
      {
        type: GET_TOKEN_SUCCESS,
        isLoading: false,
        isError: false,
        hasToken: true,
      },
    ];
    moxios.wait(() => mockAxios(mockResponse, moxios));

    return mockDispatchAction(store, getToken('cosmas@andela.com'), expectedActions);
  });

  it('should dispatch errorAction when http request failed', () => {
    const mockResponse = httpResponse(401, { message: 'You might not be logged in/authorized. Please try again.' });
    const store = mockStore();
    const expectedActions = expectedActionFailure(mockResponse.response.data.message, 401);
    moxios.wait(() => mockAxios(mockResponse, moxios, false));

    return mockDispatchAction(store, getToken('cosmas@andela.com'), expectedActions);
  });
});
