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

  return (
    <div className="ArtistList-flex-container">
      {featuredList && !filterTerm && (
        <FeaturedCard 
          title={featuredList.title} 
          image={featuredList.image} 
          body={featuredList.body} 
          category={'List'}
        />
      )}
      {featured && !filterTerm && (
        <FeaturedCard 
          title={featured.artist_name} 
          image={featured.image} 
          body={featured.body.split('. ')[0] + '.'} 
          category={'Artist'}
        />
      )}

      {filteredOutFeaturedItems.filter(item =>
        item.artist_name.toLowerCase().indexOf(filterTerm) !== -1 /*|| item.body.toLowerCase().indexOf(filterTerm) !== -1*/
        ).map((item, i) => (
          <LazyLoad key={i} height={110} offset={100} placeholder={<LoadingCard />}>
            <ArtistCard item={item} />
          </LazyLoad>
        )
      )}
    </div>
  );
};

export default ArtistList;
