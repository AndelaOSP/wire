import * as ActionTypes from '../actions/actionTypes';
import reducer from './loadingReducer';
import initialState from './initialState';

describe('Reducers :: Loading', () => {
  const  getInitialState = initialState;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState.isLoading;
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle IS_LOADING', () => {
    const action = { type: ActionTypes.IS_LOADING, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENTS_SUCCESS', () => {
    const action = { type: ActionTypes.FETCH_INCIDENTS_SUCCESS, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENT', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

  it('should handle FETCH_STAFF', () => {
    const action = { type: ActionTypes.FETCH_STAFF, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

  it('should handle GET_TOKEN_SUCCESS', () => {
    const action = { type: ActionTypes.GET_TOKEN_SUCCESS, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

  it('should handle ERROR_ACTION', () => {
    const action = { type: ActionTypes.ERROR_ACTION, isLoading: true };
    const expected = Object.assign({}, getInitialState, action.isLoading);
    expect(reducer(getInitialState, action.isLoading)).toEqual(expected);
  });

});

