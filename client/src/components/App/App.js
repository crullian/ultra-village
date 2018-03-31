import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
import RecordPage from '../RecordPage/';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      items: null
    }
    this.initialFetchPages = this.initialFetchPages.bind(this);
    this.getUniqueArtistNames = this.getUniqueArtistNames.bind(this);

  }

  componentWillMount() {
    this.initialFetchPages();
  }

  initialFetchPages() {
    fetch('/api/pages').then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Network response was not ok: ${res}`);
      }
    }).then(json => {
      this.setState({
        items: json
      });
    }).catch(error => {
      console.error(`There was a problem with your fetch: ${error.message}`);
    });
  }

  getUniqueArtistNames(items) {
    const uniqueItems = [];
    items.forEach(function(item) {
      if(uniqueItems.indexOf(item['artist_name'].join(', ')) < 0) {
        uniqueItems.push(item['artist_name'].join(', '));
      }
    });
    return this.sortByArtistName(uniqueItems);
  }

  sortByArtistName = (artistNamesArr) => {
    return artistNamesArr.sort((a, b) => {
      const a_artist = a.replace('The ', '');
      const b_artist = b.replace('The ', '');
      if (a_artist < b_artist) {
        return -1;
      } else if (a_artist > b_artist) {
        return 1;
      } else {
        return 0
      }
    })
  }

  render() {
    const {items} = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Ultra Village</h1>
          </header>

          {items &&
            <main>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <ArtistList items={this.getUniqueArtistNames(items)} />
                  )}
                />

                {this.getUniqueArtistNames(items).map(item => (
                  <Route
                    exact
                    key={item.toLowerCase().replace(' ', '_')}
                    path={`/${item.toLowerCase().replace(/[\. ,:-]+/g, "-")}`}
                    render={props => (
                      <ArtistPage
                        {...props}
                        artist={item}
                        records={items.filter(record => record.artist_name.join(', ') === item)}
                      />
                    )}
                  />
                ))}

                {/*items.map(record => (
                  <Route
                    exact
                    key={record._id}
                    path={`/${record.artist_name.join(', ').toLowerCase().replace(/[\. ,:-]+/g, "-")}/${record.title.toLowerCase().replace(' ', '_')}`}
                    render={props => (
                      <RecordPage {...props} record={record} />
                    )}
                  />
                ))*/}
              </Switch>
            </main>
          }
        </div>
      </Router>
    );
  }
}

export default App;
