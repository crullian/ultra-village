import React from 'react';

const RecordPage = ({record}) => (
  <div>
    <h3>Record Page for {record.title}, by {record.artist_name.join(', ')}</h3>
    <p>{record.body}</p>
    <span>{record.year}</span>
  </div>
);

export default RecordPage;