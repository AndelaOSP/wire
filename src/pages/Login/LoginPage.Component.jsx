import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';

//styling
import './LoginPage.scss';

// config
import { ConfigData } from '../../config';

//helpers
import authenticateUser from '../../helpers/auth';

/**
 * LoginPage class
 */
class LoginPage extends React.Component{
    constructor() {
        super();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        setReferrerInlocationStorage(from.pathname);
        const userInfo = authenticateUser.authenticate();
        const referrer = getReferrerInlocationStorage();

        if (authenticateUser.isAuthenticated) {
            return (
              <Redirect to={from.pathname = referrer} />
            );
        }

        return (
            <div className="login-page">
                <div className="left-column">
                    <img className="logo-image" src="/assets/images/wire_logo.svg" alt="Wire Logo" />
                </div>
                <div className="right-column">
                    <div className="login-container">
                        <h2 className="title">Sign in to Wire</h2>
                        <p className="">Please use your work email</p>
                        <a 
                            className="button" 
                            href={`${ConfigData.ANDELA_API_BASE_URL}/login?redirect_url=${ConfigData.BASE_URL}/login`}
                        >
                            <img className="google-logo" src="/assets/images/icons8-google.svg" />
                            <span className="">Sign in with Google</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * PropTypes declaration
 */
LoginPage.propTypes = {
    location: PropTypes.object,
};

/**
 * get referrer function
 */
const getReferrerInlocationStorage = () => {
    const referrer = localStorage.getItem('referrer');
    return referrer ? referrer : '/';
};

/**
 * store referrer function
 * @param {string} path 
 */
const setReferrerInlocationStorage = (path) => {
    if(path !== '/') {
        localStorage.setItem('referrer', path);
    }
};

export default LoginPage;
