import React, { Component } from 'react';
import {
  Link,
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

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      user: null,
      users: null,
      filterTerm: '',
      isLoading: true
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        items: Object.values(items.pages),
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

  handleClick = () => {
    const itemsRef = firebase.database().ref('/pages/');
    itemsRef.push({
      artist_name: 'stuff',
      albums: [],
      body: 'Nice body',
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }, (thing) => {
      console.log('WTF', thing)
    })
  }

  render() {
    const { items, user, users, isLoading } = this.state;

    console.log('STATE ITEMS', items)

    // cache page id here TODO:Fix this by using Firebase push to get a unqiue
    // object ID 'The Right Way' ;)
    let identified = items && items.map((item, i) => {
      if (!item.id) {
        item.id = i;
      }
      return item;
    });

    let featured = identified && identified.filter((item) => {
      return item.featured
    })

    if (this.state.filterTerm) {
      identified = identified.filter((item) => {
        let searchString = this.state.filterTerm.toLowerCase().trim();
        let strTofind = item.artist_name.toLowerCase();
        return strTofind.indexOf(searchString) !== -1;
      })
    }

    console.log('FEATURED', featured)

    const main = isLoading
    ? <Loader />
    : <main className="App-panel">
            
            
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
                  <div>
                  {featured &&
                    <div style={{padding: '32px 8px'}}>
                      <h3>Featured Artist</h3>

                      <Link
                        to={`/${featured[0].artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                      >
                        <CardHeader
                          avatar={
                              <img
                                alt="artist"
                                src={featured[0].image}
                                className="ArtistPage-img"
                                width="60"
                              />
                          }
                          title={<h2>{featured[0].artist_name}</h2>}
                          subheader={<Typography component="p">{featured[0].body.split('.')[0]}.</Typography>}
                        />
                      </Link>
                    </div>
                  }
                  <ArtistList
                    items={identified.sort(this.sortByArtistName)}
                  />
                  </div>
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
          </main>;

    return (
      <div className="App">
        <Header
          searchTerm={this.state.filterTerm}
          handleSearch={this.handleSearch}
        />
        { main }
        <footer className={`App-footer ${isLoading ? 'hide' : ''} center-text`}></footer>
      </div>
    );
  }
}

export default withRouter(App);
