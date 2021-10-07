import { useEffect, useState } from 'react';
import { auth, registeredEmails } from '../firebase.js';

export default () => {
  const fireUser = auth.currentUser;
  const [user, setUser] = useState(fireUser);


  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      user && registeredEmails.indexOf(user.email) > -1 ? setUser(user) : setUser(null);
    });
    return () => {
      unsub();
    };
  });
  return user;
};