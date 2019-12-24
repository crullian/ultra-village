import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase, { auth } from '../../firebase.js';
import values from 'object.values';

import Header from '../Header/';
import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
import RecordPage from '../RecordPage/';
import AuthPage from '../AuthPage/';
import AboutPage from '../AboutPage/';
import ErrorPage from '../ErrorPage/';
import Loader from '../Loader/';

import './App.css';

class App extends Component {
  state = {
    items: null,
    user: null,
    users: null,
    filterTerm: '',
    sortByTerm: '',
    isLoading: true
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        items: values(items.pages),
        users: items.users,
        about: items.about,
        isLoading: false
      },
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user});
          } 
        })
      );
    });
  }

  sortByFirstName = (a, b) => {
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

  sortByLastName = (a, b) => {
    const a_artist = a.artist_name.replace('The ', '').split(' ').pop();
    const b_artist = b.artist_name.replace('The ', '').split(' ').pop();
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    } else {
      return 0
    }
  }

  handleSortByMethod = (identified) => {
    if (this.state.sortByTerm === '' || this.state.sortByTerm === 'firstName') {
      return identified.sort(this.sortByFirstName);
    }
    if (this.state.sortByTerm === 'lastName') {
      return identified.sort(this.sortByLastName);
    }
    if (this.state.sortByTerm === 'mostRecent') {
      return identified.reverse();
    }
    console.log('other')
  }

  handleAuth = (user) => {
    if (user) {
      this.setState({user});
    } else {
      this.setState({user: null});
    }
  }

  handleSearch = (term) => {
    this.setState({filterTerm: term});
  }

  setSortByMethod = (term) => {
    this.setState({sortByTerm: term});
  }

  // handleClick = () => {
  //   const itemsRef = firebase.database().ref('/pages/');
  //   itemsRef.push({
  //     artist_name: 'Artist',
  //     albums: [],
  //     body: 'Content',
  //     createdAt: firebase.database.ServerValue.TIMESTAMP
  //   }, (thing) => {
  //     console.log('WTF', thing)
  //   })
  // }

  render() {
    const { items, user, users, isLoading } = this.state;
    // console.log('%cRENDERING', 'color:#BADA55;font-size:14px;', items);
    // cache page id here TODO:Fix this by using Firebase push to get a unqiue
    // object ID 'The Right Way' ;)
    let identified = items && items.map((item, i) => {
      if (!item.id) {
        item.id = i;
      }
      return item;
    });

    if (this.state.filterTerm) {
      identified = identified.filter((item) => {
        let searchString = this.state.filterTerm.toLowerCase().trim();
        let strTofind = item.artist_name.toLowerCase();
        return strTofind.indexOf(searchString) !== -1;
      })
    }

    const main = isLoading
    ? <Loader />
    : (
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
                  items={this.handleSortByMethod(identified)}
                />
              )}
            />

            <Route
              exact
              path="/about"
              render={props => (
                <AboutPage
                  {...props}
                  content={this.state.about} 
                  user={user && users[user.uid]}
                />
              )}
            />

            {items.map((item, i) => {
              return (
                <Route
                  key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${1}`}
                  exact
                  path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                  render={props => (
                    <ArtistPage
                      {...props}
                      artistId={i}
                      user={user && users[user.uid]}
                      artist={item}
                    />
                  )}
                />
              )
            })}

            {items.map(item => (
              item.albums.map((item, i) => {
                return item.albums.map((album, i) => {
                  return (
                    <Route
                      key={`${album.title}-${i}`}
                      exact
                      path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}/${album.title.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                      render={props => (
                        <RecordPage
                          {...props}
                          isAdmin={user && users && users[user.uid]}
                          record={album}
                        />
                      )}
                    />
                  )
                })
              })
            ))}

            <Redirect to="/" />
            <Route path="/*" render={props => <ErrorPage />} />
          </Switch>
        </main>
      );

    return (
      <div className="App">
        <Header
          searchTerm={this.state.filterTerm}
          handleSearch={this.handleSearch}
          sortBy={this.state.sortByTerm}
          sortByMethod={this.setSortByMethod}
        />
        { main }
        <footer className={`App-footer ${isLoading ? 'hide' : ''} center-text`}></footer>
      </div>
    );
  }
}

export default withRouter(App);
