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
    items: null,
    about: '',
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
      let items = snapshot.val();
      window.pages = items;
      // .reduce((acc, curr) => {
      //   acc[curr.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")] = curr;
      //   return acc;
      // }, {});
      setState({
        items: items.pages,
        lists: Object.values(items.lists),
        about: items.about,
        isLoading: false
      });
    });
  }, []);

  const { isLoading, items, lists, about, filterTerm, sortByTerm } = state;

  const handleSearch = term => setState({filterTerm: term.toLowerCase()});

  const setSortByMethod = term => setState({sortByTerm: term});

  const kababCase = str => str.toLowerCase().replace(/[. ,:-]+/g, "-");

  const featuredList = lists.find(list => list.featured);

  console.log('ITEMS', items)

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
                item.albums.map(thing =>
                  thing.albums.map((album, j) => (
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
