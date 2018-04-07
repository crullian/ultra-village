import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import firebase from '../../firebase.js';

import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
// import RecordPage from '../RecordPage/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    }
    // this.initialFetchPages = this.initialFetchPages.bind(this);
    // this.getUniqueArtistNames = this.getUniqueArtistNames.bind(this);
  }

  componentWillMount() {
    console.log('MOUNTING');
    // this.initialFetchPages();
    const itemsRef = firebase.database().ref('/pages');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();      
      this.setState({
        items: items
      });
    });
  }

  // initialFetchPages() {
  //   fetch('/api/pages').then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       console.error(`Network response was not ok: ${res}`);
  //     }
  //   }).then(json => {
  //     this.setState({
  //       items: json
  //     });
  //   }).catch(error => {
  //     console.error(`There was a problem with your fetch: ${error.message}`);
  //   });
  // }

  // getUniqueArtistNames(items) {
  //   const uniqueItems = [];
  //   items.forEach(function(item) {
  //     if(uniqueItems.indexOf(item['artist_name'].join(', ')) < 0) {
  //       uniqueItems.push(item['artist_name'].join(', '));
  //     }
  //   });
  //   return this.sortByArtistName(uniqueItems);
  // }

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
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Ultra Village</h1>
          </header>

          {items &&
            <main className="App-panel">
              <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <ArtistList items={items.sort(this.sortByArtistName)} />
                  )}
                />

                {items.map(item => (
                  <Route
                    exact
                    key={item._id}
                    path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                    render={props => (
                      <ArtistPage
                        {...props}
                        artist={item}
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

          <footer className="App-footer center-text">- ultra village llc -</footer>
        </div>
      </Router>
    );
  }
}

export default App;
