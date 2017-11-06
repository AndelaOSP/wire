/**
 * ./index.js
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// store
import store from './store/store';

// Components
import App from './Components/App.jsx';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
