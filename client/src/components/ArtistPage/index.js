import React from 'react';
// import { Link } from 'react-router-dom';

import './ArtistPage.css';

const ArtistPage = ({artist, match}) => (
  <div className="ArtistPage-container">
    <h3 className="center-text">{artist.artist_name}</h3>
    
    <div className="ArtistPage-content">
      {artist.image &&
        <img
          alt="artist"
          src={artist.image}
          className="ArtistPage-img"
          width="300"
        />
      }

      <div className="ArtistPage-review">
        <p>{artist.body}</p>
      </div>
    </div>

    <ul>
    {artist.albums.map(album => {
      return (
        <li key={album}>
          {/*<Link to={`${match.url}/${album.toLowerCase().replace(' ', '_')}`}>*/}
            {album}
          {/*</Link>*/}
        </li>
      );
    })}
    </ul>
  </div>
);

export default ArtistPage;