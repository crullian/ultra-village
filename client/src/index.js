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
// import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

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

export default function Main() {

  const history = createBrowserHistory();

  // Initialize google analytics page view tracking
  // history.listen(location => {
  //   console.log('Listening')
  //   ReactGA.initialize(process.env.REACT_APP_GA_ID);
  //   ReactGA.set({ page: location.pathname }); // Update the user's current page
  //   ReactGA.pageview(location.pathname); // Record a pageview for the given page
  // });

  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
