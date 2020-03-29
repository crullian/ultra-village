import React, { useEffect } from 'react';

import FeaturedArtistCard from '../FeaturedArtistCard';
import ArtistCard from '../ArtistCard';

import './ArtistList.css'

const ArtistList = ({ items }) => {
  useEffect(() => {
    document.title = 'Ultravillage';
  }, [])

  const featured = (() => {
    return items && items.filter((item) => {
      return item.featured;
    });
  })();

  const filteredOutFeaturedItems = (() => {
    return items && items.filter(item => !item.featured);
  })();

  return (
    <div className="ArtistList-flex-container">
      {featured && featured.length > 0 &&
        <FeaturedArtistCard featuredArtist={featured[0]} />
      }

      {filteredOutFeaturedItems && filteredOutFeaturedItems.map((item, i) => {
        return (
          <ArtistCard key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`} item={item} />
        );
      })}
    </div>
  );
};

export default ArtistList;
