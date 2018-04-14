import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import firebase from '../../firebase.js';

import Header from '../Header/';
import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
import RecordPage from '../RecordPage/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    }
  }

  componentWillMount() {
    const itemsRef = firebase.database().ref('/pages');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();      
      this.setState({
        items: items
      });
    });
  }

  componentDidUpdate() {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  sortByArtistName = (a, b) => {
    const a_artist = a.artist_name.replace('The ', '');
    const b_artist = b.artist_name.replace('The ', '');
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    } else {
      return 0
    }
  }

  render() {
    const {items} = this.state;

    return (
      <div className="App">
        <Header />

        {items &&
          <main className="App-panel">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ArtistList items={items.sort(this.sortByArtistName)} />
                )}
              />

              {items.map((item, i) => (
                <Route
                  key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${1}`}
                  exact
                  path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                  render={props => (
                    <ArtistPage
                      {...props}
                      artist={item}
                    />
                  )}
                />
              ))}

              {items.map(item => (
                item.albums.map((record, i) => (
                  <Route
                    key={`${record}-${i}`}
                    exact
                    path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}/${record.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                    render={props => (
                      <RecordPage {...props} record={record} />
                    )}
                  />
                ))
              ))}

            </Switch>
          </main>
        }
        {items && <footer className="App-footer center-text">- ultra village llc -</footer>}
      </div>
    );
  }
}

export default App;
