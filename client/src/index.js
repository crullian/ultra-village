import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
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
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
