import React, { useEffect } from 'react';
import EditableContent from '../EditableContent';

import firebase from '../../firebase.js';

import './AboutPage.css';

const AboutPage = ({ userIsAdmin, content }) => {
  useEffect(() => {
    document.title = `Ultravillage | about`;
  });

  const handleUpdateContent = e => firebase.database().ref('/').update({about: e.target.value});

  return (
    <div className="AboutPage-container">
      <EditableContent
        userIsAdmin={userIsAdmin}
        changeHandler={handleUpdateContent}
        content={content}
      />
    </div>
  );
};

export default AboutPage;