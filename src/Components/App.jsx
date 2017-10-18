/**
 * ./Components/App.jsx
 */
import React from 'react';
import './App.scss';

export default class App extends React.Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">WIRE</h1>
                <button className="button is-info">Bulma Button</button>
            </div>
        );
    }
}
