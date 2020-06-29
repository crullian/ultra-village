import React, { useState, useEffect } from 'react';

import EditableContent from '../EditableContent';

import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import firebase from '../../firebase.js';

import './ArtistPage.css';


const ArtistPage = ({ artist, artistId }) => {
  const [open, setOpen] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState(false);

  useEffect(() => {
    document.title = `Ultravillage | ${artist.artist_name}`;
  });

  const handleUpdateBody = e => {
    console.log('Da fuq', e.target.value, '/pages/', artistId)
    firebase.database().ref('/pages/' + artistId).update({
      body: e.target.value
    });
  }

  const handleUpdateReview = (albumIndex, albumId) => e => {
    firebase.database().ref(`/pages/${artistId}/albums/${albumIndex}/albums/${albumId}`).update({
      review: e.target.value
    });
  }

  const handleReviewExpandChange = album => (e, expanded) => {
    if (album.review) {
      setReviewExpanded(expanded ? album.title : false)
    }
  };
console.log('ARTIST', artist.artist_name, artistId)
  return (
    <div className="ArtistPage-container">
      <CardHeader
        title={<h2>{artist.artist_name}</h2>}
        style={{padding: '16px 8px'}}
        avatar={
          <img
            alt="artist"
            src={artist.image}
            className="ArtistPage-img"
            width="60"
            onClick={() => setOpen(true)}
          />
        }
      />
      
      <EditableContent
        collapsible
        changeHandler={handleUpdateBody}
        content={artist.body}
      />

      {artist.discography && 
        <section className="ArtistPage-disco">
          <h4 className="ArtistPage-disco-heading">Selected Discography</h4>
          <div>
          {Object.values(artist.discography).map((albumList, i) => {
            return (
              <div key={`album-index-${i}`} style={{padding: '0 8px'}}>
                <h4 className="ArtistPage-disco-heading">{albumList.artist_name}</h4>
                {Object.values(albumList.albums).map((album, j) => {
                  const heading = album.year && album.label ? `${album.title} - ${album.year}, ${album.label}` : album.title;
                  return (
                    <ExpansionPanel
                      key={`${album.title}-${j}`}
                      expanded={reviewExpanded === album.title}
                      onChange={handleReviewExpandChange(album)}
                    >
                      <ExpansionPanelSummary
                        style={{cursor: album.review ? 'pointer' : 'default'}}
                        expandIcon={album.review ? <ExpandMoreIcon /> : null}
                      >
                        <Typography>
                          {heading}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <EditableContent
                          changeHandler={handleUpdateReview(i, j)}
                          content={album.review}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
                </div>
              )
            })}
          </div>
        </section>
      }

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
      >
        <img
          alt="artist"
          src={artist.image}
          style={{width: '100%', borderRadius: '3px'}}
        />
      </Dialog>
    </div>
  )
};

export default ArtistPage;