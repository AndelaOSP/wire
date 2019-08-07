import * as ActionTypes from '../actions/actionTypes';
import reducer from './loadingReducer';
import initialState from './initialState';
import { errorAction } from '../actions/errorAction';
import { getTokenSuccess } from '../actions/tokenAction';
import { fetchStaffSuccess } from '../actions/staffAction';

describe('Reducers :: Loading', () => {
  const getInitialState = initialState;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState.isLoading;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle IS_LOADING', () => {
    const action = { type: ActionTypes.IS_LOADING, status: true };
    const expectedState = reducer(initialState, action);

    expect(expectedState).toBeTruthy();
  });

  it('should handle FETCH_INCIDENTS_SUCCESS', () => {
    const action = { type: ActionTypes.FETCH_INCIDENTS_SUCCESS, isLoading: true };
    const expectedState = reducer(initialState, action);

    expect(expectedState).toBeTruthy();
  });

  it('should handle FETCH_INCIDENT', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, isLoading: true };
    const expectedState = reducer(initialState, action);

    expect(expectedState).toBeTruthy();
  });

  it('should handle FETCH_STAFF', () => {
    const fetchStaffSuccessAction = fetchStaffSuccess([]);
    const expectedState = reducer(initialState, fetchStaffSuccessAction);

    expect(expectedState).toBeFalsy();
  });

  it('should handle GET_TOKEN_SUCCESS', () => {
    const getTokenSuccessAction = getTokenSuccess(true, '');
    const newState = reducer(initialState, getTokenSuccessAction);

    expect(newState).toBeFalsy();
  });

  it('should handle ERROR_ACTION', () => {
    const errorActionAction = errorAction({ response: {} });
    const newState = reducer(initialState, errorActionAction);
    
    expect(newState).toBeFalsy();
  });
});
