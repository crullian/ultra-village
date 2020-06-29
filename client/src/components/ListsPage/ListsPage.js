import React, { useEffect } from 'react';
import ListCard from '../ListCard';

import './ListsPage.css';

const ListsPage = ({ lists }) => {
  useEffect(() => {
    document.title = 'Ultravillage | lists';
  }, []);

  return (
  	<div className="ListsPage-flex-container">
  		{lists.map(list => <ListCard key={list.id} item={list} />)}
  	</div>
	);
};

export default ListsPage