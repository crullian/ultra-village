import { useEffect, useState } from 'react';
import { auth } from '../firebase.js';

export default () => {
  const fireUser = auth.currentUser;
  const [user, setUser] = useState(fireUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsub();
    };
  });
  return user;
};