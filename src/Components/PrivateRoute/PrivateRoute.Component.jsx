import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Auth helper
import authenticateUser from '../../helpers/auth';

/**
 * PrivateRoute Component
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  authenticateUser.authenticate();
  const { statusCode } = rest;
  const loginErrors = [401, 403];
  return (
    <Route
      {...rest}
      render={props =>
        authenticateUser.isAuthenticated && loginErrors.indexOf(statusCode) == -1 ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

/**
 * PrivateRoute PropTypes declaration
 */
PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]), // Container || functional react component
  location: PropTypes.object,
  statusCode: PropTypes.number
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    statusCode: state.error.statusCode
  };
};

export default connect(mapStateToProps)(PrivateRoute);
