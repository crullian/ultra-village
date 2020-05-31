import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingCard from '../LoadingCard';

import FeaturedArtistCard from '../FeaturedArtistCard';
import FeaturedListCard from '../FeaturedListCard';
import ArtistCard from '../ArtistCard';

import './ArtistList.css'

const ArtistList = ({ items, featuredList }) => {
  useEffect(() => {
    document.title = 'Ultravillage';
  }, [])

  const featured = (() => items && items.find(item => item.featured))();

  const filteredOutFeaturedItems = (() => items && items.filter(item => !item.featured))();

  return (
    <div className="ArtistList-flex-container">
      {featuredList && (
        <FeaturedListCard featuredList={featuredList} />
      )}
      {featured && (
        <FeaturedArtistCard featuredArtist={featured} />
      )}

      {filteredOutFeaturedItems && filteredOutFeaturedItems.map((item, i) => {
        return (
          <LazyLoad key={i} height={110} offset={100} placeholder={<LoadingCard />}>
            <ArtistCard key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`} item={item} />
          </LazyLoad>
        );
      })}
    </div>
  );
};

export default ArtistList;
