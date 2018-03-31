import React from 'react';
import { Link } from 'react-router-dom';

const ArtistPage = (props) => (
  <div>
    <h3>{props.artist}'s Page</h3>
    
    {props.records.map(record => {
      return (
        <li key={record._id}>
          {/*<Link to={`${props.match.url}/${record.title.toLowerCase().replace(' ', '_')}`}>*/}
            {record.title}
          {/*</Link>*/}
          {record.image &&
            <img src={record.image} style={{width: '300px'}} />
          }
        </li>
      );
    })}
  </div>
);

export default ArtistPage;