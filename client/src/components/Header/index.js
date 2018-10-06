import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

class Header extends Component {

  handleChange = (e) => {
    this.props.handleSearch(e.target.value);
  }

  render() {
    return (
      <header className="App-header">
        <div className="App-header-row">
          <div style={{display: 'flex'}}>
            <Link
              to="/"
              className="App-header-link"
            >
              <h1 className="App-title">Ultravillage</h1>
            </Link>
          </div>

          <Link
            to="/about"
            className="App-header-link"
          >
            <h4>about</h4>
          </Link>
        </div>
        <div className="App-header-row toolbar">
          {this.props.location.pathname !== '/' &&
            <IconButton
              aria-label="Back"
              onClick={this.props.history.goBack}
            >
              <i className="material-icons back">
                arrow_back_ios
              </i>
            </IconButton>
          }
          {this.props.location.pathname === '/' &&
            <TextField
              classes={{
                root: 'classes-state-root'
              }}
              placeholder="Search..."
              style={{color: '#fff', marginLeft: 'auto'}}
              id="searchField"
              value={this.props.searchTerm}
              onChange={this.handleChange}
            />
          }
        </div>
      </header>
    )
  }
}

export default withRouter(Header);
