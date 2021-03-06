import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';

import LoadingCard from '../LoadingCard';
import FeaturedCard from '../FeaturedCard';
import ArtistCard from '../ArtistCard';

import './ArtistList.css'

const ArtistList = ({ items, featuredList, filterTerm }) => {
  useEffect(() => {
    document.title = 'Ultravillage';
  }, []);

  const featured = items.find(item => item.featured);

  const filteredOutFeaturedItems = items.filter(item => !item.featured);

  const byArtistName = item => item.artist_name.toLowerCase().indexOf(filterTerm) !== -1 /*|| item.body.toLowerCase().indexOf(filterTerm) !== -1*/

  const filteredItems = filteredOutFeaturedItems.filter(byArtistName);

  return (
    <div className="ArtistList-flex-container">
      {featuredList && !filterTerm && (
        <FeaturedCard
          featured={featuredList.featured}
          title={featuredList.title} 
          image={featuredList.image} 
          body={featuredList.body.split('. ')[0] + '.'} 
          category={'List'}
        />
      )}
      {featured && !filterTerm && (
        <FeaturedCard
          featured={featured.featured}
          title={featured.artist_name} 
          image={featured.image} 
          body={featured.body.split('. ')[0] + '.'} 
          category={'Artist'}
        />
      )}

      {filteredItems.length > 0 ? filteredItems.map((item, i) => (
          <LazyLoad key={i} height={110} offset={100} placeholder={<LoadingCard />}>
            <ArtistCard item={item} />
          </LazyLoad>
        )
      ) : `We couldn't find '${filterTerm}'`}
    </div>
  );
};

export default ArtistList;
