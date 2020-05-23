import React, { useState, useEffect } from 'react';
import Remarkable from 'remarkable';
import EditToggle from '../EditToggle';

import firebase from '../../firebase.js';
import useAuth from '../../hooks/useAuth';

import './AboutPage.css';

const md = new Remarkable({breaks:true});

const AboutPage = ({ userIsAdmin, content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleUpdateContent = e => firebase.database().ref('/').update({about: e.target.value});

  return (
    <div className="AboutPage-container">
      <EditToggle show={userIsAdmin} isEditing={isEditing} toggleHandler={toggleEditMode} />
      {isEditing ?
        <textarea
          id="Page-markdown-content"
          className="ArtistPage-review"
          onChange={handleUpdateContent}
          onBlur={toggleEditMode}
          defaultValue={content}
        />
        :
        <div
          onClick={toggleEditMode}
          dangerouslySetInnerHTML={{ __html: md.render(content) }}
        />
      }
    </div>
  );
};

export default AboutPage;