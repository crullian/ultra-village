import React from 'react';

import './ErrorPage.css';

const ErrorPage = () => (
  <div className="ErrorPage-container">
    <h2 className="center-text">404! This is not a page</h2>
    <img className="ErrorPage-img" alt="not a pipe" src="https://firebasestorage.googleapis.com/v0/b/api-project-464300049727.appspot.com/o/magritte_404.jpg?alt=media&token=127891f9-1820-4211-9811-212792cb00e0" />
  </div>
);

export default ErrorPage;