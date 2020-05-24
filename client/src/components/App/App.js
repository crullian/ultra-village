import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from '../../firebase.js';
import values from 'object.values';

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
  const [items, setItems] = useState(null);
  const [about, setAbout] = useState(null);
  const [users, setUsers] = useState(null);
  const [lists, setLists] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [sortByTerm, setSortByTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const itemsRef = firebase.database().ref('/');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      window.pages = items.pages;
      setItems(values(items.pages).map((item, i) => {
        // assign page id
        if (!item.id) {
          item.id = i;
        }
        return item;
      }));
      setLists(items.lists);
      setUsers(items.users);
      setAbout(items.about);
      setIsLoading(false);
    });
  }, []);

  const handleSearch = term => setFilterTerm(term.toLowerCase());

  const setSortByMethod = term => setSortByTerm(term);

  let identified = items;

  if (filterTerm && identified) {
    identified = identified.filter((item) => {
      let searchString = filterTerm;
      let strTofind = item.artist_name.toLowerCase();
      return strTofind.indexOf(searchString) !== -1;
    })
  }
  const featuredList = lists && lists.find(list => list.featured_list);
  const isAdmin = user && users && users[user.uid].isAdmin;
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
                items={handleSortByMethod(identified, sortByTerm)}
                featuredList={filterTerm ? null : featuredList}
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
                userIsAdmin={isAdmin}
              />
            )}
          />

          <Route
            exact
            path="/lists"
            render={props => (
              <ListsPage
                {...props}
                userIsAdmin={isAdmin}
                lists={lists}
              />
            )}
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
                    userIsAdmin={isAdmin}
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
