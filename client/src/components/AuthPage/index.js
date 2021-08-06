import React from 'react';
import { useHistory } from "react-router-dom";
import { auth, provider } from '../../firebase.js';

import './AuthPage.css'

const AuthPage = ({ user }) => {
  const history = useHistory();

  async function handleSignInClick() {
    try {
      await auth.signInWithPopup(provider)
      history.push('/');
    } catch (err){
      console.error('Error :_(', err);
    };
  }

  function handleSignOutClick() {
    auth.signOut();
  }

  function capitalizeName(fullName) {
    return fullName.split(' ').map(name => {
      return name.charAt(0).toUpperCase() + name.substr(1);
    }).join(' ');
  }

  return (
    <div className="AuthPage-container">
    {user ?
      (
        <div>
          <h3 className="center-text">You are signed in as:</h3>
          <div className="AuthPage-user-container">
            <img alt="" className="AuthPage-user-photo" src={user.photoURL} />
            <div className="AuthPage-user-info">
              <h4>{capitalizeName(user.displayName)}</h4>
              <p>{user.email}</p>
            </div>
          </div>
          <br />
          <button
            className="AuthPage-button"
            onClick={ handleSignOutClick }
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h3 className="center-text">Sign in with your Google Account</h3>
          <br />
          <button
            className="AuthPage-button"
            onClick={ handleSignInClick }
          >
            Sign In
          </button>
        </div>
      )
    }
    </div>
  );
};

export default AuthPage;
