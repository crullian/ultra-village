import React from 'react';
import { Link } from 'react-router-dom';
import Remarkable from 'remarkable';

import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import './FeaturedCard.css'

const md = new Remarkable({breaks:true});

const styles = theme => ({
  avatar: {
    [theme.breakpoints.down('sm')]:{
      display: 'block'
    },
    [theme.breakpoints.up('md')]:{
      display: 'flex'
    },
    alignItems: 'end'
  },
  cardHeaderRoot: {
    alignItems: 'flex-start'
  }
});

const FeaturedCard = ({ classes, title, image, body, category, featured }) => (
	<Link
    to={`/${title.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
    className="FeaturedCard-container"
  >
    <h3 style={{padding: '0 24px'}}>{featured ? `Featured ${category}:` : ''} {title}</h3>

    <CardHeader
      classes={{avatar: 'avatar-class', root: classes.cardHeaderRoot,}}
      className={classes.avatar}
      avatar={
        <img
          alt={category}
          src={image}
          className="FeaturedCard-image"
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
