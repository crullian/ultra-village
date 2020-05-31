import React, { useEffect, useReducer } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from '../../firebase.js';

import handleSortByMethod from '../sortFunctions';

import useAuth from '../../hooks/useAuth';

import Header from '../Header/';
import ArtistList from '../ArtistList/';
import ArtistPage from '../ArtistPage/';
import ListsPage from '../ListsPage';
import RecordPage from '../RecordPage/';
import AuthPage from '../AuthPage/';
import AboutPage from '../AboutPage/';
import ErrorPage from '../ErrorPage/';
import Loader from '../Loader/';

import './App.css';

const App = () => {
  const user = useAuth();

  const initialState = {
    items: [],
    about: '',
    lists: [],
    filterTerm: '',
    sortByTerm: '',
    isLoading: true
  }
  const stateReducer = (state, newState) => ({...state, ...newState});
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      window.pages = items.pages;
      dispatch({
        items: items.pages,
        lists: items.lists,
        about: items.about,
        isLoading: false
      });
    });
  }, []);

  const { isLoading, items, lists, about, filterTerm, sortByTerm } = state;

  const handleSearch = term => dispatch({filterTerm: term.toLowerCase()});

  const setSortByMethod = term => dispatch({sortByTerm: term});

  const featuredList = lists && lists.find(list => list.featured_list);
  
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
                user={user}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={props => (
              <ArtistList
                filterTerm={filterTerm}
                items={handleSortByMethod(items, sortByTerm)}
                featuredList={featuredList}
              />
            )}
          />

          <Route
            exact
            path="/about"
            render={props => (
              <AboutPage
                {...props}
                content={about}
              />
            )}
          />

          <Route
            exact
            path="/lists"
            component={ListsPage}
          />

          {items.map((item, i) => {
            return (
              <Route
                key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`}
                exact
                path={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
                render={props => (
                  <ArtistPage
                    {...props}
                    artistId={i}
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
        searchTerm={filterTerm}
        handleSearch={handleSearch}
        sortBy={sortByTerm}
        sortByMethod={setSortByMethod}
      />
      { main }
      <footer className={`App-footer ${isLoading ? 'hide' : ''} center-text`}></footer>
    </div>
  );
}

export default withRouter(App);
