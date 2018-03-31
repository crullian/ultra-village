import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = ({items}) => (
  <ul>
    {items && items.map(item => (
      <li key={item._id}>
        <img  src={item.image} style={{width: '80px', height: 'auto'}} />
        <Link to={`/${item.artist_name.toLowerCase().replace(/[\. ,:-]+/g, "-")}`}>
          {item.artist_name}
        </Link>
      </li>
    ))}
  </ul>
);

export default ArtistList;
