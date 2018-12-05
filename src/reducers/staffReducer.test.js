import * as ActionTypes from '../actions/actionTypes';
import reducer from './staffReducer';
import initialState from './initialState';


describe('Reducers :: Staff Reducer', () => {
  const  getInitialState = initialState.staff;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle FETCH_STAFF', () => {
    const action = { type: ActionTypes.FETCH_STAFF, staff: {} };
    const expected = Object.assign({}, getInitialState, action.staff);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });
});

