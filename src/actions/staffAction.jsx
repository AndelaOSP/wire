import { FETCH_STAFF, ADD_USER, SEARCH_USER, EDIT_USER, DELETE_USER } from './actionTypes';
import { loadingAction } from './LoadingAction';
import { errorAction } from './errorAction';
import { http } from './http';

export const fetchStaffSuccess = staff => ({
  type: FETCH_STAFF, staff, isLoading: false, isError: false
});

export const fetchStaff = () => {
  return dispatch => {
    dispatch(loadingAction(true));
    return http().get('/users')
      .then(res => {
        dispatch(fetchStaffSuccess(res.data.data.users));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

export const searchUserSuccess = staff => ({
  type: SEARCH_USER, staff, isError: false
});

export const searchUsers = query => {
  return dispatch => {
    return http().get(`/users/search/?q=${query}`)
      .then(res => {
        dispatch(searchUserSuccess(res.data.data.users));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

export const inviteUserSuccess = staff => ({
  type: ADD_USER, staff, isError: false
});

export const inviteUser = (email, roleId, locationId) => {
  return dispatch => {
    return http()
      .post('/users/invite', { email, roleId, locationId })
      .then(res => {
        dispatch(inviteUserSuccess(res.data.data));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

export const updateUserSuccess = (staff, index) => ({
  type: EDIT_USER, staff, index, isError: false
});

export const updateUser = (userId, roleId, index) => {
  return dispatch => {
    return http()
      .put(`/users/${userId}`, { roleId })
      .then(res => {
        dispatch(updateUserSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};

export const removeUserSuccess = (staff, index) => ({
  type: DELETE_USER, staff, index, isError: false
});

export const removeUser = (userId, index) => {
  return dispatch => {
    return http()
      .delete(`/users/${userId}`)
      .then(res => {
        dispatch(removeUserSuccess(res.data.data, index));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
