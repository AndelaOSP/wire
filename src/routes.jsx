import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// History 
import createHistory from 'history/createBrowserHistory';

// Components
import LoginPage from './pages/Login/LoginPage.Component';
import Dashboard from './pages/Dashboard/Dashboard.Component';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.Component';

// create history object.
export const history = createHistory();

/**
 * Application primary routes
 */
const Routes = () => (
    <Router>
        <Switch>
        <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={Dashboard} />
            <PrivateRoute path="/dashboard" component= {Dashboard} />
        </Switch>
    </Router>
);

export default Routes;
