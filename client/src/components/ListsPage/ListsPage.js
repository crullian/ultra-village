import React, { useEffect } from 'react';
import FeaturedCard from '../FeaturedCard';

import './ListsPage.css';

const ListsPage = ({ lists }) => {
  useEffect(() => {
    document.title = 'Ultravillage | lists';
  }, []);

  return (
  	<div className="ListsPage-flex-container">
  	{lists.map(list => (
      <FeaturedCard title={list.title}
        image={list.image}
        body={list.body.split('. ')[0] + '.'}
        category={'List'}
      />
      ))}
  	</div>
	);
};

export default ListsPage