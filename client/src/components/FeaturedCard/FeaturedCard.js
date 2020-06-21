import React from 'react';
import { Link } from 'react-router-dom';
import Remarkable from 'remarkable';

import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import '../ArtistList/ArtistList.css'

const md = new Remarkable({breaks:true});

const styles = theme => ({
  avatar: {
    alignItems: 'end'
  },
  content: {
    alignSelf: 'center'
  }
});

const FeaturedCard = ({ classes, title, image, body }) => (
	<Link
    to={`/${title.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
    className="ArtistList-item-container featured"
  >
    <h3 style={{padding: '0 24px'}}>Featured Artist: {title}</h3>

    <CardHeader
      className={{...classes.avatar,...classes.content }}
      avatar={
        <img
          alt="artist"
          src={image}
          className="ArtistPage-img"
        />
      }
      subheader={
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: md.render(body) }}
        >
        </Typography>
      }
    />
  </Link>
);

export default withStyles(styles)(FeaturedCard);
