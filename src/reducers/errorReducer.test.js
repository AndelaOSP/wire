import * as ActionTypes from '../actions/actionTypes';
import reducer from './errorReducer';
import initialState from './initialState';
import { getTokenSuccess } from '../actions/tokenAction';
import {
  fetchStaffSuccess,
  inviteUserSuccess,
  searchUserSuccess,
  removeUserSuccess,
  updateUserSuccess,
} from '../actions/staffAction';
import { fetchLocationsSuccess } from '../actions/locationsAction';
import { fetchRolesSuccess } from '../actions/rolesAction';
import { searchIncidentsSuccess, loadIncidentsSuccess } from '../actions/incidentAction';

describe('Reducers :: Error', () => {
  const getInitialState = initialState.error;
  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle Error Actions', () => {
    const action = { type: ActionTypes.ERROR_ACTION, error: { status: true } };
    const expected = Object.assign({}, getInitialState.status, action.error.status);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });

  it('should handle FETCH_INCIDENT', () => {
    const action = { type: ActionTypes.FETCH_INCIDENT, error: { status: true } };
    const newState = reducer(initialState, action);
    
    expect(newState.status).toBeFalsy();
  });

  it('should handle FETCH_INCIDENTS_SUCCESS', () => {
    const loadIncidentsSuccessAction = loadIncidentsSuccess([]);
    const newState = reducer(initialState, loadIncidentsSuccessAction);
    
    expect(newState.status).toBeFalsy();
  });

  it('should handle SEARCH_INCIDENTS', () => {
    const searchIncidentsSuccessAction = searchIncidentsSuccess([]);
    const newState = reducer(initialState, searchIncidentsSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle FETCH_STAFF', () => {
    const fetchStaffSuccessAction = fetchStaffSuccess([]);
    const newState = reducer(initialState, fetchStaffSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle FETCH_ROLES', () => {
    const fetchRolesSuccessAction = fetchRolesSuccess([]);
    const newState = reducer(initialState, fetchRolesSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle FETCH_LOCATIONS', () => {
    const fetchLocationsSuccessAction = fetchLocationsSuccess([]);
    const newState = reducer(initialState, fetchLocationsSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle ADD_USER', () => {
    const inviteUserSuccessAction = inviteUserSuccess({});
    const newState = reducer(initialState, inviteUserSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle EDIT_USER', () => {
    const updateUserSuccessAction = updateUserSuccess({}, 1);
    const newState = reducer(initialState, updateUserSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle DELETE_USER', () => {
    const removeUserSuccessAction = removeUserSuccess({}, 1);
    const newState = reducer(initialState, removeUserSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle SEARCH_USER', () => {
    const searchUserSuccessAction = searchUserSuccess([]);
    const newState = reducer(initialState, searchUserSuccessAction);

    expect(newState.status).toBeFalsy();
  });

  it('should handle GET_TOKEN_SUCCESS', () => {
    const getTokenSuccessAction = getTokenSuccess(true, 'somesecrettoken12');
    const newState = reducer(initialState, getTokenSuccessAction);
    
    expect(newState.status).toBeFalsy();
  });
});
