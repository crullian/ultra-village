import React from 'react';
import Remarkable from 'remarkable';

import Typography from '@material-ui/core/Typography';

import './RecordPage.css';

const md = new Remarkable({breaks:true});

const RecordPage = ({record, match}) => {
  return (
    <div className="RecordPage-container">
      <h3>Record Page for {record.title}</h3>
      <Typography
        component="p"
        dangerouslySetInnerHTML={{ __html: md.render(record.review) }}
      >
      </Typography>
      <span>{record.year}</span>
    </div>
 )
};

export default RecordPage;