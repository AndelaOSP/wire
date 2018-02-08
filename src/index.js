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
    primaryTextColor: '#747474'
  }
});

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Component />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(Routes);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./routes', () => {
    const HotApp = require('./routes').default;
    renderApp(HotApp);
  });
}
