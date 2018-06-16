import React from 'react';
import { Link } from 'react-router-dom';

import HomeCard from '../HomeCard';

import './ArtistList.css'

class ArtistList extends React.Component {

  render() {
    const { items } = this.props;

    return (
      <div className="ArtistList-flex-container">
        {items && items.map((item, i) => (
          <Link
            to={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
            key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`}
            className="ArtistList-item-container"
           >
            <HomeCard item={item} />
          </Link>
        ))}
      </div>
    );
  }
}

export default ArtistList;
