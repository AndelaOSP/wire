/**
 * ./Components/App.jsx
 */
import React from 'react';
import { Link } from 'react-router-dom';

// styling
import './App.scss';

export default class App extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="column">
                    <h1>Home</h1>
                    <Link to="/">Logout</Link>
                </div>
            </div>
        );
    }
}
