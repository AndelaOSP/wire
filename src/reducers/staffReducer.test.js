import * as ActionTypes from '../actions/actionTypes';
import reducer from './staffReducer';
import initialState from './initialState';
import {
  inviteUserSuccess,
  searchUserSuccess,
  removeUserSuccess,
  updateUserSuccess,
} from '../actions/staffAction';
import { users } from '../../mock_endpoints/mockData';


describe('Reducers :: Staff Reducer', () => {
  const getInitialState = initialState.staff;

  it('should get initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_STAFF', () => {
    const action = { type: ActionTypes.FETCH_STAFF, staff: {} };
    const expected = Object.assign({}, getInitialState, action.staff);
    expect(reducer(getInitialState, action)).toEqual(expected);
  });

  it('should handle ADD_USER', () => {
    const inviteUserSuccessAction = inviteUserSuccess({type: ActionTypes.ADD_USER, staff: {} });
    const expectedResult = Object.assign({}, getInitialState, inviteUserSuccessAction.staff);
    expect(reducer(getInitialState, inviteUserSuccessAction)).toEqual([expectedResult]);
  });

  it('should handle EDIT_USER', () => {
    const editedStaff = {
      id: 1,
      email: 'me@example.com',
      username: 'Example',
      imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
      roleId: 2,
      Role: {
        name: 'Assignee',
      },
      Location: {
        name: 'Cafeteria',
        centre: 'Lagos',
        country: 'Nigeria',
      },
    };
    const updateUserSuccessAction = updateUserSuccess(editedStaff, 1);
    const expectedState = reducer(users, updateUserSuccessAction);

    expect(expectedState[1]).toEqual(editedStaff);
  });

  it('should handle DELETE_USER', () => {
    const removeUserSuccessAction = removeUserSuccess(users[0], 0);
    const expectedState = reducer(users, removeUserSuccessAction);

    expect(expectedState.length).toEqual(users.length - 1);
  });

  it('should handle SEARCH_USER', () => {
    const searchUserSuccessAction = searchUserSuccess([users[0]]);
    const expectedState = reducer(initialState, searchUserSuccessAction);

    expect(expectedState).toEqual(searchUserSuccessAction.staff);
  });
});
