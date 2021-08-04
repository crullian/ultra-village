import React, { useEffect, useReducer } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from '../../firebase.js';

import { useGetArtistListQuery, useGetPokemonByNameQuery } from '../../services/artist'

import { handleSortByMethod } from '../sortFunctions';

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
    filterTerm: '',
    sortByTerm: '',
  }
  const { data, isLoading, error } = useGetArtistListQuery();

  const stateReducer = (state, newState) => ({...state, ...newState});
  const [state, setState] = useReducer(stateReducer, initialState);

  const massageEntries = entries =>
    Object.entries(entries).map(entry => ({...entry[1], ...{id: entry[0]}}));

  const { filterTerm, sortByTerm } = state;

  const handleSearch = term => setState({filterTerm: term.toLowerCase()});

  const setSortByMethod = term => setState({sortByTerm: term});

  const kababCase = str => str.toLowerCase().replace(/[. ,:-]+/g, "-");

  return (
    <div className="App">
      <Header
        searchTerm={filterTerm}
        handleSearch={handleSearch}
        sortBy={sortByTerm}
        sortByMethod={setSortByMethod}
      />
      {
        isLoading && !data
        ? (
          <Loader />
        ) : (
          data && <main className="App-panel">   
            <Switch>
              <Route exact path="/auth">
                <AuthPage
                  user={user}
                />
              </Route>

              <Route exact path="/">
                <ArtistList
                  filterTerm={filterTerm}
                  items={data.items ? handleSortByMethod(data.items, sortByTerm) : []}
                  featuredList={data.lists.find(list => list.featured)}
                />
              </Route>

              <Route exact path="/about">
                <AboutPage
                  content={data.about}
                />
              </Route>

              <Route exact path="/lists">
                <ListsPage lists={data.lists} />
              </Route>

              {data.lists.map((list, i) => (
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

              {data.items.map((item, i) => (
                <Route
                  exact
                  key={`${kababCase(item.artist_name)}-${i}`}
                  path={`/${kababCase(item.artist_name)}`}
                >
                  <ArtistPage
                    artist={item}
                  />
                </Route>
              ))}

              {data.items.map(item =>
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
    </div>
  );
}

export default withRouter(App);
