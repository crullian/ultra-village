import React, { useEffect } from 'react';

import './ListsPage.css';

const ListsPage = ({ items }) => {
  useEffect(() => {
    document.title = 'Ultravillage | lists';
  }, [])

  return <div className="ListsPage-container">Lists page</div>
};

export default ListsPage