import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import authenticateUser from '../../helpers/auth';

const RequireAdmin = (Component) => {
  class AuthenticatedComponent extends React.Component { // eslint-disable-line
    render() {
      return authenticateUser.isAdmin() ? (
        <Component {...this.props} />
      ) : (
        <Redirect to={{ pathname: '/dashboard', state: { from: this.props.location } }} />
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.object,
  };
  AuthenticatedComponent.defaultProps = {
    location: {},
  };

  return withRouter(AuthenticatedComponent);
};

RequireAdmin.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default RequireAdmin;
