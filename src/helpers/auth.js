/**
 * Login and log out user
 */

import * as jscookie from 'js-cookie';
import { decodeToken, currentUser } from './decodeToken';

const authenticateUser = {
  andelaEmailRegex: /@andela.com$/,
  isAuthenticated: false,

  authenticate() {
    if (this.validateUser()) {
      this.isAuthenticated = true;
    }
  },
  revokeAuthentication() {
    this.isAuthenticated = false;
    this.logoutUser();
  },

  /**
   * Check if user info is credible
   * and user can be authorized.
   */
  validateUser() {
    const userInfo = decodeToken();

    if (this.andelaEmailRegex.test(userInfo.email)) {
      if (userInfo.roles.Andelan) {
        localStorage.setItem('user', userInfo.name);
        localStorage.setItem('user_avatar', userInfo.picture);
        localStorage.setItem('userId', userInfo.id);
        localStorage.setItem('email', userInfo.email);
        return true;
      }
      return false;
    }
    return false;
  },

  isAdmin() {
    const user = currentUser();
    if (user) {
      return user.roleId === 3;
    }
    return process.env.API_URL === 'http://wire.andela.com:8080/api';
  },

  /**
   * logout user
   */
  logoutUser() {
    this.removeToken();
    localStorage.clear();
    location.reload(); /* eslint-disable-line */
  },

  /**
   * Remove token
   */
  removeToken() {
    jscookie.remove('jwt-token', { path: '/', domain: '.andela.com' });
  },
};

authenticateUser.revokeAuthentication = authenticateUser
  .revokeAuthentication.bind(authenticateUser);

export default authenticateUser;
