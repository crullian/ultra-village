import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import ScrollToTop from './components/ScrollToTop/';
import {
  BrowserRouter as Router
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);
