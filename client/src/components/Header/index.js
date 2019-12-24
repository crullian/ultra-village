import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        {props.location.pathname !== '/' &&
          <IconButton
            aria-label="Back"
            size="small"
            onClick={props.history.goBack}
          >
            <i className="material-icons back">
              arrow_back_ios
            </i>
          </IconButton>
        }
        {props.location.pathname === '/' &&
          <React.Fragment>
            <TextField
              autoComplete="off"
              label="Search"
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
                Sort by
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
                <option value="" />
                <option value="lastName">last name</option>
                <option value="firstName">first name</option>
                <option value="mostRecent">most recent</option>
              </Select>
            </FormControl>
          </React.Fragment>
        }
      </div>
    </header>
  )
}

export default withRouter(Header);
