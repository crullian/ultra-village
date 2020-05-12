import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import ContentLoader from "react-content-loader";

import FeaturedArtistCard from '../FeaturedArtistCard';
import ArtistCard from '../ArtistCard';

import './ArtistList.css'

const loadingCard = (
  <div className="ArtistList-item-container">
    <ContentLoader
      speed={2}
      width={380}
      height={110}
      viewBox="0 0 380 110"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="16" y="16" rx="3" ry="3" width="130" height="16" />
      <rect x="280" y="10" rx="0" ry="0" width="90" height="90" />
    </ContentLoader>
  </div>
);

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
          <LazyLoad key={i} height={110} offset={100} placeholder={loadingCard}>
            <ArtistCard key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`} item={item} />
          </LazyLoad>
        );
      })}
    </div>
  );
};

export default ArtistList;
