import React from 'react';
import { Link } from 'react-router-dom';
import Remarkable from 'remarkable';

import HomeCard from '../HomeCard';

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

class ArtistList extends React.Component {

  render() {
    const { items, classes } = this.props;

    let featured = items && items.filter((item) => {
      return item.featured
    })

    return (
      <div className="ArtistList-flex-container">
        {featured && featured.length > 0 &&
          <Link
            to={`/${featured[0].artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
          >

            <div 
              className="ArtistList-featured"
            >
              <h3 style={{padding: '0 24px'}}>Featured Artist: {featured[0].artist_name}</h3>

                <CardHeader
                  className={classes.avatar}
                  avatar={
                    <img
                      alt="artist"
                      src={featured[0].image}
                      className="ArtistPage-img"
                    />
                  }
                  subheader={
                    <Typography
                      component="p"
                      dangerouslySetInnerHTML={{ __html: md.render(featured[0].body.split('.')[0] + '.') }}
                    >
                    </Typography>
                  }
                />
            </div>
          </Link>
        }

        {items && items.map((item, i) => (
          <Link
            to={`/${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}`}
            key={`${item.artist_name.toLowerCase().replace(/[. ,:-]+/g, "-")}-${i}`}
            className="ArtistList-item-container"
           >
            <HomeCard item={item} />
          </Link>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ArtistList);
