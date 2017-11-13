import * as React from 'react';
import { Link } from 'react-router-dom';

//styling
import './LoginPage.scss';

const LoginPage = () => {
    return(
        <div className="login-page">
            <div className="left-column">
                <img className="logo-image" src="/assets/images/wire_logo.svg" alt="Wire Logo" />
            </div>
            <div className="right-column">
                <div className="login-container">
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
};

export default LoginPage;
