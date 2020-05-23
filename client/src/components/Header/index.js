import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Header.css';

const Header = (props) => {
  const handleChange = (e) => {
    props.handleSearch(e.target.value);
  }

  const handleUpdateSortMethod = (e) => {
    props.sortByMethod(e.target.value);
  }

  return (
    <header className="App-header">
      <div className="App-header-row">
        <Link
          to="/"
          className="App-header-link"
        >
          <h1 className="App-title">Ultravillage</h1>
        </Link>
        <Link
          to="/lists"
          className="App-header-link"
        >
          <h4>lists</h4>
        </Link>
        <Link
          to="/about"
          className="App-header-link"
        >
          <h4>about</h4>
        </Link>
      </div>
      <div className="App-header-row toolbar">
        {props.location.pathname !== '/' &&
          <IconButton
            aria-label="Back"
            onClick={props.history.goBack}
          >
            <ArrowBackIosIcon className="back" />
          </IconButton>
        }
        {props.location.pathname === '/' &&
          <React.Fragment>
            <TextField
              autoComplete="off"
              label="Filter"
              id="searchField"
              value={props.searchTerm}
              onChange={handleChange}
            />
            <FormControl>
              <InputLabel
                classes={{
                  root: 'input-label-root'
                }} 
                htmlFor="age-native-simple"
              >
                Sort By
              </InputLabel>
              <Select
                native
                id="sortField"
                value={props.sortBy}
                onChange={handleUpdateSortMethod}
                inputProps={{
                  name: 'sortby',
                  id: 'age-native-simple',
                }}
              >
                <option style={{display: 'none'}} value="" />
                <option value="mostRecent">Most Recent</option>
                <option value="lastName">Last Name</option>
                <option value="firstName">First Name</option>
              </Select>
            </FormControl>
          </React.Fragment>
        }
      </div>
    </header>
  )
}

export default withRouter(Header);
