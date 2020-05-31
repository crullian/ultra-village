import React from 'react';
import { Link } from 'react-router-dom';
import Remarkable from 'remarkable';

import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import './ArtistList.css'

const md = new Remarkable({breaks:true});

const styles = theme => ({
  avatar: {
    alignItems: 'end'
  }
});

const FeaturedListCard = ({ classes, featuredList }) => (
	<Link
    to={`/${featuredList.list_title.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
    className="ArtistList-item-container featured"
  >
    <h3 style={{padding: '0 24px'}}>Featured List: {featuredList.list_title}</h3>

    <CardHeader
      className={classes.avatar}
      avatar={
        <img
          alt="list"
          src={featuredList.list_image}
          className="ArtistPage-img"
        />
      }
      subheader={
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: md.render(featuredList.body.split('. ')[0] + '.') }}
        >
        </Typography>
      }
    />
  </Link>
);

export default withStyles(styles)(FeaturedListCard);
