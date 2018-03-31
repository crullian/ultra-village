import React from 'react';
import { Link } from 'react-router-dom';

const ArtistPage = (props) => (
  <div>
    <h3>{props.artist}'s Page</h3>
    <ul>
    {props.records.map(record => {
      return (
        <li key={record._id}>
          {/*<Link to={`${props.match.url}/${record.title.toLowerCase().replace(' ', '_')}`}>*/}
            {record.title}
          {/*</Link>*/}
        </li>
      );
    })}
    </ul>
  </div>
);

export default ArtistPage;