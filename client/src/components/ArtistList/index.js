import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingCard from '../LoadingCard';

import FeaturedArtistCard from '../FeaturedArtistCard';
import FeaturedListCard from '../FeaturedListCard';
import ArtistCard from '../ArtistCard';

import './ArtistList.css'

const ArtistList = ({ items, featuredList, filterTerm }) => {
  useEffect(() => {
    document.title = 'Ultravillage';
  }, [])

  const featured = (() => items.find(item => item.featured))();

  const filteredOutFeaturedItems = (() => items.filter(item => !item.featured))();

  return (
    <div className="ArtistList-flex-container">
      {featuredList && !filterTerm &&(
        <FeaturedListCard featuredList={featuredList} />
      )}
      {featured && !filterTerm && (
        <FeaturedArtistCard featuredArtist={featured} />
      )}

      {filteredOutFeaturedItems &&
        filteredOutFeaturedItems.filter(item =>
          item.artist_name.toLowerCase().indexOf(filterTerm) !== -1).map((item, i) => (
            <LazyLoad key={i} height={110} offset={100} placeholder={<LoadingCard />}>
              <ArtistCard key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`} item={item} />
            </LazyLoad>
          )
        )
      }
    </div>
  );
};

export default ArtistList;
