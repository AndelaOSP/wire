import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

//Components
import LoginPage from './pages/Login/LoginPage.Component';
import App from './pages/App';

export const history = createHistory();

const Routes = () => (
    <div>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={LoginPage} />
                <Route path="/dashboard" component={App} />
            </div>
        </ConnectedRouter>
    </div>
);

export default Routes;
