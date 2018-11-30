import { FETCH_ROLES } from './actionTypes';
import { errorAction } from './errorAction';
import { http } from './http';

export const fetchRolesSuccess = roles => ({
  type: FETCH_ROLES, roles, isError: false
});

export const fetchRoles = () => {
  return dispatch => {
    return http().get('/roles')
      .then(res => {
        dispatch(fetchRolesSuccess(res.data.data.roles));
      })
      .catch(error => {
        return dispatch(errorAction(error));
      });
  };
};
