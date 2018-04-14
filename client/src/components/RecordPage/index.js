import React from 'react';

import './RecordPage.css';

const RecordPage = ({record, match}) => {
  return (
    <div className="RecordPage-container">
      <h3>Record Page for {record}</h3>
      {/*<p>{record.body}</p>
      <span>{record.year}</span>*/}
    </div>
 )
};

export default RecordPage;