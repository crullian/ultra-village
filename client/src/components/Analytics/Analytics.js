import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase.js';

const Analytics = () => {
  const history = useHistory();

  useEffect(() => {
		const { analytics } = firebase;
		const logCurrentPage = () => {
		  analytics().setCurrentScreen(window.location.pathname)
		  analytics().logEvent('screen_view')
		};
    logCurrentPage(); // log the first page visit
    history.listen(() => {
      logCurrentPage();
    });
  }, [history]);
  return null;
};

export default Analytics;