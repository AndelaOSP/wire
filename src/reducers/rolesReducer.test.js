import * as ActionTypes from '../actions/actionTypes';
import reducer from './rolesReducer';
import initialState from './initialState';

describe('Reducers :: Roles', () => {
  const getInitialState = initialState.roles;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_ROLES', () => {
    const action = { type: ActionTypes.FETCH_ROLES, roles: {} };
    const expected = Object.assign({}, getInitialState, action.roles);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });
});

