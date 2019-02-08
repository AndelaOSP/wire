import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import { getToken } from '../../actions/tokenAction';
import './LoginPage.scss';
import authenticateUser from '../../helpers/auth';
import config from '../../config';


const getReferrerInlocationStorage = () => {
  const referrer = localStorage.getItem('referrer');
  return referrer || '/';
};

const setReferrerInlocationStorage = (path) => {
  if (path !== '/') {
    localStorage.setItem('referrer', path);
  }
};

/**
 * LoginPage class
 */
export class LoginPage extends React.Component {
  componentDidMount() {
    authenticateUser.authenticate();
    const email = localStorage.getItem('email');
    if (email) {
      this.props.getToken(email);
    }
  }

  render() {
    const styles = {
      button: {
        width: '15rem',
        height: '3rem',
        position: 'relative',
        marginLeft: '2vw',
      },
    };
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    setReferrerInlocationStorage(from.pathname);
    const referrer = getReferrerInlocationStorage();
    const {
      isError, errorMessage, hasToken,
    } = this.props;
    if (isError) {
      authenticateUser.removeToken();
      localStorage.clear();
    }

    if (authenticateUser.isAuthenticated && hasToken) {
      return <Redirect to={(from.pathname = referrer)} />;
    }
    return (
      <div>
        <div className="login-page">
          <div className="left-container">
            <div>
              <img className="andela-logo" src="/assets/images/andelaLogo.png" />
            </div>
            <div className="welcome-text">
              <p>
                  Welcome to
                {' '}
                <span className="wire">Wire </span>
                <br />
                  Please sign in with your Google account to proceed
              </p>
            </div>
            <RaisedButton
              className="button"
              icon={<img className="google-logo" src="../../../assets/images/icons8-google.svg" />}
              href={`${config.ANDELA_API_BASE_URL}/login?redirect_url=${config.BASE_URL}/login`}
              label={<p className="label">Sign In With Google</p>}
              style={styles.button}
            />
          </div>
          <div className="right-container">
            <img className="landing-image" src="/assets/images/wire_landing_page_vector@2x.png" />
            <div className="right-text">
              <p>
                <span style={{ fontWeight: 600 }}>An Incident</span>
                {' '}
                <br />
                Reporting Platform
              </p>
            </div>
            <div className="underline" />
          </div>
        </div>
        {isError ? (
          <CustomNotification type="error" message={errorMessage} autoHideDuration={150000} open />
        ) : (
          <CustomNotification type="error" message={errorMessage} open={false} />
        )}
      </div>
    );
  }
}

/**
 * PropTypes declaration
 */
LoginPage.propTypes = {
  location: PropTypes.object,
  getToken: PropTypes.func,
  isError: PropTypes.bool,
  hasToken: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LoginPage.defaultProps = {
  location: {},
  getToken: () => {},
  isError: false,
  hasToken: false,
  errorMessage: '',
};

const mapStateToProps = state => ({
  hasToken: state.hasToken,
  isError: state.error.status,
  errorMessage: state.error.message,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getToken,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
