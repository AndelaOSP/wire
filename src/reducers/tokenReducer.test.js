import * as ActionTypes from '../actions/actionTypes';
import reducer from './tokenReducer';
import initialState from './initialState';

describe('Reducers :: Token Reducer', () => {
  const getInitialState = initialState;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState.hasToken;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle GET_TOKEN_SUCCESS', () => {
    const action = { type: ActionTypes.GET_TOKEN_SUCCESS, hasToken: true};
    const expected = Object.assign({}, getInitialState, action.hasToken);
    expect(reducer(getInitialState, action.hasToken)).toEqual(expected);
  });
});

