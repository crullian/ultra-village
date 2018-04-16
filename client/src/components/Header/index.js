import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="App-header">
      <div className="App-header-row">
        <Link
          to="/"
          className="App-header-link"
        >
          <h1 className="App-title">Ultra Village</h1>
        </Link>

        <Link
          to="/about"
          className="App-header-link"
        >
          <h4>about</h4>
        </Link>
      </div>

      {document.location.pathname !== '/' &&
        <div className="App-header-row">
          <div
            onClick={props.history.goBack}
            className="App-header-link"
          >
            <h4>&larr;</h4>
          </div>
        </div>
      }
    </header>
  )
}

export default withRouter(Header);
