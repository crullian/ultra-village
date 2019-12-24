import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

function HomeCard(props) {
  const { classes, item } = props;
  let hasReviews = false;

  // if (item.albums.length) {
  //   item.albums.forEach(album => {
  //     if (album.review) {
  //       hasReviews =  true;
  //     }
  //   })
  // }

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="inherit" style={{fontFamily: 'Google Sans, sans-serif'}}>{item.artist_name} {hasReviews && <p style={{color: '#1579ff'}}>album reviews</p>}</Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.image}
        title=""
      />
    </Card>
  );
}

export default withStyles(styles, { withTheme: true })(HomeCard);