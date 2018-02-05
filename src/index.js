import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';

//routes
import Routes from './routes';

// store
import store from './store/store';

/**
 * Customize MuiTheme for the DatePicker Component
 */
const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: '#747474',
    headerColor: '#747474',
    color: '#747474'
  },
  flatButton: {
      primaryTextColor: '#747474',
  }
});


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Routes />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
