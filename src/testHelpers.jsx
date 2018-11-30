// third-party libraries
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// types
import { ERROR_ACTION, IS_LOADING } from './actions/actionTypes';

/**
 * Utility mock store that can be used for all instances where one is required
 * 
 * @returns {Object}
 */
export const mockStore = (initialState = {}) => configureMockStore([thunk])(initialState);

/**
 * Mock for axios request
 * 
 * @param {Object} responseData
 * @param {Object} moxios
 * @param {boolean} resolve
 * 
 * @returns {Function}
 */
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

/**
 * Mock the dispatch action and returns an assertion
 * 
 * @param {Object} store
 * @param {Function} thunk
 * @param {Object[]} expectedActions
 * 
 * @returns {Function}
 */
export const mockDispatchAction = (store, thunk, expectedActions) => (
  store.dispatch(thunk)
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
);

// reuseable object for the loading action
export const isLoading = {
  type: IS_LOADING,
  status: true
};

/**
 * Mock the expected error action
 * 
 * @param {string} errorMessage
 * 
 * @returns {Object[]}
 */
export const expectedActionFailure = (errorMessage, statusCode, ) => ([
  isLoading,
  {
    type: ERROR_ACTION,
    status: true,
    statusCode: statusCode,
    message: errorMessage
  }
]);
