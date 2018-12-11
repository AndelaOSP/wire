import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from './pages/Login/LoginPage.Component';
import Dashboard from './pages/Dashboard/Dashboard.Component'; /* eslint-disable-line import/no-named-as-default */
import IncidentTimeline from './pages/IncidentTimeline/IncidentTimeline.Component';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.Component';
import SearchComponent from './pages/Search/Search.Component';
import RequireAdmin from './Components/RequireAdmin/RequireAdmin.Component';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.Component'; /* eslint-disable-line import/no-named-as-default */

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
      <PrivateRoute path="/settings" component={RequireAdmin(AdminDashboard)} />
    </Switch>
  </Router>
);

export default Routes;
