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
    const styles = {
      button: {
        width: '288px',
        height: '55px',
        marginLeft: '5rem',
        marginTop: '0rem',
      
      }
    };
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
          <div className="left-container">
          <div><img className="andela-logo" src="/assets/images/andelaLogo.png" alt=""/></div>
          <div className="welcome-text">
            <p>Welcome to <span className="wire">Wire</span><br/>
            Please sign in with<br/> your Google account<br/> to proceed</p>
          </div>
          <RaisedButton
            className="button"
            icon={<img className="google-logo" src="../../../assets/images/icons8-google.svg" />}
            href={`${config.ANDELA_API_BASE_URL}/login?redirect_url=${config.BASE_URL}/login`}
            label={<p className="label">Sign In With Google</p>}
            style={styles.button}
          />
          </div>
        </div>
        <div className="right-column">
            <img className="landing-image" src="/assets/images/wire_landing_page_vector@2x.png" />
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
