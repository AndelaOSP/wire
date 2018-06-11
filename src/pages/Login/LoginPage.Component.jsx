import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';

// actions
import { getToken } from '../../actions/tokenAction';

// styling
import './LoginPage.scss';

// helpers
import authenticateUser from '../../helpers/auth';

// config
import config from '../../config';

/**
 * LoginPage class
 */
class LoginPage extends React.Component {
  componentWillMount() {
    authenticateUser.authenticate();
    let email = localStorage.getItem('email');
    if (email) {
      this.props.getToken(email);
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    setReferrerInlocationStorage(from.pathname);
    const referrer = getReferrerInlocationStorage();
    const { isLoading, isError, errorMessage, hasToken } = this.props;

    if (isError) {
      return <CustomNotification type={'error'} message={errorMessage} autoHideDuration={15000} open />;
    } else if (isLoading) {
      return <CircularProgressIndicator />;
    } else if (authenticateUser.isAuthenticated && hasToken) {
      return <Redirect to={(from.pathname = referrer)} />;
    } else {
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
}

/**
 * PropTypes declaration
 */
LoginPage.propTypes = {
  location: PropTypes.object,
  getToken: PropTypes.func,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasToken: PropTypes.bool,
  errorMessage: PropTypes.string
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

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    hasToken: state.hasToken,
    isError: state.error.status,
    errorMessage: state.error.message
  };
};

/**
 * map dispatch to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getToken
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
