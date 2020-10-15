import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const ArtistCard = ({ classes, item }) => (
  <Link
    to={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
    className={classes.container}
   >
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="inherit">{item.artist_name}</Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.image}
        title=""
      />
    </Card>
  </Link>
);

export default ArtistCard;