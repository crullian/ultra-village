import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase, { auth } from '../../firebase.js';

import Header from '../Header/';
import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
// import RecordPage from '../RecordPage/';
import AuthPage from '../AuthPage/';
import AboutPage from '../AboutPage/';
import ErrorPage from '../ErrorPage/';
import Loader from '../Loader/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      user: null,
      users: null,
      scrolled: false,
      filterTerm: '',
      isLoading: true
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();      
      this.setState({
        items: items.pages,
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

  componentDidUpdate() { 
    if ('scrollRestoration' in window.history) { 
      window.history.scrollRestoration = 'manual'; 
    }  
    window.onscroll = () => this.handleScroll();
  }

  handleScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
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

  handleSearch = (term) => {
    this.setState({filterTerm: term});
  }

  render() {
    const { items, user, users, scrolled, isLoading } = this.state;

    // cache page id here TODO:Fix this by using Firebase push to get a unqiue
    // object ID 'The Right Way' ;)
    let identified = items && items.map((item, i) => {
      item.id = i;
      return item;
    });

    if (this.state.filterTerm) {
      identified = identified.filter((item) => {
        let searchString = this.state.filterTerm.toLowerCase().trim();
        let strTofind = item.artist_name.toLowerCase();
        return strTofind.indexOf(searchString) !== -1;
      })
    }

    return (
      <div className="App">
        <Header
          searchTerm={this.state.filterTerm}
          isScrolled={scrolled}
          handleSearch={this.handleSearch}
        />
        {isLoading && <Loader />}
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
                  <AboutPage
                    {...props}
                    content={this.state.about} 
                    user={user && users[user.uid]}
                  />
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
                      user={user && users[user.uid]}
                      artist={item}
                    />
                  )}
                />
              ))}

              {/*items.map(item => (
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
              ))*/}
              <Redirect to="/" />
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
