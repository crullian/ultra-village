import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header
      className="App-header"
      style={props.isScrolled
        ? {
            zIndex: '10',
            height: '70px',
            boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)'
          }
        : null
      }
    >
      <div className="App-header-row">
        <div style={{display: 'flex'}}>
          <Link
            to="/"
            className="App-header-link"
          >
            <h1 className="App-title" style={ props.isScrolled ? {
              fontSize: '1.25em'
            } : null}>Ultra Village</h1>
          </Link>
        </div>

        <Link
          to="/about"
          className="App-header-link"
        >
          <h4>about</h4>
        </Link>
      </div>
      <div className="App-header-row">
        {document.location.pathname !== '/' &&
          <div
            onClick={props.history.goBack}
            className="App-header-link"
            style={{display: 'flex'}}
          >
            <h4>&larr;</h4>
            {/*<h4>{document.location.pathname}</h4>*/}
          </div>
        }
      </div>
    </header>
  )
}

export default withRouter(Header);
