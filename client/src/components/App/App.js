import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase, { auth } from '../../firebase.js';

import Header from '../Header/';
import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
import RecordPage from '../RecordPage/';
import AuthPage from '../AuthPage/';
import AboutPage from '../AboutPage/';
import ErrorPage from '../ErrorPage/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      user: null,
      users: null
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } 
    });
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();      
      this.setState({
        items: items.pages,
        users: items.users
      });
    });
  }

  componentWillReceiveProps(nextProps) {
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

  handleAuth = (user) => {
    if (user) {
      this.setState({user});
    } else {
      this.setState({user: null});
    }
  }

  render() {
    const { items, user, users } = this.state;
    // console.log('APP PROPS', this.props);
    // console.log('APP STATE', items);

    // cache page id here TODO:Fix this by using Firebase push to get a unqiue
    // object ID 'The Right Way' ;)
    const identified = items && items.map((item, i) => {
      item.id = i;
      return item;
    });

    return (
      <div className="App">
        <Header />

        {items &&
          <main className="App-panel">
            <Switch>
              <Route
                exact
                path="/auth"
                render={ props => (
                  <AuthPage
                    {...props}
                    user={ user }
                    handleAuth={this.handleAuth}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={props => (
                  <ArtistList
                    items={identified.sort(this.sortByArtistName)}
                  />
                )}
              />

              <Route
                exact
                path="/about"
                render={props => (
                  <AboutPage />
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
                      artistId={i}
                      isAdmin={!!(user && users && users[user.uid])}
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
                      <RecordPage
                        {...props}
                        isAdmin={user && users && users[user.uid]}
                        record={record}
                      />
                    )}
                  />
                ))
              ))}

              <Route path="/*" render={props => <ErrorPage />} />

            </Switch>
          </main>
        }
        {items && <footer className="App-footer center-text">- ultra village llc -</footer>}
      </div>
    );
  }
}

export default withRouter(App);
