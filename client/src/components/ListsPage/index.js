import React, { useEffect } from 'react';

const ListsPage = ({ items }) => {
  useEffect(() => {
    document.title = 'Ultravillage | lists';
  }, [])

  return <h4>Lists page</h4>
};

export default ListsPage