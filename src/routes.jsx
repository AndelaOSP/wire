import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

//Components
import LoginPage, { authenticateUser } from './pages/Login/LoginPage.Component';
import App from './pages/App';

export const history = createHistory();

const Routes = () => (
    <Router>
        <Switch>
        <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={App} />
            <PrivateRoute path="/dashboard" component= {App} />
        </Switch>
    </Router>
);

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

export default Routes;
