import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './ListCard.css'

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '240px'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 3
  }
});

const ListCard = ({ classes, item }) => (
  <Link
    to={`/${item.title.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
    className="ListsPage-item-container"
   >
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="inherit">{item.title}</Typography>
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

export default withStyles(styles, { withTheme: true })(ListCard);