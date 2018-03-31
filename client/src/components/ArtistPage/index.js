import React from 'react';
import { Link } from 'react-router-dom';

const ArtistPage = ({artist, match}) => (
  <div>
    <h3>{artist.artist_name}'s Page</h3>
    
    {artist.image &&
      <img src={artist.image} style={{width: '300px'}} />
    }

    <p>{artist.body}</p>

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