/**
 * Login and log out user
 */

import decodeToken from '../helpers/decodeToken';
import * as jscookie from 'js-cookie';

const authenticateUser = {
    andelaEmailRegex: /@andela.com$/,
    isAuthenticated: false,

    authenticate() {
        if(this.validateUser()) {
            this.isAuthenticated = true;
            return this.isAuthenticated;
        }
    },
    revokeAuthentication() {
        this.isAuthenticated = false;
        this.logoutUser();
    },

    /**
     * Check if user info is credible
     * and user can be authorized.
     * check if is WIRE admin
     */
    validateUser() {
        const userInfo = decodeToken();
    
        if (this.andelaEmailRegex.test(userInfo.email)){

            /**
             * TODO: update to authenticating only WIRE admins
             *       Get admin info from WIRE API
             */
            if (userInfo.roles.Andelan) {
                localStorage.setItem('user', userInfo.name);
                localStorage.setItem('user_avatar', userInfo.picture);
                this.isAuthenticated = true;
                return true;
            }
            return false;
        }
        return false;
    },

    /**
     * logout user
     */
    logoutUser() {
        this.removeToken();
        location.reload();
    },

    /**
     * Remove token
     */
    removeToken() {
        jscookie.remove('jwt-token', { path: '/', domain: '.andela.com'});
        return;
    }
};

authenticateUser.revokeAuthentication = authenticateUser.revokeAuthentication.bind(authenticateUser);

export default authenticateUser;
