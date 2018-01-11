import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

//styling
import './LoginPage.scss';

// config
import { config } from '../../config';

//helpers
import authenticateUser from '../../helpers/auth';

/**
 * LoginPage class
 */
class LoginPage extends React.Component{

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        setReferrerInlocationStorage(from.pathname);
        authenticateUser.authenticate();
        const referrer = getReferrerInlocationStorage();

        if (authenticateUser.isAuthenticated) {
            return (
              <Redirect to={from.pathname = referrer} />
            );
        }

        return (
            <div className="login-page">
                <div className="left-column">
                 <img className="landing-image" src="/assets/images/wire_landingpage.jpeg" alt="Wire Logo" />
                </div>
                <div className="right-column">
                    <div className="login-container">
                    <img className="landing-logo" src="/assets/images/wire_logo_landing.svg" />
                        <h2 className="title">Sign in with Andela email</h2>
                        <RaisedButton 
                            className="button"
                            icon={<img className="google-logo" src="../../../assets/images/icons8-google.svg"/>}
                            href={`${config.ANDELA_API_BASE_URL}/login?redirect_url=${config.BASE_URL}/login`}
                            label="login with google" 
                        />
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
