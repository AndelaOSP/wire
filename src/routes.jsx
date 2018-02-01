import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// History
import createHistory from 'history/createBrowserHistory';

// Components
import LoginPage from './pages/Login/LoginPage.Component';
import Dashboard from './pages/Dashboard/Dashboard.Component';
import IncidentTimeline from './pages/IncidentTimeline/IncidentTimeline.Component';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.Component';
import SearchComponent from './pages/Search/Search.Component';

// create history object.
export const history = createHistory();

/**
 * Application primary routes
 */
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/timeline/:incidentId" component={IncidentTimeline} />
      <PrivateRoute path="/search" component={SearchComponent} />
    </Switch>
  </Router>
);

export default Routes;
