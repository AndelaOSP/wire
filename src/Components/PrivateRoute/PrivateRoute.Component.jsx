import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Auth helper
import authenticateUser from '../../helpers/auth';

/**
 * PrivateRoute Component
 */
export const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {
                (props) => authenticateUser.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
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
};

export default PrivateRoute;
