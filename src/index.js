/**
 * ./index.js
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//routes
import Routes from './routes';

// store
import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
