import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Input from '@material-ui/core/Input';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';

class Header extends Component {
  state = {
    searchTerm: ''
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    console.log('Header Props', this.props);
    return (
      <header
        className="App-header"
        style={this.props.isScrolled
          ? {
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
              <h1 className="App-title">Ultra Village</h1>
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
              style={{width: 30}}
              onClick={this.props.history.goBack}
            >
              <i className="material-icons back">
                arrow_back_ios
              </i>
            </IconButton>
          }
          <TextField
            classes={{
              root: 'classes-state-root',
              hover: 'hover'
            }}
            placeholder="Search..."
            style={{color: '#fff', marginLeft: 'auto'}}
            id="searchField"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
        </div>
      </header>
    )
  }
}

export default withRouter(Header);
