/**
 * ./Components/App.jsx
 */
import React from 'react';
import { Link, Route } from 'react-router-dom';

// styling
import './App.scss';

// Components
import { authenticateUser } from './Login/LoginPage.Component';

const App = () => {
    return (
        <div className="content">
            <div className="column">
                <h1>Admin Dashboard</h1>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    );
};

/**
 * Log out user
 */
const logOut = () => {
    authenticateUser.revokeAuthentication(() => {
        console.log('authentication revoked,', authenticateUser.isAuthenticated);
    });
    location.reload();
};

export default App;
