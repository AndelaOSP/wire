import * as ActionTypes from '../actions/actionTypes';
import reducer from './errorReducer';
import initialState from './initialState';

 describe('Reducers :: Error', () => {
  const getInitialState = initialState.error;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle Error Actions', () => {
    const action = { type: ActionTypes.ERROR_ACTION, error: {status: true}};
    const expected = Object.assign({}, getInitialState.status, action.error.status);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENT', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, error: {status: true}};
    const expected = Object.assign({}, getInitialState, action.error.status);
    expect(reducer(getInitialState, action.error)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENTS_SUCCESS', () => {
    const action = { type: ActionTypes.FETCH_INCIDENTS_SUCCESS, error:{status: true} };
    const expected = Object.assign({}, getInitialState, action.error.status);
    expect(reducer(getInitialState, action.error)).toEqual(expected);
  });

  it('should handle SEARCH_INCIDENTS', () => {
    const action = { type: ActionTypes.SEARCH_INCIDENTS, error: {status:true} };
    const expected = Object.assign({}, getInitialState, action.error.status);
    expect(reducer(getInitialState, action.error)).toEqual(expected);
  });
});

