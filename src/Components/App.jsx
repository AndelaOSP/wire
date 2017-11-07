/**
 * ./Components/App.jsx
 */
import React from 'react';

// styling
import './App.scss';

// Components
import LoginPage from '../pages/Login/LoginPage.Component';

export default class App extends React.Component {
    render() {
        return (
            <div className="content">
                < LoginPage />
            </div>
        );
    }
}
