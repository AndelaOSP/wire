import * as ActionTypes from '../actions/actionTypes';
import reducer from './incidentReducer';
import initialState from './initialState';

describe('Reducers :: Incident', () => {
const  getInitialState = initialState.incidents;

it('should get initial state by default', () => {
  const action = { type: 'unknown' };
  const expected= getInitialState;

  expect(reducer(undefined, action)).toEqual(expected);
  });
it('should handle incidents', () => {
  const action = { type: ActionTypes.FETCH_INCIDENTS_SUCCESS, incidents: {} };
  const expected = Object.assign({}, getInitialState, action.incidents);
  expect(reducer(getInitialState, action)).toEqual(expected);
  });
  it('should handle  search incidents', () => {
    const action = {
      type: ActionTypes.SEARCH_INCIDENTS,
      incidents: {}
    };
    const expected = Object.assign({}, getInitialState, action.incidents);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });
});

