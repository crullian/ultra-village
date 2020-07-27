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
import ListPage from '../ListPage';
import RecordPage from '../RecordPage/';
import AuthPage from '../AuthPage/';
import AboutPage from '../AboutPage/';
import ErrorPage from '../ErrorPage/';
import Loader from '../Loader/';

import './App.css';

const App = () => {
  const user = useAuth();

  const initialState = {
    about: '',
    items: null,
    lists: [],
    filterTerm: '',
    sortByTerm: '',
    isLoading: true
  }
  const stateReducer = (state, newState) => ({...state, ...newState});
  const [state, setState] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', snapshot => {
      let db = snapshot.val();
      window.pages = db;
      // .reduce((acc, curr) => {
      //   acc[curr.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")] = curr;
      //   return acc;
      // }, {});
      // console.log('ENTRIES', Object.entries(db.lists).map(entry => ({...entry[1], ...{id: entry[0]}})));
      setState({
        about: db.about,
        items: massageEntries(db.artists), //db.pages,
        lists: massageEntries(db.lists),
        isLoading: false
      });
    });
  }, []);

  const massageEntries = entries =>
    Object.entries(entries).map(entry => ({...entry[1], ...{id: entry[0]}}));

  const { isLoading, items, lists, about, filterTerm, sortByTerm } = state;

  const handleSearch = term => setState({filterTerm: term.toLowerCase()});

  const setSortByMethod = term => setState({sortByTerm: term});

  const kababCase = str => str.toLowerCase().replace(/[. ,:-]+/g, "-");

  const featuredList = lists.find(list => list.featured);

  return (
    <div className="App">
      <Header
        searchTerm={filterTerm}
        handleSearch={handleSearch}
        sortBy={sortByTerm}
        sortByMethod={setSortByMethod}
      />
      {
        isLoading
        ? (
          <Loader />
        ) : (
          <main className="App-panel">   
            <Switch>
              <Route exact path="/auth">
                <AuthPage
                  user={user}
                />
              </Route>

              <Route exact path="/">
                <ArtistList
                  filterTerm={filterTerm}
                  items={handleSortByMethod(items, sortByTerm)}
                  featuredList={featuredList}
                />
              </Route>

              <Route exact path="/about">
                <AboutPage
                  content={about}
                />
              </Route>

              <Route exact path="/lists">
                <ListsPage lists={lists} />
              </Route>

              {lists.map((list, i) => (
                <Route
                  exact
                  key={`${kababCase(list.title)}-${i}`}
                  path={`/${kababCase(list.title)}`}
                >
                  <ListPage
                    list={list}
                  />
                </Route>
              ))}

              {items.map((item, i) => (
                <Route
                  exact
                  key={`${kababCase(item.artist_name)}-${i}`}
                  path={`/${kababCase(item.artist_name)}`}
                >
                  <ArtistPage
                    artistId={item.entry_number -1}
                    artist={item}
                  />
                </Route>
              ))}

              {items.map(item =>
                item.discograpy && Object.values(item.discograpy).map(thing =>
                  thing.albums && Object.values(thing.albums).map((album, j) => (
                    <Route
                      exact
                      key={`${kababCase(album.title)}-${j}`}
                      path={`/${kababCase(item.artist_name)}/${kababCase(album.title)}`}
                    >
                      <RecordPage
                        record={album}
                      />
                    </Route>
                  ))
                )
              )}

              <Redirect to="/" />
              <Route path="/*">
                <ErrorPage />
              </Route>
            </Switch>
          </main>
        )
      }
      <footer className={`App-footer ${isLoading ? 'hide' : ''} center-text`}></footer>
    </div>
  );
}

export default withRouter(App);
