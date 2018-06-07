import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import * as axios from 'axios';

//styling
import './LoginPage.scss';

// config
import config from '../../config';

//helpers
import authenticateUser from '../../helpers/auth';

/**
 * LoginPage class
 */
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: ''
    };
  }

  componentDidMount() {
    authenticateUser.authenticate();
    this.login(localStorage.getItem('email'));
  }

  login = email => {
    let loginUrl = `${config.API_URL}/users/login`;
    if (email) {
      axios.post(loginUrl, {email})
      .then(response => {
        this.setState({
          userToken: response.data.userToken
        });
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    setReferrerInlocationStorage(from.pathname);
    const referrer = getReferrerInlocationStorage();
    localStorage.setItem('token', this.state.userToken);

    if (authenticateUser.isAuthenticated && this.state.userToken) {
      return <Redirect to={(from.pathname = referrer)} />;
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
              icon={<img className="google-logo" src="../../../assets/images/icons8-google.svg" />}
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
  location: PropTypes.object
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
const setReferrerInlocationStorage = path => {
  if (path !== '/') {
    localStorage.setItem('referrer', path);
  }
};

export default LoginPage;
