import * as ActionTypes from '../actions/actionTypes';
import reducer from './locationsReducer';
import initialState from './initialState';

describe('Reducers :: Locations', () => {
  const  getInitialState = initialState.locations;

  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected= getInitialState;

    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle FETCH_LOCATIONS', () => {
    const action = { type: ActionTypes.FETCH_LOCATIONS, locations: {}};
    const expected = Object.assign({}, getInitialState, action.locations);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });

});

