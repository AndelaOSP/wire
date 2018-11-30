import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ERROR_ACTION, IS_LOADING } from './actions/actionTypes';

export const mockStore = (initialState = {}) => configureMockStore([thunk])(initialState);

export const mockAxios = (responseData, moxios, resolve = true) => {
  const request = moxios.requests.mostRecent();
  if(resolve) {
    return request.resolve({
      status: responseData.status,
      data: responseData.response.data
    });
  } else {
    return request.reject({
      status: responseData.status,
      response: responseData
    });
  }
};

export const mockDispatchAction = (store, thunk, expectedActions) => (
  store.dispatch(thunk)
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
);

export const isLoading = {
  type: IS_LOADING,
  status: true
};

export const expectedActionFailure = (errorMessage, statusCode, ) => ([
  isLoading,
  {
    type: ERROR_ACTION,
    status: true,
    statusCode: statusCode,
    message: errorMessage
  }
]);

export const httpResponse = (statusCode, data) => ({
  status : statusCode,
  response : {
    status : statusCode,
    data : data
  }
});
