import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';

import './ArtistPage.css';

const md = new Remarkable({breaks:true});

const ArtistPage = ({artist, match}) => (
  <div className="ArtistPage-container">
    
    <h2 className="center-text">{artist.artist_name}</h2>
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
        <div dangerouslySetInnerHTML={{ __html: md.render(artist.body) }} />
      </div>
    </div>

    <ul>
    {artist.albums.map((album, i) => {
      return (
        <li key={`${album}-${1}`}>
          <Link to={`${match.url}/${album.toLowerCase().replace(/[. ,:-]+/g, "-")}`}>
            {album}
          </Link>
        </li>
      );
    })}
    </ul>
  </div>
);

export default ArtistPage;