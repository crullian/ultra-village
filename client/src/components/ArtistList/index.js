import React from 'react';
import { Link } from 'react-router-dom';

import './ArtistList.css'

const ArtistList = ({items}) => (
  <div className="ArtistList-flex-container">
    {items && items.map((item, i) => (
      <Link
        to={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
        key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`}
        className="ArtistList-item-container"
       >
        <img alt="artist" src={item.image} className="ArtistList-item-image" />
        <div className="ArtistList-item-name center-text">
          <h3>{item.artist_name}</h3>
        </div>
      </Link>
    ))}
  </div>
);

export default ArtistList;
