import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';

//styling
import './LoginPage.scss';

class LoginPage extends React.Component{
    constructor() {
        super();

        this.state = {
            redirectToReferrer: false
        };
    }

    login = () => {
        authenticateUser.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            console.log('redirect?', redirectToReferrer, 'now redirect to:', from);
            return (
              <Redirect to={from} />
            );
        }

        console.log('not authenticated, redirect?', redirectToReferrer);
        return (
            <div className="login-page">
                <div className="left-column">
                    <img className="logo-image" src="/assets/images/wire_logo.svg" alt="Wire Logo" />
                </div>
                <div className="right-column">
                    <div className="login-container">
                        <div>
                            <p>You must log in to view the page at {from.pathname}</p>
                            <button onClick={this.login}>Log in</button>
                        </div>
                        <h2 className="title">Sign in to Wire</h2>
                        <p className="">Please use your work email</p>
                        <a className="button">
                            <img className="google-logo" src="/assets/images/icons8-google.svg" />
                            <span className="">Sign in with Google</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

// authCode
/**
 * authenticate user
 * revoke authentication
 *  on signOut
 *      revoke authentication
 *      redirect to landing page / login page
 */
export const authenticateUser = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true,
        setTimeout(cb, 100);
    },
    revokeAuthentication(cb) {
        this.isAuthenticated = false,
        setTimeout(cb, 100);
    }
};

export default LoginPage;
