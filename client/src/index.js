import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store'; 
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './components/App/App';
import ScrollToTop from './components/ScrollToTop/';
import {
  BrowserRouter as Router
} from 'react-router-dom';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Google Sans'
  },
  palette: {
    brandBlue: 'rgb(14, 97, 253)'
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 380,
      md: 792,
      lg: 1475,
      xl: 1920,
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
