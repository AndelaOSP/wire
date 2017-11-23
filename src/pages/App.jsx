/**
 * ./Components/App.jsx
 */
import React from 'react';

// styling
import './App.scss';

// Components
import authenticateUser from '../helpers/auth';

const App = () => {
    return (
        <div className="content">
            <div className="column">
                <h1>Admin Dashboard</h1>
                <button onClick={authenticateUser.revokeAuthentication}>Log Out</button>
            </div>
        </div>
    );
};

export default App;
