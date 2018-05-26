import React from 'react';
import { auth, provider } from '../../firebase.js';

import './AuthPage.css'

class AuthPage extends React.Component {

  handleSignInClick = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.handleAuth(user);
      this.props.history.push('/');
    }).catch((err) => {
      console.error('Error :_(', err);
    });
  }

  handleSignOutClick = () => {
    auth.signOut().then(() => {
      this.props.handleAuth(null);
    });
  }

  capitalizeName = (fullName) => {
    return fullName.split(' ').map(name => {
      return name.charAt(0).toUpperCase() + name.substr(1);
    }).join(' ');
  }

  render() {
    const { user } = this.props;

    return (
      <div className="AuthPage-container">
      {user ?
        (
          <div>
            <h3 className="center-text">You are signed in as:</h3>
            <div className="AuthPage-user-container">
              <img alt="" className="AuthPage-user-photo" src={user.photoURL} />
              <div className="AuthPage-user-info">
                <h4>{this.capitalizeName(user.displayName)}</h4>
                <p>{user.email}</p>
              </div>
            </div>
            <br />
            <button
              className="AuthPage-button"
              onClick={ this.handleSignOutClick }
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
              onClick={ this.handleSignInClick }
            >
              Sign In
            </button>
          </div>
        )
      }
      </div>
    );
  }
};

export default AuthPage;
