import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

//routes
import Routes from './routes';

// store
import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Routes />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
