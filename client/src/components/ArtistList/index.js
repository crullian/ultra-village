import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = ({items}) => (
  <ul>
    {items && items.map(item => (
      <li key={item}>
        <Link to={`/${item.toLowerCase().replace(' ', '_')}`}>
          {item}
        </Link>
      </li>
    ))}
  </ul>
);

export default ArtistList;
