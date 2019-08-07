import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './store/store';
import { Socket, SocketProvider } from '../socket';

const HotApp = require('./routes').default;

// Establish socket connection with server.
const socket = new Socket('http://wire.andela.com:3000');

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: '#747474',
    headerColor: '#747474',
    color: '#747474',
  },
  flatButton: {
    primaryTextColor: '#747474',
  },
});

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <SocketProvider socket={socket}>
          <Component />
        </SocketProvider>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

renderApp(Routes);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(HotApp);
  });
}
